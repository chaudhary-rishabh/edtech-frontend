import api from '@/lib/axios';

export interface UpdateProfileData {
    name?: string;
    email?: string;
    number?: string;
}

export const usersAPI = {
    getProfile: async () => {
        const response = await api.get('/api/users/profile');
        return response.data;
    },

    updateProfile: async (data: UpdateProfileData) => {
        const response = await api.put('/api/users/profile', data);
        return response.data;
    },

    getPurchasedCourses: async () => {
        const response = await api.get('/api/users/purchased-courses');
        return response.data;
    },
};