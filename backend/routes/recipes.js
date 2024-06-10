const express = require('express');

const { 
    getRecipies,
    getRecipe,
    getRecipeComments,
    getAllRatingsForRecipe
} = require('../controllers/recipeController')

const router = express.Router();

// GET all recipes
router.get('/', getRecipies);

// GET a single recipe
router.get('/:id', getRecipe);

// GET all comments for a recipe
router.get('/:id/comments', getRecipeComments);

router.get('/:id/ratings', getAllRatingsForRecipe);

module.exports = router;
