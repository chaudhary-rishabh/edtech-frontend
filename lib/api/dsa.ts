import api from '@/lib/axios';

export const dsaAPI = {
    getDSASheets: async () => {
        const response = await api.get('/api/dsa');
        return response.data;
    },

    getDSASheetDetails: async (id: string) => {
        const response = await api.get(`/api/dsa/${id}`);
        return response.data;
    },

    updateProgress: async (sheetId: string, problemId: string) => {
        const response = await api.patch(`/api/dsa/${sheetId}/problems/${problemId}/progress`);
        return response.data;
    },
};