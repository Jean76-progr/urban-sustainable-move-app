import React from 'react';
import { Bus, Train, Bike, Car, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransportFilters = ({ filters, onToggleFilter, isDarkMode, isCollapsed, setIsCollapsed }) => {
    const transportTypes = [
        { id: 'bus', icon: Bus, label: 'Bus' },
        { id: 'tram', icon: Train, label: 'Tram' },
        { id: 'bike', icon: Bike, label: 'Vélo' },
        { id: 'carpool', icon: Car, label: 'Covoiturage' },
    ];

    const handleCollapse = () => {
            setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="absolute bottom-24 left-4 z-[1000]">
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                animate={{ width: isCollapsed ? 'auto' : '250px' }}
            >
                <button
                    onClick={handleCollapse}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <span className="font-medium text-gray-900 dark:text-white">Filtres</span>
                    {isCollapsed ? (
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                </button>

                <AnimatePresence initial={false}>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="p-2 space-y-2">
                                {transportTypes.map(({ id, icon: Icon, label }) => (
                                    <button
                                        key={id}
                                        onClick={() => onToggleFilter(id)}
                                        className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                                            filters[id]
                                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        <Icon className={`h-5 w-5 ${
                                            filters[id]
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                        }`} />
                                        <span className="text-sm">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default TransportFilters;