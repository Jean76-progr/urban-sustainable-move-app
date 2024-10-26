import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const CarpoolForm = () => {
    const [formData, setFormData] = useState({
        departure: '',
        arrival: '',
        date: '',
        time: '',
        seats: 1,
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Traitement du formulaire
        console.log('Covoiturage:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Point de départ</label>
                    <div className="mt-1 relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={formData.departure}
                            onChange={(e) => setFormData({...formData, departure: e.target.value})}
                            className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                    <div className="mt-1 relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={formData.arrival}
                            onChange={(e) => setFormData({...formData, arrival: e.target.value})}
                            className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <div className="mt-1 relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Heure</label>
                    <div className="mt-1 relative">
                        <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                            required
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Places disponibles</label>
                <input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({...formData, seats: e.target.value})}
                    min="1"
                    max="8"
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 px-4 hover:bg-green-700 transition-colors"
            >
                Créer le covoiturage
            </button>
        </form>
    );
};

export const CyclingGroupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        schedule: '',
        level: 'intermediate',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Groupe cycliste:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nom du groupe</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Point de rencontre</label>
                <div className="mt-1 relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Niveau</label>
                <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                >
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancé</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description et règles</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 px-4 hover:bg-green-700 transition-colors"
            >
                Créer le groupe
            </button>
        </form>
    );
};

export const CarFreeForm = () => {
    const [formData, setFormData] = useState({
        date: '',
        transport: '',
        needs: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Inscription jour sans voiture:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Date de participation</label>
                <div className="mt-1 relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mode de transport alternatif</label>
                <select
                    value={formData.transport}
                    onChange={(e) => setFormData({...formData, transport: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                    required
                >
                    <option value="">Sélectionnez une option</option>
                    <option value="bike">Vélo</option>
                    <option value="public">Transport en commun</option>
                    <option value="walk">Marche</option>
                    <option value="carpool">Covoiturage</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Besoins particuliers</label>
                <textarea
                    value={formData.needs}
                    onChange={(e) => setFormData({...formData, needs: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3"
                    placeholder="Ex: besoin d'informations sur les itinéraires à vélo..."
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 px-4 hover:bg-green-700 transition-colors"
            >
                Je m'inscris
            </button>
        </form>
    );
};