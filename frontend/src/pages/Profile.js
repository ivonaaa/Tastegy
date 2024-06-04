import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import RecipeDetails from '../components/RecipeDetails';

const Profile = () => {
    const { user } = useAuthContext();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            const response = await fetch('/api/userRecipes/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                setRecipes(json);
            }
        };

        if (user) {
            fetchUserRecipes();
        }
    }, [user]);

    return (
        <div className="profile">
            <div className='userDetails'>
                <h2>My Profile</h2>
                <p>Email: {user?.email}</p>
                <h3>My Recipes: </h3>
                <div className="recipes-grid">
                    {recipes && recipes.map((recipe) => (
                        <p key={recipe._id}>
                            <RecipeDetails key={recipe._id} recipe={recipe} />
                        </p>
                    ))}
                </div>
            </div>
            <div className='userRecipeInfo'>
                neke info
            </div>
        </div>
    );
};

export default Profile;
