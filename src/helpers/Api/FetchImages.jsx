import axios from "axios";

const API_KEY = '29441841-9befcc1025c815517bb3bdeba';
const BASE_URL = 'https://pixabay.com/api';

export const fetchImages = async (query, page) => {
    try {
        const result = await axios.get(`${BASE_URL}/?key=${API_KEY}&per_page=12&q=${query}&page=${page}`);
        return result.data;
    }
    catch (error) {
        throw new Error(error);
    }
};
