
import { useState } from 'react';
import data from '../data/spa/data.json';

export default function RecipeCategories() {
    const [activeTab, setActiveTab] = useState(data.categories[0].id);
    console.log('activeTab:', activeTab);
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Recipe Categories</h2>
            <div className="flex border-b border-gray-300">
                {data.categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`px-4 py-2 -mb-px border-b-2 transition-colors duration-200
                            ${activeTab === cat.id
                                ? 'border-blue-500 text-blue-600 font-semibold'
                                : 'border-transparent text-gray-600 hover:text-blue-500'}
                        `}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <div className="p-4">
                <p>
                    Contenido de la categoría:{' '}
                    <strong>
                        {data.categories.find(cat => cat.id === activeTab).name}
                    </strong>
                </p>
                {/* Aquí puedes renderizar más información según la categoría seleccionada */}
            </div>
        </div>
    );
}