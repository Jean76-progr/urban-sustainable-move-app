import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import TransportCards from '../TransportCards';

const SlidingMenu = ({ isOpen, setIsOpen }) => {
    const menuVariants = {
        closed: {
            x: '-100%',
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <>
            {/* Bouton du menu */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-4 left-4 z-[1001] bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow ${
                    isOpen ? 'hidden' : ''
                }`}
            >
                <Menu className="h-6 w-6 text-green-600"/>
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 0.3}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black z-[999]"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Menu */}
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 w-80 shadow-2xl z-[1000] overflow-y-auto"
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-primary dark:text-green-400">
                            Urban Sustainable Move
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6 text-gray-600 dark:text-gray-300"/>
                        </button>
                    </div>
                </div>

                {/* Section des services */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Nos services</h3>
                    <TransportCards/>
                </div>

                {/* Statistiques ou informations supplémentaires */}
                <div className="p-4 bg-green-50 mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Statistiques</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-green-600">245</p>
                            <p className="text-sm text-gray-600">Covoiturages</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold text-green-600">12</p>
                            <p className="text-sm text-gray-600">Groupes actifs</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default SlidingMenu;