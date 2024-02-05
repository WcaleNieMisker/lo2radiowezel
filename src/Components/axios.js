import axios from "axios";
require('dotenv').config();
// console.log(process.env.USER, process.env.PASSWORD);

export const api = axios.create({
    baseURL: process.env.REACT_APP_HOST, // Adres Twojego serwera
    headers: {
        'Content-Type': 'application/json',
        'username': process.env.REACT_APP_USER,
        'password': process.env.REACT_APP_PASSWORD,
        'cache-control': 'no-store'

    }
});

export const getElements = async () => {
    try {
        const response = await api.get('/elements'); // Ścieżka do endpointu, który obsługuje pobieranie elementów z bazy danych
        return response.data[0].tracks;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas pobierania elementów');
    }
};

// Inne funkcje do obsługi innych operacji na danych

export const addElement = async (element) => {
    try {
        const response = await api.post('/elements', element); // Ścieżka do endpointu, który obsługuje dodawanie elementu do bazy danych
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas dodawania elementu');
    }
};

export const updateElement = async (elementId, updatedElement) => {
    try {
        const response = await api.put(`/elements/${elementId}`, updatedElement); // Ścieżka do endpointu, który obsługuje aktualizację elementu w bazie danych
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas aktualizacji elementu');
    }
};

export const deleteElement = async (elementId) => {
    try {
        const response = await api.delete(`/elements/${elementId}`); // Ścieżka do endpointu, który obsługuje usuwanie elementu z bazy danych
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Błąd podczas usuwania elementu');
    }
};
