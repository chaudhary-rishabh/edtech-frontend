import api from '@/lib/axios';

export const batchesAPI = {
    getLatestBatches: async () => {
        const response = await api.get('/api/batches/latest');
        return response.data;
    },
};
