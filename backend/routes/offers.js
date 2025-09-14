const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// Get all active offers
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const offers = await Offer.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    }).populate('applicableMeals', 'name price image')
      .sort({ createdAt: -1 });
    
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get offer by ID
router.get('/:id', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate('applicableMeals', 'name price image description');
    
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get offer by promo code
router.get('/promo/:code', async (req, res) => {
  try {
    const now = new Date();
    const offer = await Offer.findOne({
      promoCode: req.params.code,
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    }).populate('applicableMeals', 'name price image');
    
    if (!offer) {
      return res.status(404).json({ message: 'Invalid or expired promo code' });
    }
    
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new offer (Admin only)
router.post('/', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update offer (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    
    res.json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete offer (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



