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
            <h2>User Profile</h2>
            <p>Email: {user?.email}</p>
            <div className="recipes-grid">
                {recipes && recipes.map((recipe) => (
                    <RecipeDetails key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
