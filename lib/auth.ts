import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from './axios';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                try {
                    const response = await api.post('/api/auth/login', {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const { data } = response.data;

                    if (data?.user && data?.token) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            role: data.user.role,
                            accessToken: data.token,
                        };
                    }
                    return null;
                } catch (error) {
                    throw new Error('Authentication failed');
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.role = token.role;
            session.user.email = token.sub;
            return session;
        },
    },
    pages: {
        signIn: '/',
    },
};