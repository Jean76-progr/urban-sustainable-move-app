import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModal from './components/Auth/AuthModal';
import { LoginForm, RegisterForm } from './components/Auth/AuthForms';
import MainMap from './components/Map/MainMap';
import SplashScreen from './components/SplashScreen';

function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [authModal, setAuthModal] = useState({
        isOpen: false,
        mode: 'login'
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleAuthSubmit = (formData) => {
        console.log('Form submitted:', formData);
        setAuthModal({ ...authModal, isOpen: false });
    };

    const handleOpenAuth = (mode) => {
        setAuthModal({ isOpen: true, mode });
    };

    return (
        <div className="w-screen h-screen overflow-hidden">
            <AnimatePresence>
                {showSplash && <SplashScreen />}
            </AnimatePresence>

            <div
                className={`w-full h-full transition-opacity duration-500 ${
                    showSplash ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <MainMap onOpenAuth={handleOpenAuth} />

                <AuthModal
                    isOpen={authModal.isOpen}
                    onClose={() => setAuthModal({ ...authModal, isOpen: false })}
                    title={authModal.mode === 'login' ? 'Connexion' : 'Créer un compte'}
                >
                    {authModal.mode === 'login' ? (
                        <LoginForm
                            onSubmit={handleAuthSubmit}
                            onSwitchToRegister={() => setAuthModal({ isOpen: true, mode: 'register' })}
                        />
                    ) : (
                        <RegisterForm
                            onSubmit={handleAuthSubmit}
                            onSwitchToLogin={() => setAuthModal({ isOpen: true, mode: 'login' })}
                        />
                    )}
                </AuthModal>
            </div>
        </div>
    );
}

export default App;