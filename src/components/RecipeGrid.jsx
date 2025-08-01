import { useState } from 'react';
import data from '../data/spa/data.json';

export default function RecipeGrid() {
    const [ingredientFilter, setIngredientFilter] = useState('');

    // Parse filter into array of ingredients (comma or space separated)
    const filterIngredients = ingredientFilter
        .split(/[,\s]+/)
        .map(i => i.trim().toLowerCase())
        .filter(Boolean);

    // Filter recipes by ingredients
    const filteredRecipes = data.recipes.filter(recipe => {
        if (filterIngredients.length === 0) return true;
        const recipeIngredients = Object.keys(recipe.in || {}).map(k => k.toLowerCase());
        return filterIngredients.every(f => recipeIngredients.includes(f));
    });

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Todas las Recetas</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por ingredientes (ej: hierro, cobre)"
                    value={ingredientFilter}
                    onChange={e => setIngredientFilter(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                />
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <li key={recipe.id} className="p-2 border rounded bg-gray-50">
                            <span className="font-medium">{recipe.name}</span>
                            <span className="ml-2 text-xs text-gray-500">({recipe.time}s)</span>
                            <div className="text-xs text-gray-600 mt-1">
                                Ingredientes: {Object.entries(recipe.in).map(([k, v]) => `${v} ${k}`).join(', ')}
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400 italic">No se encontraron recetas.</li>
                )}
            </ul>
        </div>
    );
}
