import axios from "axios";
require('dotenv').config();
export const api = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: {
        'Content-Type': 'application/json',
        'username': process.env.REACT_APP_USER,
        'password': process.env.REACT_APP_PASSWORD,
        'cache-control': 'no-store'

    }
});

export const getElements = async () => {
    try {
        const response = await api.get('/elements');
        return response.data[0].tracks;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas pobierania elementów');
    }
};

export const addElement = async (element) => {
    try {
        const response = await api.post('/elements', element);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas dodawania elementu');
    }
};

export const updateElement = async (elementId, updatedElement) => {
    try {
        const response = await api.put(`/elements/${elementId}`, updatedElement);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas aktualizacji elementu');
    }
};

export const deleteElement = async (elementId) => {
    try {
        const response = await api.delete(`/elements/${elementId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas usuwania elementu');
    }
};
