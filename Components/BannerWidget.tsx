import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CloudLayer {
  type: string;
  altitude: string;
}

interface Props {
  visibility: string;
  clouds: CloudLayer[];
  custom?: {
    type: 'caution' | 'legal' | 'illegal';
    message: string;
  };
}

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

const BannerWidget = ({ visibility, clouds, custom }: Props) => {
  const vis = parseVisibility(visibility);
  const cloudBase = getLowestCloud(clouds);

  const legal = vis > 3 && (!cloudBase || cloudBase > 500);

  const type = custom?.type || (legal ? 'legal' : 'illegal');
  const message = custom?.message || (legal
    ? 'Weather conditions support SUAS flight under Part 107. Always verify aircraft limits, airspace, and preflight checks.'
    : 'Drone operations are not legal under Part 107 due to visibility or cloud ceiling. Remain grounded until conditions improve.');

  return (
    <View style={[styles.banner, styles[type]]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  legal: {
    backgroundColor: '#d9fdd3',
    borderColor: '#2e7d32',
    borderWidth: 1,
  },
  illegal: {
    backgroundColor: '#ffd6d6',
    borderColor: '#c62828',
    borderWidth: 1,
  },
  caution: {
    backgroundColor: '#fff9d1',
    borderColor: '#e6c200',
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default BannerWidget;
