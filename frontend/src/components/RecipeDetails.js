import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetails = ({ recipe }) => {
    return (
        <div className="recipe-details">
            <h4>{recipe.title}</h4>
            <p><strong>Details: </strong>{recipe.description}</p>
            <p>{ formatDistanceToNow(new Date(recipe.createdAt), {addSuffix: TextTrackCue}) }</p>
        </div>
    )
}

export default RecipeDetails