import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ApiCarService = {
    addCar: async (car) => {
        try {
            const response = await api.post('/cars/add', car);
            return response.data;
        } catch (error) {
            console.error('Add Car Error:', error);
            throw error.response ? error.response.data : error;
        }
    },
    getAllCars: async () => {
        try {
            const response = await api.get('/cars');
            return response.data;
        } catch (error) {
            console.error('Get All Cars Error:', error);
            throw error.response ? error.response.data : error;
        }
    },
    getCarById: async (id) => {
        try {
            const response = await api.get(`/cars/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching car details:', error);
            throw error.response ? error.response.data : error;
        }
    }
};

export default ApiCarService;
