import api from '@/lib/axios';

export const coursesAPI = {
    getAllCourses: async () => {
        const response = await api.get('/api/courses');
        return response.data;
    },

    getCoursesByCategory: async (category: string) => {
        const response = await api.get(`/api/courses/category/${category}`);
        return response.data;
    },

    getCourseDetails: async (id: string) => {
        const response = await api.get(`/api/courses/${id}`);
        return response.data;
    },
};

