import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Car, Bike, Calendar, X, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Profile = ({ isOpen, onClose }) => {
    const { user, updateProfile, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        profilePicture: user?.profilePicture || null
    });

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const stats = {
        carpools: user?.stats?.carpools || 0,
        bikeRides: user?.stats?.bikeRides || 0,
        co2Saved: user?.stats?.co2Saved || 0
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">User Profil</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Photo de profil */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {formData.profilePicture ? (
                                    <img
                                        src={formData.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="h-12 w-12 text-gray-400" />
                                )}
                            </div>
                            {isEditing && (
                                <label className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2 cursor-pointer hover:bg-green-700 transition-colors">
                                    <Camera className="h-4 w-4 text-white" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        profilePicture: reader.result
                                                    }));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Formulaire */}
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <div className="mt-1 relative">
                                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={!isEditing}
                                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3 disabled:bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mail</label>
                                <div className="mt-1 relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={!isEditing}
                                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3 disabled:bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <div className="mt-1 relative">
                                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3 disabled:bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Statistiques */}
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Your statistics</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Car className="h-5 w-5 text-green-600" />
                                        <span className="text-lg font-bold text-green-600">{stats.carpools}</span>
                                    </div>
                                    <p className="text-sm text-green-700">Carpooling</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Bike className="h-5 w-5 text-blue-600" />
                                        <span className="text-lg font-bold text-blue-600">{stats.bikeRides}</span>
                                    </div>
                                    <p className="text-sm text-blue-700">Bike Rides</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-5 w-5 text-yellow-600" />
                                        <span className="text-lg font-bold text-yellow-600">{stats.co2Saved}kg</span>
                                    </div>
                                    <p className="text-sm text-yellow-700">CO2 saved</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="mt-6 flex justify-between">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Enregistrer
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Déconnexion
                                </button>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Modifier
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;