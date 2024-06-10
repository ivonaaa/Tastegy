const express = require('express');
const {
    getUsersRecipes,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    addCommentToRecipe
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

router.post('/:id/comment', addCommentToRecipe);

module.exports = router;
