import React from 'react';
import { Bus, Train, Bike, Car } from 'lucide-react';

const TransportFilters = ({ filters, onToggleFilter }) => {
    const transportTypes = [
        { id: 'bus', icon: Bus, label: 'Bus' },
        { id: 'tram', icon: Train, label: 'Tram' },
        { id: 'bike', icon: Bike, label: 'Vélo' },
        { id: 'carpool', icon: Car, label: 'Covoiturage' },
    ];

    return (
        <div className="absolute bottom-24 left-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
            <div className="space-y-2">
                {transportTypes.map(({ id, icon: Icon, label }) => (
                    <button
                        key={id}
                        onClick={() => onToggleFilter(id)}
                        className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                            filters[id] ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                        }`}
                    >
                        <Icon className={`h-5 w-5 ${filters[id] ? 'text-green-600' : 'text-gray-500'}`} />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TransportFilters;