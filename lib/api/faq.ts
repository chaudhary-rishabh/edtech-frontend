
import api from '@/lib/axios';

export const faqsAPI = {
    getFAQs: async () => {
        const response = await api.get('/api/faqs');
        return response.data;
    },
};