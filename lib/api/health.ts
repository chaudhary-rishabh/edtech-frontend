import api from '@/lib/axios';

export const healthAPI = {
    checkHealth: async () => {
        const response = await api.get('/health');
        return response.data;
    },
};