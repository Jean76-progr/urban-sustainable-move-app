import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
    return (
        <motion.svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
        >
            <circle cx="50" cy="50" r="45" fill="white" fillOpacity="0.2" />
            <motion.path
                d="M50 10 L90 90 L10 90 Z"
                fill="white"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
        </motion.svg>
    );
};

export default AnimatedLogo;