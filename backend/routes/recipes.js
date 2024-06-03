const express = require('express');

const { 
    getRecipies,
    getRecipe
} = require('../controllers/recipeController')

const router = express.Router();

// GET all recipes
router.get('/', getRecipies);

// GET a single recipe
router.get('/:id', getRecipe);

module.exports = router;
