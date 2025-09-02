import { getSession } from "next-auth/react"
import axios, { AxiosInstance, AxiosResponse } from "axios"

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// Request Interceptor
api.interceptors.request.use(
    async (config) => {
        const session = await getSession()
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            // Let NextAuth handle token refresh
            const session = await getSession()
            if (session?.accessToken) {
                originalRequest.headers.Authorization = `Bearer ${session.accessToken}`
                return api(originalRequest)
            } else {
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/login"
                }
            }
        }

        return Promise.reject(error)
    }
)

export default api
