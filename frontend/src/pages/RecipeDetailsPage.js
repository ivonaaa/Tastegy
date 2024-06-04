import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipes/${id}`);
            const json = await response.json();

            if (response.ok) {
                setRecipe(json);
            }
        };

        fetchRecipe();
    }, [id]);

    return (
        <div className="recipe-details">
            {recipe ? (
                <div>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.name}>
                                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecipeDetailsPage;
