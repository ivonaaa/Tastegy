import { useEffect, useState } from 'react';
import RecipeDetails from '../components/RecipeDetails'

const Home = () => {
    const [recipes, setRecipes] = useState(null);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipes/');
            const json = await response.json();

            if (response.ok) {
                setRecipes(json);
            }
        };

        fetchRecipes();
    }, []);
    
    return (
        <div className="home">
            <div className="recipes">
                {recipes && recipes.map((recipe) => (
                    <p key={recipe._id}>
                        <RecipeDetails key={recipe._id} recipe={recipe} />
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Home;
