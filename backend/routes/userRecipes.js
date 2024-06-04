const express = require('express');
const {
    getUsersRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe
} = require('../controllers/userRecipeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth)

router.get('/', getUsersRecipes)

// POST a new recipe (protected)
router.post('/', createRecipe);

// DELETE a recipe (protected)
router.delete('/:id', deleteRecipe);

// UPDATE a recipe (protected)
router.patch('/:id', updateRecipe);

module.exports = router;