import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ isMenuOpen }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    const searchBarVariants = {
        menuClosed: {
            left: '4rem',
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        menuOpen: {
            left: '21rem',
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <motion.div
            ref={searchRef}
            className="absolute top-4 right-4 md:right-auto md:w-96 z-[1000]"
            initial="menuClosed"
            animate={isMenuOpen ? "menuOpen" : "menuClosed"}
            variants={searchBarVariants}
        >
            <div className="relative">
                <div className="relative flex items-center">
                    <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher un lieu..."
                        className="w-full pl-10 pr-10 py-2 rounded-lg border shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-3 hover:bg-gray-100 p-1 rounded-full"
                        >
                            <X className="h-4 w-4 text-gray-400" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SearchBar;