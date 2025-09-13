const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableMeals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }],
  minOrderAmount: {
    type: Number,
    default: 0
  },
  maxDiscountAmount: {
    type: Number,
    default: null
  },
  promoCode: {
    type: String,
    unique: true,
    sparse: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

// Index for active offers
offerSchema.index({ isActive: 1, validFrom: 1, validUntil: 1 });

module.exports = mongoose.model('Offer', offerSchema);


