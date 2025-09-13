const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Meal = require('./models/Meal');
const Offer = require('./models/Offer');
const Restaurant = require('./models/Restaurant');

dotenv.config();

const sampleMeals = [
  {
    name: "شاورما دجاج",
    description: "شاورما دجاج طازجة مع الخضار الطازجة والصلصات الأصيلة",
    price: 45.99,
    originalPrice: 55.99,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
    ingredients: ["دجاج", "خضار طازجة", "صلصة الثوم", "خبز عربي"],
    isSpecial: true,
    discount: 18,
    rating: 4.9
  },
  {
    name: "بروستد دجاج مقرمش",
    description: "دجاج مقرمش ومتبل بالتوابل السرية مع البطاطس المقلية",
    price: 52.99,
    originalPrice: 62.99,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=80",
    ingredients: ["دجاج", "توابل سرية", "بطاطس", "صلصة حارة"],
    isSpecial: true,
    discount: 16,
    rating: 4.8
  },
  {
    name: "مشاوي لحم",
    description: "لحم مشوي على الفحم مع الأرز الأبيض والسلطة العربية",
    price: 89.99,
    originalPrice: 99.99,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop",
    ingredients: ["لحم بقري", "أرز أبيض", "سلطة عربية", "صلصة الطماطم"],
    isSpecial: true,
    discount: 10,
    rating: 4.7
  },
  {
    name: "كباب مشوي",
    description: "كباب لحم طازج مشوي مع الخضار المشوية والصلصات",
    price: 75.99,
    originalPrice: 85.99,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&h=400&fit=crop",
    ingredients: ["لحم مفروم", "بصل", "طماطم", "توابل عربية"],
    isSpecial: true,
    discount: 12,
    rating: 4.6
  },
  {
    name: "فتة دجاج",
    description: "فتة دجاج تقليدية مع الخبز المحمص واللبن والصنوبر",
    price: 65.99,
    category: "main-course",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=400&fit=crop",
    ingredients: ["دجاج", "خبز محمص", "لبن", "صنوبر"],
    isSpecial: false,
    rating: 4.5
  },
  {
    name: "حمص بالطحينة",
    description: "حمص كريمي مع الطحينة وزيت الزيتون والصنوبر",
    price: 25.99,
    category: "appetizer",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&h=400&fit=crop",
    ingredients: ["حمص", "طحينة", "زيت زيتون", "صنوبر", "ليمون"],
    isSpecial: false,
    rating: 4.8
  },
  {
    name: "متبل باذنجان",
    description: "باذنجان مشوي مع الطحينة والثوم وزيت الزيتون",
    price: 28.99,
    category: "appetizer",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop",
    ingredients: ["باذنجان", "طحينة", "ثوم", "زيت زيتون", "ليمون"],
    isSpecial: false,
    rating: 4.4
  },
  {
    name: "كنافة نابلسية",
    description: "كنافة نابلسية تقليدية مع الجبن والقطر",
    price: 35.99,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop",
    ingredients: ["عجينة الكنافة", "جبن", "قطر", "صنوبر"],
    isSpecial: false,
    rating: 4.9
  },
  {
    name: "بكلاوة بالجوز",
    description: "بكلاوة تقليدية مع الجوز والقطر",
    price: 32.99,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop",
    ingredients: ["عجينة البكلاوة", "جوز", "قطر", "زبدة"],
    isSpecial: false,
    rating: 4.7
  },
  {
    name: "عصير برتقال طازج",
    description: "عصير برتقال طازج مع قطع البرتقال",
    price: 18.99,
    category: "beverage",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&h=400&fit=crop",
    ingredients: ["برتقال طازج", "سكر", "ماء", "ثلج"],
    isSpecial: false,
    rating: 4.6
  }
];

const sampleOffers = [
  {
    title: "عرض نهاية الأسبوع",
    description: "احصل على خصم 20% على جميع الأطباق الرئيسية هذا الأسبوع",
    discountPercentage: 20,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    minOrderAmount: 100,
    promoCode: "WEEKEND20"
  },
  {
    title: "عرض العملاء الجدد",
    description: "العملاء الجدد يحصلون على خصم 15% على طلبهم بالكامل",
    discountPercentage: 15,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    minOrderAmount: 75,
    promoCode: "NEW15"
  },
  {
    title: "ساعة سعيدة",
    description: "خصم 50% على جميع المشروبات من 3-5 مساءً",
    discountPercentage: 50,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    minOrderAmount: 0,
    maxDiscountAmount: 40
  }
];

const sampleRestaurant = {
  name: "مطعم أوسال",
  description: "استمتع بتجربة طعام أصيلة مع قائمتنا المتنوعة من الأطباق الشهية والمكونات الطازجة. نفتخر بتقديم خدمة استثنائية وتجارب طعام لا تُنسى.",
  address: {
    street: "شارع الملك فهد",
    city: "الرياض",
    state: "الرياض",
    zipCode: "12345",
    country: "المملكة العربية السعودية"
  },
  contact: {
    phone: "+966 50 123 4567",
    email: "info@osal.com",
    website: "www.osal.com"
  },
  hours: {
    monday: { open: "11:00", close: "22:00", closed: false },
    tuesday: { open: "11:00", close: "22:00", closed: false },
    wednesday: { open: "11:00", close: "22:00", closed: false },
    thursday: { open: "11:00", close: "22:00", closed: false },
    friday: { open: "11:00", close: "23:00", closed: false },
    saturday: { open: "10:00", close: "23:00", closed: false },
    sunday: { open: "10:00", close: "21:00", closed: false }
  },
  socialMedia: {
    facebook: "https://facebook.com/mamanoura",
    instagram: "https://instagram.com/mamanoura",
    twitter: "https://twitter.com/mamanoura"
  },
  images: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
  ],
  features: [
    "طعام أصيل",
    "جلوس خارجي",
    "مناسبات خاصة",
    "اختيار المشروبات",
    "خيارات نباتية",
    "قائمة خالية من الجلوتين"
  ],
  rating: 4.6,
  totalReviews: 127
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Clear existing data
    await Meal.deleteMany({});
    await Offer.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    const meals = await Meal.insertMany(sampleMeals);
    console.log(`Inserted ${meals.length} meals`);

    // Update offers with meal references
    const updatedOffers = sampleOffers.map(offer => ({
      ...offer,
      applicableMeals: meals.map(meal => meal._id)
    }));
    
    const offers = await Offer.insertMany(updatedOffers);
    console.log(`Inserted ${offers.length} offers`);

    const restaurant = await Restaurant.create(sampleRestaurant);
    console.log('Inserted restaurant data');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

