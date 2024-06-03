const Recipe = require('../models/recipeModel');

// GET all recipes
const getRecipies = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).sort({createdAt: -1});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET a single recipe
const getRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getRecipies,
    getRecipe
}