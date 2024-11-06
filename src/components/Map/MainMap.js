import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SlidingMenu from '../SlidingMenu/SlidingMenu';
import TransportFilters from './TransportFilters';
import AccountButton from '../Account/AccountButton';
import AuthSlideMenu from '../Auth/AuthSlideMenu';
import ThemeToggle from '../ThemeToggle';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [isDarkMode, setIsDarkMode] = useState(false);
    // Nouveaux états pour les menus déroulants
    const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
    const [isStatsCollapsed, setIsStatsCollapsed] = useState(true);
    const [filters, setFilters] = useState({
        bus: true,
        tram: true,
        bike: true,
        carpool: true
    });

    // Ajoutez cette fonction pour gérer le redimensionnement
    const handleResize = useCallback(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);

    // Gestion du thème
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Gérer le redimensionnement
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, [handleResize]);

    // Dans MainMap.js
    useEffect(() => {
        // Charger l'état initial depuis localStorage
        const savedFiltersState = localStorage.getItem('filtersCollapsed');
        const savedStatsState = localStorage.getItem('statsCollapsed');

        if (savedFiltersState) setIsFiltersCollapsed(JSON.parse(savedFiltersState));
        if (savedStatsState) setIsStatsCollapsed(JSON.parse(savedStatsState));
    }, []);

    // Sauvegarder l'état quand il change
        useEffect(() => {
            localStorage.setItem('filtersCollapsed', JSON.stringify(isFiltersCollapsed));
        }, [isFiltersCollapsed]);

        useEffect(() => {
            localStorage.setItem('statsCollapsed', JSON.stringify(isStatsCollapsed));
        }, [isStatsCollapsed]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    const handleAuthClick = (mode) => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const handleToggleFilter = (filterType) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: !prev[filterType]
        }));
    };

    const getPopupContent = (type, location) => {
        switch(type) {
            case 'bus':
            case 'tram':
                return (
                    <div className="text-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white">{location.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">Lignes: {location.ligne}</p>
                    </div>
                );
            case 'bike':
                return (
                    <div className="text-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white">{location.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{location.places}</p>
                    </div>
                );
            case 'carpool':
                return (
                    <div className="text-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white">{location.name}</h3>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative h-full dark:bg-gray-900">
            <MapContainer
                center={BRNO_CENTER}
                zoom={DEFAULT_ZOOM}
                className="h-full w-full"
                zoomControl={true}
                scrollWheelZoom={true}
                attributionControl={false} // Déplacer les attributions pour éviter les conflits sur mobile
            >
                <TileLayer
                    url={isDarkMode
                        ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

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

            <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />

            <div className="absolute top-4 right-4 z-[1000]">
                <AccountButton
                    onOpenModal={handleAuthClick}
                    className="bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-lg p-2"
                />
            </div>

            <SlidingMenu
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                isDarkMode={isDarkMode}
            />

            <AuthSlideMenu
                isOpen={isAuthOpen}
                setIsOpen={setIsAuthOpen}
                authMode={authMode}
                setAuthMode={setAuthMode}
                isDarkMode={isDarkMode}
            />

            {!isMenuOpen && !isAuthOpen && (
                <>
                    <TransportFilters
                        filters={filters}
                        onToggleFilter={handleToggleFilter}
                        isDarkMode={isDarkMode}
                        isCollapsed={isFiltersCollapsed}
                        setIsCollapsed={setIsFiltersCollapsed}
                    />
                </>
            )}
        </div>
    );
};

export default MainMap;