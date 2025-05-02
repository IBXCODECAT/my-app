import axios from "axios";

const BASE_URL = 'https://aviationweather.gov/api/data/taf';

export const getTaf = async (icao: string): Promise<string> => {
    try {
        const response = await axios.get(BASE_URL, {
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