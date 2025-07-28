import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("A variável de ambiente VITE_API_URL não está definida. Verifique seu arquivo .env");
}

const apiLdap = axios.create({
    baseURL: API_URL
});

export default {
    apiLdap,
};