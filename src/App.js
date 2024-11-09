import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModal from './components/Auth/AuthModal';
import { LoginForm, RegisterForm } from './components/Auth/AuthForms';
import MainMap from './components/Map/MainMap';
import SplashScreen from './components/SplashScreen';

// Simple Alert component with success/error styling variants
const Alert = ({ children, type = 'success' }) => (
    <div className={`p-4 rounded-lg ${
        type === 'error'
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-green-50 text-green-700 border border-green-200'
    }`}>
        {children}
    </div>
);

function App() {
    // State management for app-wide features
    const [showSplash, setShowSplash] = useState(true);
    const [authModal, setAuthModal] = useState({
        isOpen: false,
        mode: 'login'
    });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    // Mock user database for development
    const mockUsers = [
        { email: 'test@example.com', password: 'password123', name: 'Test User' }
    ];

    // Splash screen timer effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    // Utility function to show temporary notifications
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Handle authentication form submissions (login/register)
    const handleAuthSubmit = async (formData) => {
        setLoading(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            if (authModal.mode === 'login') {
                // Handle login logic
                const user = mockUsers.find(u => u.email === formData.email);
                if (user && user.password === formData.password) {
                    setUser(user);
                    localStorage.setItem('token', 'fake_jwt_token');
                    localStorage.setItem('user', JSON.stringify(user));
                    showNotification('Connexion réussie !');
                    setAuthModal({ ...authModal, isOpen: false });
                } else {
                    throw new Error('Email ou mot de passe incorrect');
                }
            } else {
                // Handle registration logic
                if (mockUsers.find(u => u.email === formData.email)) {
                    throw new Error('Cet email est déjà utilisé');
                }
                const newUser = {
                    email: formData.email,
                    password: formData.password,
                    name: formData.name
                };
                mockUsers.push(newUser);
                setUser(newUser);
                localStorage.setItem('token', 'fake_jwt_token');
                localStorage.setItem('user', JSON.stringify(newUser));
                showNotification('Compte créé avec succès !');
                setAuthModal({ ...authModal, isOpen: false });
            }
        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle user logout
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        showNotification('Déconnexion réussie');
    };

    // Open authentication modal with specified mode
    const handleOpenAuth = (mode) => {
        setAuthModal({ isOpen: true, mode });
    };

    return (
        <div className="w-screen h-screen overflow-hidden relative">
            {/* Notification display */}
            {notification && (
                <div className="absolute top-4 right-4 z-50 w-72">
                    <Alert type={notification.type}>
                        {notification.message}
                    </Alert>
                </div>
            )}

            {/* Splash screen with animation */}
            <AnimatePresence>
                {showSplash && <SplashScreen />}
            </AnimatePresence>

            {/* Main application content */}
            <div
                className={`w-full h-full transition-opacity duration-500 ${
                    showSplash ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <MainMap
                    onOpenAuth={handleOpenAuth}
                    user={user}
                    onLogout={handleLogout}
                />

                {/* Authentication modal */}
                <AuthModal
                    isOpen={authModal.isOpen}
                    onClose={() => setAuthModal({ ...authModal, isOpen: false })}
                    title={authModal.mode === 'login' ? 'Connexion' : 'Créer un compte'}
                >
                    {authModal.mode === 'login' ? (
                        <LoginForm
                            onSubmit={handleAuthSubmit}
                            onSwitchToRegister={() =>
                                setAuthModal({ isOpen: true, mode: 'register' })
                            }
                            loading={loading}
                        />
                    ) : (
                        <RegisterForm
                            onSubmit={handleAuthSubmit}
                            onSwitchToLogin={() =>
                                setAuthModal({ isOpen: true, mode: 'login' })
                            }
                            loading={loading}
                        />
                    )}
                </AuthModal>

                {/* Debug button for development environment */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="fixed bottom-4 right-4 z-50">
                        <button
                            onClick={() => console.log({
                                user,
                                token: localStorage.getItem('token'),
                                storedUser: localStorage.getItem('user'),
                                mockUsers
                            })}
                            className="bg-gray-800 text-white px-4 py-2 rounded"
                        >
                            Debug
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
