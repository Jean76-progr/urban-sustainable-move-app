import React, { useState } from 'react';
import { User, LogIn, UserPlus, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccountButton = ({ isLoggedIn, onLogout, onOpenModal }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
                <User className="h-5 w-5" />
                <span className="hidden md:inline">Mon Compte</span>
            </button>

            <AnimatePresence>
                {showDropdown && (
                    <>
                        {/* Overlay pour fermer le dropdown en cliquant à l'extérieur */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowDropdown(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-2"
                        >
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => {
                                            onOpenModal('profile');
                                            setShowDropdown(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>Paramètres</span>
                                    </button>
                                    <div className="border-t border-gray-200 my-1" />
                                    <button
                                        onClick={() => {
                                            onLogout();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Déconnexion</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            onOpenModal('login');
                                            setShowDropdown(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        <span>Connexion</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            onOpenModal('register');
                                            setShowDropdown(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        <span>Créer un compte</span>
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccountButton;