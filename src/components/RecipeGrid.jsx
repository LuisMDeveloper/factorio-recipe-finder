
import { useState } from 'react';
import data from '../data/spa/data.json';
import Icon from './Icon';

export default function RecipeGrid() {
    const [ingredientInput, setIngredientInput] = useState('');
    const [filterIngredients, setFilterIngredients] = useState([]);
    const [minMatches, setMinMatches] = useState(0); // Número mínimo de coincidencias (0 para "todos los ingredientes")

    // Filtrar items por búsqueda
    const filteredItems = data.items.filter(item =>
        item.name.toLowerCase().includes(ingredientInput.toLowerCase())
    );

    // Agregar ingrediente del input a la lista de filtro
    const handleAddIngredient = () => {
        const trimmed = ingredientInput.trim();
        if (
            trimmed &&
            data.items.some(item => item.name.toLowerCase() === trimmed.toLowerCase()) &&
            !filterIngredients.includes(trimmed)
        ) {
            // Usar el nombre correcto del item (case sensitive)
            const found = data.items.find(item => item.name.toLowerCase() === trimmed.toLowerCase());
            setFilterIngredients([...filterIngredients, found.id]);
        }
        setIngredientInput(''); // Limpiar el input después de agregar
    };

    // Eliminar ingrediente de la lista de filtro
    const handleRemoveIngredient = (name) => {
        setFilterIngredients(filterIngredients.filter(i => i !== name));
    };

    // Filtrar recetas por ingredientes seleccionados
    const filteredRecipes = data.recipes.filter(recipe => {
        console.log("filterIngredients", filterIngredients);
        console.log("recipe.in", recipe.in);
        if (filterIngredients.length === 0) return true;
        const recipeIngredients = Object.keys(recipe.in || {}).map(k => k.toLowerCase());
        const matches = filterIngredients.filter(f => recipeIngredients.includes(f)).length;
        if (minMatches === 0) {
            // Caso especial: filtrar recetas que contengan *todos* los ingredientes seleccionados
            return filterIngredients.every(f => recipeIngredients.includes(f));
        }
        // Filtrar recetas que cumplan con el número mínimo de coincidencias
        return matches >= minMatches;
    });

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Todas las Recetas</h2>
            <div className="mb-4">
                <div className="flex gap-2 items-end">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Buscar ingrediente..."
                            value={ingredientInput}
                            onChange={e => {
                                setIngredientInput(e.target.value);
                            }}
                            className="border rounded px-3 py-2 w-full"
                            list="ingredient-list"
                        />
                        <datalist id="ingredient-list">
                            {filteredItems.map(item => (
                                <option key={item.id} value={item.name} />
                            ))}
                        </datalist>
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        disabled={
                            !ingredientInput ||
                            !filteredItems.some(item => item.name.toLowerCase() === ingredientInput.toLowerCase()) ||
                            filterIngredients.includes(
                                (data.items.find(item => item.name.toLowerCase() === ingredientInput.toLowerCase()) || {}).name
                            )
                        }
                        onClick={handleAddIngredient}
                    >
                        Agregar
                    </button>
                </div>
                {/* Control para el número mínimo de coincidencias */}
                <div className="mt-2">
                    <label className="mr-2">Número mínimo de coincidencias:</label>
                    <input
                        type="number"
                        min="0"
                        max={filterIngredients.length || 1}
                        value={minMatches}
                        onChange={e => setMinMatches(Number(e.target.value))}
                        className="border rounded px-2 py-1 w-16"
                    />
                </div>
                {/* Lista de ingredientes seleccionados */}
                {filterIngredients.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {filterIngredients.map(name => (
                            <span key={name} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                {name}
                                <button
                                    className="ml-1 text-xs text-red-500 hover:text-red-700"
                                    onClick={() => handleRemoveIngredient(name)}
                                    title="Quitar"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <li key={recipe.id} className="p-2 border rounded bg-gray-50">
                            <Icon id={recipe.id} />
                            <span className="font-medium">{recipe.name}</span>
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
