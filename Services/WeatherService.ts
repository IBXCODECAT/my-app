import axios from "axios";

const METAR_BASE_URL = 'https://aviationweather.gov/api/data/metar';
const TAF_BASE_URL = 'https://aviationweather.gov/api/data/taf';

export const getMetar = async(icao: string): Promise<string> => {
    try {
        const response = await axios.get(METAR_BASE_URL, {
            params: {
                ids: icao.toUpperCase(),
                format: 'raw',
                taf: 'false'
            }
        });

        return response.data?.trim() || '';
    }
    catch (ex) {
        console.error('METAR fetch error:', ex);
        return '';
    }
};

export const getTaf = async (icao: string): Promise<string> => {
    try {
        const response = await axios.get(TAF_BASE_URL, {
            params: {
                ids: icao.toUpperCase(),
                format: 'raw',
                metar: 'false',
            }
        });

        return response.data?.trim() || '';
    }
    catch (ex) {
        console.error('Taf fetch error!');
        return '';
    }
}