import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const { user } = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6); // Set recipes per page

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

    // Get current recipes
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    return (
        <div className="home">
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
                { !user && (
                    <div>
                        <p>
                            By signing up or logging in you get great benefits. <br></br>
                            See your profile, add delicious recipes, comment 
                            and review recipes by being a member of Tastegy. 
                        </p>
                        <div className='loginButton'>
                            <Link to="/login">
                                <p>Log in</p>
                            </Link>
                            <p> for free now!</p>
                        </div>
                    </div>
                )}
            </div>
            <div className='rightBar'>
                <div className="recipes">
                    {currentRecipes.map((recipe) => (
                        <RecipeDetails key={recipe._id} recipe={recipe} />
                    ))}
                </div>
                <div className="pagination">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
