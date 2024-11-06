import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LoginForm, RegisterForm } from './AuthForms';

const AuthSlideMenu = ({ isOpen, setIsOpen, authMode, setAuthMode }) => {
    const menuVariants = {
        closed: {
            x: '100%',
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[999]"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Menu coulissant */}
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                className="fixed right-0 top-0 h-full bg-white w-[90%] md:w-[400px] shadow-2xl z-[1000] overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {authMode === 'login' ? 'Connexion' : 'Créer un compte'}
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>

                    <div className="mt-6">
                        {authMode === 'login' ? (
                            <LoginForm
                                onSubmit={(data) => {
                                    console.log('Login:', data);
                                    setIsOpen(false);
                                }}
                                onSwitchToRegister={() => setAuthMode('register')}
                            />
                        ) : (
                            <RegisterForm
                                onSubmit={(data) => {
                                    console.log('Register:', data);
                                    setIsOpen(false);
                                }}
                                onSwitchToLogin={() => setAuthMode('login')}
                            />
                        )}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default AuthSlideMenu;