import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, TrendingUp } from 'lucide-react';

const TransportStats = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const stats = {
        carpools: 15,
        bikeGroups: 8,
        busOnTime: 90,
        tramOnTime: 95
    };

    return (
        <div className="absolute z-[1000] md:right-4 md:bottom-24 bottom-4 right-2 left-2 md:left-auto">
            <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                animate={{ width: isExpanded ? 'auto' : '200px' }}
                layout
            >
                {/* En-tête compact */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">Statistiques</span>
                    </div>
                    {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                    )}
                </button>

                {/* Version minimale */}
                {!isExpanded && (
                    <div className="p-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-center p-1.5 bg-green-50 rounded">
                                <p className="text-lg font-bold text-green-600">{stats.carpools}</p>
                                <p className="text-xs text-green-800">Covoiturages</p>
                            </div>
                            <div className="text-center p-1.5 bg-blue-50 rounded">
                                <p className="text-lg font-bold text-blue-600">{stats.bikeGroups}</p>
                                <p className="text-xs text-blue-800">Groupes vélo</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Version étendue */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-center p-1.5 bg-green-50 rounded">
                                        <p className="text-lg font-bold text-green-600">{stats.carpools}</p>
                                        <p className="text-xs text-green-800">Covoiturages</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-blue-50 rounded">
                                        <p className="text-lg font-bold text-blue-600">{stats.bikeGroups}</p>
                                        <p className="text-xs text-blue-800">Groupes vélo</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-yellow-50 rounded">
                                        <p className="text-lg font-bold text-yellow-600">{stats.busOnTime}%</p>
                                        <p className="text-xs text-yellow-800">Bus à l'heure</p>
                                    </div>
                                    <div className="text-center p-1.5 bg-purple-50 rounded">
                                        <p className="text-lg font-bold text-purple-600">{stats.tramOnTime}%</p>
                                        <p className="text-xs text-purple-800">Trams à l'heure</p>
                                    </div>
                                </div>
                                <div className="text-[10px] text-center text-gray-500 mt-1">
                                    Mis à jour il y a quelques minutes
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default TransportStats;