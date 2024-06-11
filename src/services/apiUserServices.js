import axios from 'axios';

const API_URL = 'http://localhost:8081';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ApiService = {
    signUp: async (username, email, password) => {
        try {
            const response = await api.post('/users', {
                username,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const response = await api.get(`/users/username/${username}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getUserByEmail: async (email) => {
        try {
            const response = await api.get(`/users/email/${email}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await api.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    signInUser: async (email, password) => {
        try {
            const response = await api.post('/users/signin', null, {
                params: {
                    email,
                    password,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export default ApiService;
