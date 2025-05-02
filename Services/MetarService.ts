import axios from "axios";

const BASE_URL = 'https://aviationweather.gov/api/data/metar';

export const getMetar = async(icao: string): Promise<string> => {
    try {
        const response = await axios.get(BASE_URL, {
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