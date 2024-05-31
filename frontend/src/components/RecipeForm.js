import { useState } from 'react';

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
    const [error, setError] = useState(null);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
    };

    const handleIngredientChange = (index, event) => {
        const { name, value } = event.target;
        const newIngredients = ingredients.slice();
        newIngredients[index][name] = value;
        setIngredients(newIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipe = { title, description, ingredients };
        const response = await fetch('/api/recipes', {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setError(null)
            console.log('New recipe added!', json)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows="4"
                />
            </div>
            <div>
                <label>Ingredients:</label>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, e)}
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, e)}
                            required
                        />
                        <input
                            type="text"
                            name="unit"
                            placeholder="Unit"
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient}>
                    Add Ingredient
                </button>
            </div>
            <button type="submit">Submit Recipe</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default RecipeForm;
