import React, { useState } from 'react';
import { User, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccountButton = ({ onOpenModal, className }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMenuClick = (mode) => {
        setShowDropdown(false);
        onOpenModal(mode);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`relative p-2 sm:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all ${className}`}
            >
                <div className="flex items-center justify-center">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
            </button>

            <AnimatePresence>
                {showDropdown && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowDropdown(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
                        >
                            <div className="py-1">
                                <button
                                    onClick={() => handleMenuClick('login')}
                                    className="w-full px-4 py-3 sm:py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2 text-sm sm:text-base"
                                >
                                    <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span>Connexion</span>
                                </button>
                                <button
                                    onClick={() => handleMenuClick('register')}
                                    className="w-full px-4 py-3 sm:py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2 text-sm sm:text-base"
                                >
                                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span>Créer un compte</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccountButton;