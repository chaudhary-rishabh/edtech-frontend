import api from '@/lib/axios';

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    number: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const authAPI = {
    register: async (data: RegisterData) => {
        const response = await api.post('/api/auth/register', data);
        return response.data;
    },

    login: async (data: LoginData) => {
        const response = await api.post('/api/auth/login', data);
        return response.data;
    },
};





