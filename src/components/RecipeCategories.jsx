
import { useState } from 'react';
import data from '../data/spa/data.json';

export default function RecipeCategories() {
    const [activeTab, setActiveTab] = useState(data.categories[0].id);
    const filteredRecipes = data.recipes.filter(recipe => recipe.category === activeTab);

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
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map(recipe => (
                            <li key={recipe.id} className="p-2 border rounded bg-gray-50">
                                <span className="font-medium">{recipe.name}</span>
                                <span className="ml-2 text-xs text-gray-500">({recipe.time}s)</span>
                                <div className="text-xs text-gray-600 mt-1">
                                    Ingredientes: {Object.entries(recipe.in).map(([k, v]) => `${v} ${k}`).join(', ')}
                                </div>
                                <div className="text-xs text-gray-600">
                                    Producción: {Object.entries(recipe.out).map(([k, v]) => `${v} ${k}`).join(', ')}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-400 italic">No recipes in this category.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}