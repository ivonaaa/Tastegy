import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom';

const RecipeDetails = ({ recipe }) => {
    return (
        <div className="recipe-details">
            <h4>{recipe.title}</h4>
            <p><strong>Details: </strong>{recipe.description}</p>
            <p>{ formatDistanceToNow(new Date(recipe.createdAt), {addSuffix: TextTrackCue}) }</p>
            <Link to={`/recipe/${recipe._id}`}>View Details</Link>
        </div>
    )
}

export default RecipeDetails