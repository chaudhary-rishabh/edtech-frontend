import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { X, Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';
import { authAPI } from '@/lib/api/auth';

// Validation schemas
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    number: z.string().min(10, 'Phone number must be at least 10 digits'),
});

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ModalType = 'login' | 'register' | 'forgotPassword' | 'resetPassword' | null;

interface AuthModalsProps {
    isOpen: boolean;
    modalType: ModalType;
    onClose: () => void;
    onSwitchModal: (type: ModalType) => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({ isOpen, modalType, onClose, onSwitchModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Close modal on outside click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !modalType) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
                {modalType === 'login' && <LoginModal onClose={onClose} onSwitchModal={onSwitchModal} setIsLoading={setIsLoading} isLoading={isLoading} showPassword={showPassword} setShowPassword={setShowPassword} />}
                {modalType === 'register' && <RegisterModal onClose={onClose} onSwitchModal={onSwitchModal} setIsLoading={setIsLoading} isLoading={isLoading} showPassword={showPassword} setShowPassword={setShowPassword} />}
                {modalType === 'forgotPassword' && <ForgotPasswordModal onClose={onClose} onSwitchModal={onSwitchModal} setIsLoading={setIsLoading} isLoading={isLoading} />}
                {modalType === 'resetPassword' && <ResetPasswordModal onClose={onClose} onSwitchModal={onSwitchModal} setIsLoading={setIsLoading} isLoading={isLoading} showPassword={showPassword} setShowPassword={setShowPassword} />}
            </div>
        </div>
    );
};

// Login Modal Component
const LoginModal = ({ onClose, onSwitchModal, setIsLoading, isLoading, showPassword, setShowPassword }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                alert('Invalid credentials');
            } else {
                onClose();
                window.location.reload();
            }
        } catch (error) {
            alert('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome Back</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email address"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => onSwitchModal('forgotPassword')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Forgot Password?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <button
                        type="button"
                        onClick={() => onSwitchModal('register')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

// Register Modal Component
const RegisterModal = ({ onClose, onSwitchModal, setIsLoading, isLoading, showPassword, setShowPassword }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await authAPI.register(data);
            if (response.success) {
                alert('Registration successful! Please sign in.');
                onSwitchModal('login');
            }
        } catch (error) {
            alert('Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Create Account</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Full name"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email address"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('number')}
                            type="tel"
                            placeholder="Phone number"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number.message as string}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <button
                        type="button"
                        onClick={() => onSwitchModal('login')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

// Forgot Password Modal Component
const ForgotPasswordModal = ({ onClose, onSwitchModal, setIsLoading, isLoading }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            // API not implemented yet
            alert('Password reset link sent to your email (Demo)');
            onSwitchModal('login');
        } catch (error) {
            alert('Failed to send reset link');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Reset Password</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>

            <p className="text-gray-600 mb-6">Enter your email address and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Email address"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => onSwitchModal('login')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Back to Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

// Reset Password Modal Component
const ResetPasswordModal = ({ onClose, onSwitchModal, setIsLoading, isLoading, showPassword, setShowPassword }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            // API not implemented yet
            alert('Password reset successfully (Demo)');
            onSwitchModal('login');
        } catch (error) {
            alert('Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">New Password</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} />
                </button>
            </div>

            <p className="text-gray-600 mb-6">Enter your new password below.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New password"
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
                </div>

                <div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            {...register('confirmPassword')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm new password"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => onSwitchModal('login')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Back to Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthModals;