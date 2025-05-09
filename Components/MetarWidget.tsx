import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BannerWidget from './BannerWidget';
import { S_OPERATION_ALTITUDE_WARNING } from '../Constants/STRINGS';

interface CloudLayer {
  type: string;
  altitude: string; // "3000 ft"
}

interface MetarDetails {
  temperature: string;
  dewpoint: string;
  wind: string;
  visibility: string;
  clouds: CloudLayer[];
  altimeter: string;
  remarks: string;
  precipitation: string;
}

interface Props {
  metar: string;
}

const parseMetar = (metar: string): MetarDetails => {
  const windMatch = metar.match(/(\d{3})(\d{2})KT/);
  const wind = windMatch ? `${parseInt(windMatch[2])} kt from ${windMatch[1]}°` : 'Calm or Variable';

  const visMatch = metar.match(/ (\d{1,2})SM/) || metar.match(/ (\d{4}) /);
  const visibility = visMatch ? (visMatch[1].length === 4 ? `${visMatch[1]}m` : `${visMatch[1]}SM`) : 'N/A';

  const cloudRegex = /(FEW|SCT|BKN|OVC)(\d{3})/g;
  const clouds: CloudLayer[] = [];
  let match;
  while ((match = cloudRegex.exec(metar)) !== null) {
    clouds.push({
      type: match[1],
      altitude: `${parseInt(match[2]) * 100} ft`,
    });
  }

  const altimeterMatch = metar.match(/A(\d{4})/);
  const altimeter = altimeterMatch ? `${altimeterMatch[1].slice(0, 2)}.${altimeterMatch[1].slice(2)} inHg` : 'N/A';

  const tempMatch = metar.match(/ (\d{2})\/(\d{2}) /);
  let temperature = tempMatch ? `${tempMatch[1]}°C` : 'N/A';
  let dewpoint = tempMatch ? `${tempMatch[2]}°C` : 'N/A';

  const rmkExactTemp = metar.match(/T(\d{4})(\d{4})/);
  if (rmkExactTemp) {
    const exactTemp = (parseInt(rmkExactTemp[1]) / 10).toFixed(1);
    const exactDew = (parseInt(rmkExactTemp[2]) / 10).toFixed(1);
    temperature = `${exactTemp}°C`;
    dewpoint = `${exactDew}°C`;
  }

  const wxMatch = metar.match(/ (RA|SN|TS|BR|DZ|FG|HZ|SG|PL|GR|GS)+/g);
  const precipitation = wxMatch ? wxMatch.map(w => w.trim()).join(', ') : 'None observed';

  const remarks = metar.includes('RMK') ? metar.split('RMK')[1].trim() : 'None';

  return {
    temperature,
    dewpoint,
    wind,
    visibility,
    clouds,
    altimeter,
    remarks,
    precipitation,
  };
};

const parseVisibility = (vis: string): number => {
  if (vis.includes('SM')) return parseFloat(vis.replace('SM', ''));
  if (vis.includes('m')) return parseInt(vis.replace('m', '')) / 1609.34;
  return 0;
};

const getLowestCloud = (clouds: CloudLayer[]): number | null => {
  if (!clouds.length) return null;
  const altitudes = clouds.map(cloud => parseInt(cloud.altitude.replace(' ft', '')));
  return Math.min(...altitudes);
};

const MetarWidget = ({ metar }: Props) => {
  const details = parseMetar(metar);
  const visibilityValue = parseVisibility(details.visibility);
  const lowestCloud = getLowestCloud(details.clouds);

  const altitudeLimit = lowestCloud ? lowestCloud - 500 : null;
  const shouldWarnAltitude = altitudeLimit !== null && altitudeLimit < 400;

  return (
    <View style={styles.widgetContainer}>
      <Text style={styles.label}>Temperature</Text>
      <Text style={styles.value}>{details.temperature}</Text>

      <Text style={styles.label}>Dewpoint</Text>
      <Text style={styles.value}>{details.dewpoint}</Text>

      <Text style={styles.label}>Wind</Text>
      <Text style={styles.value}>{details.wind}</Text>

      <Text style={styles.label}>Visibility</Text>
      <Text style={styles.value}>{details.visibility}</Text>

      <Text style={styles.label}>Precipitation</Text>
      <Text style={styles.value}>{details.precipitation}</Text>

      <Text style={styles.label}>Cloud Layers</Text>
      <View style={styles.cloudTable}>
        {details.clouds.length > 0 ? (
          details.clouds.map((cloud, index) => (
            <View key={index} style={styles.cloudRow}>
              <Text style={styles.value}>{cloud.type}</Text>
              <Text style={styles.value}>{cloud.altitude}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.value}>No significant clouds</Text>
        )}
      </View>

      {shouldWarnAltitude && (
        <BannerWidget
          visibility={details.visibility}
          clouds={details.clouds}
          custom={{
            type: 'caution',
            message: S_OPERATION_ALTITUDE_WARNING(altitudeLimit),
          }}
        />
      )}

      <Text style={styles.label}>Altimeter</Text>
      <Text style={styles.value}>{details.altimeter}</Text>

      <Text style={styles.label}>Remarks</Text>
      <Text style={styles.value}>{details.remarks}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: '#f0f4fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    color: '#003366',
    marginTop: 10,
  },
  value: {
    color: '#222',
    fontSize: 14,
  },
  cloudTable: {
    marginTop: 5,
    marginBottom: 10,
  },
  cloudRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MetarWidget;
