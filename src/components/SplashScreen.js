import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
    return (
        <motion.div
            className="fixed inset-0 bg-green-600 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
                className="text-center w-full max-w-sm mx-auto"
            >
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Urban Sustainable Move
                </motion.h1>
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    by Jean JANEL
                </motion.h1>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="w-16 sm:w-24 h-1 bg-white mx-auto rounded-full"
                />
            </motion.div>
        </motion.div>
    );
};

export default SplashScreen;