const Recipe = require('../models/recipeModel');

const getUsersRecipes = async (req, res) => {
    const user_id = req.user._id

    const recipes = await Recipe.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(recipes)
}

// POST a new recipe
const createRecipe = async (req, res) => {
    const { title, description, ingredients } = req.body;

    // Validate input
    if (!title || !description || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'All fields are required and ingredients must be a non-empty array' });
    }

    try {
        const user_id = req.user._id
        const recipe = await Recipe.create({ title, description, ingredients, user_id });
        res.status(201).json(recipe); // 201 for created
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// UPDATE a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const recipe = await Recipe.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getUsersRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe
}
