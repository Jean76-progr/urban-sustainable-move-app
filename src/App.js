import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import MainMap from './components/Map/MainMap';
import AuthModal from './components/Account/AuthModal';
import Profile from './components/Account/Profile';

function App() {
    const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
    const [profileOpen, setProfileOpen] = useState(false);

    const handleAuth = (formData) => {
        console.log('Auth data:', formData);
        setAuthModal({ isOpen: false, mode: 'login' });
    };

    return (
        <AuthProvider>
            <div className="h-screen relative">
                <MainMap />

                <AuthModal
                    isOpen={authModal.isOpen}
                    mode={authModal.mode}
                    onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
                    onSwitchMode={(mode) => setAuthModal({ ...authModal, mode })}
                    onSubmit={handleAuth}
                />

                <Profile
                    isOpen={profileOpen}
                    onClose={() => setProfileOpen(false)}
                />
            </div>
        </AuthProvider>
    );
}

export default App;