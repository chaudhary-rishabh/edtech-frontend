import api from '@/lib/axios';

export const publicAPI = {
    getTestimonials: async () => {
        const response = await api.get('/api/public/testimonials');
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/api/public/stats');
        return response.data;
    },

    getStudentsPlaced: async () => {
        const response = await api.get('/api/public/students-placed');
        return response.data;
    },
};