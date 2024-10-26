import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LoginForm, RegisterForm } from './AuthForms';

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode, onSubmit }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-x-4 top-8 md:inset-auto md:top-[10vh] md:left-1/2 md:max-w-md md:-translate-x-1/2 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                        <div className="relative">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {mode === 'login' ? 'Connexion' : 'Créer un compte'}
                                </h2>

                                {mode === 'login' ? (
                                    <LoginForm
                                        onSubmit={onSubmit}
                                        onSwitchToRegister={() => onSwitchMode('register')}
                                    />
                                ) : (
                                    <RegisterForm
                                        onSubmit={onSubmit}
                                        onSwitchToLogin={() => onSwitchMode('login')}
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;