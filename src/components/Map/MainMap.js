import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SlidingMenu from '../SlidingMenu/SlidingMenu';
import TransportFilters from './TransportFilters';
import TransportStats from './TransportStats';
import AccountButton from '../Account/AccountButton';

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

const locations = {
    bus: [
        { id: 1, position: [49.1951, 16.6068], name: "Gare Centrale Bus", ligne: "1, 2, 3" },
        { id: 2, position: [49.1901, 16.6118], name: "Česká Bus", ligne: "4, 5" },
    ],
    tram: [
        { id: 1, position: [49.1971, 16.6088], name: "Gare Centrale Tram", ligne: "1, 3" },
        { id: 2, position: [49.1921, 16.6138], name: "Česká Tram", ligne: "2, 4" },
    ],
    bike: [
        { id: 1, position: [49.2001, 16.6018], name: "Station Vélo Université", places: "10 vélos" },
        { id: 2, position: [49.1991, 16.6028], name: "Station Vélo Centre", places: "8 vélos" },
    ],
    carpool: [
        { id: 1, position: [49.2021, 16.6038], name: "Point Covoiturage Nord" },
        { id: 2, position: [49.1981, 16.6048], name: "Point Covoiturage Centre" },
    ]
};

const MainMap = ({ onOpenAuth }) => {
    const [filters, setFilters] = useState({
        bus: true,
        tram: true,
        bike: true,
        carpool: true
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleFilter = (filterType) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: !prev[filterType]
        }));
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
                                    <div className="text-sm">
                                        <h3 className="font-bold text-gray-900">{location.name}</h3>
                                        {location.ligne && (
                                            <p className="text-gray-600">Lignes: {location.ligne}</p>
                                        )}
                                        {location.places && (
                                            <p className="text-gray-600">{location.places}</p>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                )}
            </MapContainer>

            {/* Bouton de compte en haut à droite */}
            <div className="absolute top-4 right-4 z-[1000]">
                <AccountButton
                    onOpenModal={onOpenAuth}
                    className="bg-white rounded-full shadow-lg p-2"
                />
            </div>

            <SlidingMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <TransportFilters filters={filters} onToggleFilter={handleToggleFilter} />
            <TransportStats />
        </div>
    );
};

export default MainMap;