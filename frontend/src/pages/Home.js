import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import RecipeDetails from '../components/RecipeDetails'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    const [recipes, setRecipes] = useState(null);
    const { user } = useAuthContext()
    
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
            <div className='leftBar'>
                { user && (
                    <div>
                        <Link to="/addRecipe">
                            <p>Add Recipe</p>
                        </Link>
                        <Link to="/profile">
                            <p>My profile</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
