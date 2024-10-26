import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';

export const LoginForm = ({ onSubmit, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        placeholder="votre@email.com"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 px-4 hover:bg-green-700 transition-colors"
            >
                Se connecter
            </button>

            <p className="text-center text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-green-600 hover:text-green-700 font-medium"
                >
                    S'inscrire
                </button>
            </p>
        </form>
    );
};

export const RegisterForm = ({ onSubmit, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                <div className="mt-1 relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        placeholder="Jean Dupont"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        placeholder="votre@email.com"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <div className="mt-1 relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        placeholder="+33 6 12 34 56 78"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 px-4 hover:bg-green-700 transition-colors"
            >
                Créer un compte
            </button>

            <p className="text-center text-sm text-gray-600">
                Déjà un compte ?{' '}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-green-600 hover:text-green-700 font-medium"
                >
                    Se connecter
                </button>
            </p>
        </form>
    );
};