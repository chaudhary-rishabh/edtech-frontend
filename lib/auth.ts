import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`

declare module "next-auth" {
    interface Session {
        accessToken?: string
        refreshToken?: string
        user: {
            id: string
            name?: string | null
            email?: string | null
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        refreshToken?: string
        userId?: string
    }
}

export const authOptions: NextAuthOptions = {
    providers: [

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const response = await axios.post(`${API_URL}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    })

                    if (response.data.data?.token && response.data.data?.user) {
                        return {
                            id: response.data.data.user.id,
                            email: response.data.data.user.email,
                            name: response.data.data.user.name,
                            accessToken: response.data.data.token,  
                        }
                    }
                    return null
                } catch (error) {
                    console.error("Login error:", error)
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }: any) {
            
            if (account && user) {
                if (account.provider === "credentials") {
                    
                    token.accessToken = (user as any).accessToken
                    token.userId = user.id
                    token.role = (user as any).role
                } else if (account.provider === "google") {
                    
                    try {
                        const response = await axios.post(`${API_URL}/auth/login`, {
                            email: user.email,
                            oauth: true,
                            provider: "google"
                        })

                        if (response.data.accessToken) {
                            token.accessToken = response.data.accessToken
                            token.refreshToken = response.data.refreshToken
                        }
                    } catch (error) {
                        console.error("OAuth token generation error:", error)
                    }

                    token.userId = user.id
                    token.role = (user as any).role
                }
            }

            
            if (Date.now() < (token.exp || 0) * 1000) {
                return token
            }

            
            if (token.refreshToken) {
                try {
                    const response = await axios.post(`${API_URL}/auth/user/refresh`, {
                        refreshToken: token.refreshToken,
                    })

                    if (response.data.accessToken) {
                        token.accessToken = response.data.accessToken
                        if (response.data.refreshToken) {
                            token.refreshToken = response.data.refreshToken
                        }
                    }
                } catch (error) {
                    console.error("Token refresh error:", error)
                    
                    return { ...token, error: "RefreshAccessTokenError" }
                }
            }

            return token
        },

        async session({ session, token }: any) {
            if (token) {
                session.accessToken = token.accessToken as string
                session.refreshToken = token.refreshToken as string
                session.user.id = token.userId as string
                session.user.role = token.role as string

                
                if (token.error === "RefreshAccessTokenError") {
                    session.error = "RefreshAccessTokenError"
                }
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
}