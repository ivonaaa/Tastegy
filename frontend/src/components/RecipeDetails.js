import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetails = ({ recipe }) => {
    return (
        <div className="recipe-details">
            <h4>
                {recipe.title} 
            </h4>
            {recipe.rating ? <p>Your rating: {recipe.rating}</p> : null}
            <p><strong>Details: </strong>{recipe.description}</p>
            <p>{ formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true }) }</p>
        </div>
    )
}

export default RecipeDetails
