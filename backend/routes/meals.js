const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// Get all meals
router.get('/', async (req, res) => {
  try {
    const { category, isSpecial, limit = 20, page = 1 } = req.query;
    const query = { isAvailable: true };
    
    if (category) query.category = category;
    if (isSpecial === 'true') query.isSpecial = true;
    
    const skip = (page - 1) * limit;
    
    const meals = await Meal.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Meal.countDocuments(query);
    
    res.json({
      meals,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalMeals: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get meal by ID
router.get('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get special meals
router.get('/special/offers', async (req, res) => {
  try {
    const specialMeals = await Meal.find({ 
      isSpecial: true, 
      isAvailable: true 
    }).sort({ createdAt: -1 });
    
    res.json(specialMeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get meals by category
router.get('/category/:category', async (req, res) => {
  try {
    const meals = await Meal.find({ 
      category: req.params.category,
      isAvailable: true 
    }).sort({ createdAt: -1 });
    
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new meal (Admin only - in real app, add authentication)
router.post('/', async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update meal (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    
    res.json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete meal (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



