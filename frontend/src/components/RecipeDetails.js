const RecipeDetails = ({ recipe }) => {
    return (
        <div className="recipe-details">
            <h4>{recipe.title}</h4>
            <p><strong>Details: </strong>{recipe.description}</p>
        </div>
    )
}

export default RecipeDetails