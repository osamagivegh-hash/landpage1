const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const Offer = require('../models/Offer');
const Restaurant = require('../models/Restaurant');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Apply authentication and admin role to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalMeals = await Meal.countDocuments();
    const totalOffers = await Offer.countDocuments();
    const specialMeals = await Meal.countDocuments({ isSpecial: true });
    
    res.json({
      totalMeals,
      totalOffers,
      specialMeals,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

// Get all meals for admin
router.get('/meals', async (req, res) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meals', error: error.message });
  }
});

// Create new meal
router.post('/meals', async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ message: 'Error creating meal', error: error.message });
  }
});

// Update meal
router.put('/meals/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json(meal);
  } catch (error) {
    res.status(400).json({ message: 'Error updating meal', error: error.message });
  }
});

// Delete meal
router.delete('/meals/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting meal', error: error.message });
  }
});

// Get all offers for admin
router.get('/offers', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offers', error: error.message });
  }
});

// Create new offer
router.post('/offers', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating offer', error: error.message });
  }
});

// Update offer
router.put('/offers/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json(offer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating offer', error: error.message });
  }
});

// Delete offer
router.delete('/offers/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting offer', error: error.message });
  }
});

// Get restaurant settings
router.get('/settings', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
});

// Update restaurant settings
router.put('/settings', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: 'Error updating settings', error: error.message });
  }
});

module.exports = router;
