const express=require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg:'GET all recipes'})
})

router.get('/:id', (req, res) => {
    res.json({mssg:'GET a single recipe'})
})

router.post('/', (req, res) => {
    res.json({mssg:'POST a new recipe'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg:'DELETE a recipe'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg:'UPDATE a recipe'})
})

module.exports = router