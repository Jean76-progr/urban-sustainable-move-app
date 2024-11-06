import React, { useState } from 'react';
import { User, LogIn, UserPlus } from 'lucide-react';

const AccountButton = ({ onOpenModal }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAction = (mode) => {
        setShowDropdown(false);
        onOpenModal(mode);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
                <User className="h-6 w-6 text-green-600" />
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                        onClick={() => handleAction('login')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                        <LogIn className="h-4 w-4 inline mr-2" />
                        Connexion
                    </button>
                    <button
                        onClick={() => handleAction('register')}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                        <UserPlus className="h-4 w-4 inline mr-2" />
                        Créer un compte
                    </button>
                </div>
            )}
        </div>
    );
};

export default AccountButton;