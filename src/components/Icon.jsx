import React from 'react';
import data from '../data/spa/data.json';

const Icon = ({ id, size = 64, className = '' }) => {
    // Buscar los datos del icono en el JSON
    const iconData = data.icons.find(icon => icon.id === id);
    
    if (!iconData) {
        // Fallback si no se encuentra el icono
        return (
            <div 
                className={`inline-block bg-gray-300 ${className}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                }}
                title={`Icon not found: ${id}`}
            />
        );
    }

    return (
        <div
            className={`inline-block ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundImage: `url('/icons.webp')`,
                backgroundPosition: iconData.position,
                backgroundSize: 'auto',
                imageRendering: 'pixelated', // Para arte de píxeles nítido
            }}
            title={id}
        />
    );
};

export default Icon;
