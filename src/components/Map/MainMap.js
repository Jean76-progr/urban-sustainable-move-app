import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SearchBar from './SearchBar';
import SlidingMenu from '../SlidingMenu/SlidingMenu';
import TransportFilters from './TransportFilters';
import TransportStats from './TransportStats';

// Configuration de base de la carte
const BRNO_CENTER = [49.1951, 16.6068];
const DEFAULT_ZOOM = 13;

// Création des icônes personnalisées
const createCustomIcon = (iconUrl, size = [32, 32]) => new Icon({
    iconUrl: `/icons/${iconUrl}`,
    iconSize: size,
    iconAnchor: [size[0]/2, size[1]],
    popupAnchor: [0, -size[1]/2],
});

const transportIcons = {
    bus: createCustomIcon('bus-marker.png', [32, 32]),
    tram: createCustomIcon('tram-marker.png', [32, 32]),
    bike: createCustomIcon('bike-marker.png', [32, 32]),
    carpool: createCustomIcon('carpool-marker.png', [32, 32]),
};

// Données statiques pour les marqueurs (vous pouvez les remplacer par vos données réelles)
const locations = {
    bus: [
        { id: 1, position: [49.1951, 16.6068], name: "Gare Centrale Bus", ligne: "1, 2, 3" },
        { id: 2, position: [49.1901, 16.6118], name: "Česká Bus", ligne: "4, 5" },
        { id: 3, position: [49.1931, 16.6088], name: "Mendlovo náměstí", ligne: "1, 5, 6" },
    ],
    tram: [
        { id: 1, position: [49.1971, 16.6088], name: "Gare Centrale Tram", ligne: "1, 3" },
        { id: 2, position: [49.1921, 16.6138], name: "Česká Tram", ligne: "2, 4" },
        { id: 3, position: [49.1951, 16.6108], name: "Náměstí Svobody", ligne: "1, 2" },
    ],
    bike: [
        { id: 1, position: [49.2001, 16.6018], name: "Station Vélo Université", places: "10 vélos disponibles" },
        { id: 2, position: [49.1991, 16.6028], name: "Station Vélo Centre", places: "8 vélos disponibles" },
        { id: 3, position: [49.1981, 16.6038], name: "Station Vélo Parc", places: "15 vélos disponibles" },
    ],
    carpool: [
        { id: 1, position: [49.2021, 16.6038], name: "Point Covoiturage Nord" },
        { id: 2, position: [49.1981, 16.6048], name: "Point Covoiturage Centre" },
    ]
};

const MainMap = () => {
    const [filters, setFilters] = useState({
        bus: true,
        tram: true,
        bike: true,
        carpool: true
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getPopupContent = (type, location) => {
        switch(type) {
            case 'bus':
                return (
                    <div className="text-sm">
                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                        <p className="text-gray-600">Lignes: {location.ligne}</p>
                        <button className="mt-2 text-green-600 hover:text-green-700 text-xs font-medium">
                            Voir les horaires →
                        </button>
                    </div>
                );
            case 'tram':
                return (
                    <div className="text-sm">
                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                        <p className="text-gray-600">Lignes: {location.ligne}</p>
                        <button className="mt-2 text-green-600 hover:text-green-700 text-xs font-medium">
                            Voir les horaires →
                        </button>
                    </div>
                );
            case 'bike':
                return (
                    <div className="text-sm">
                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                        <p className="text-gray-600">{location.places}</p>
                        <button className="mt-2 text-green-600 hover:text-green-700 text-xs font-medium">
                            Réserver un vélo →
                        </button>
                    </div>
                );
            case 'carpool':
                return (
                    <div className="text-sm">
                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                        <button className="mt-2 text-green-600 hover:text-green-700 text-xs font-medium">
                            Voir les trajets disponibles →
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative h-full">
            <MapContainer
                center={BRNO_CENTER}
                zoom={DEFAULT_ZOOM}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marqueurs pour chaque type de transport */}
                {Object.entries(locations).map(([type, locationList]) =>
                        filters[type] && locationList.map(location => (
                            <Marker
                                key={`${type}-${location.id}`}
                                position={location.position}
                                icon={transportIcons[type]}
                            >
                                <Popup>
                                    {getPopupContent(type, location)}
                                </Popup>
                            </Marker>
                        ))
                )}
            </MapContainer>

            <SearchBar isMenuOpen={isMenuOpen} />
            <SlidingMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <TransportFilters filters={filters} onToggleFilter={(type) =>
                setFilters(prev => ({ ...prev, [type]: !prev[type] }))
            } />
            <TransportStats />
        </div>
    );
};

export default MainMap;