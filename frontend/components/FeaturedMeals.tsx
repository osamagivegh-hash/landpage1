'use client';

import { useState, useEffect } from 'react';
import { Star, Clock, Users, Heart } from 'lucide-react';
import { apiService } from '@/lib/api';

interface Meal {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  ingredients: string[];
  isSpecial: boolean;
  discount?: number;
  rating: number;
}

const FeaturedMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'appetizer', name: 'المقبلات' },
    { id: 'main-course', name: 'الأطباق الرئيسية' },
    { id: 'dessert', name: 'الحلويات' },
    { id: 'beverage', name: 'المشروبات' },
  ];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await apiService.getMeals();
        setMeals(data.meals || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
        // Don't use fallback data - show empty state instead
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
    
    // إعادة تحميل البيانات كل 5 ثواني لضمان المزامنة
    const interval = setInterval(fetchMeals, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredMeals = selectedCategory === 'all' 
    ? meals 
    : meals.filter(meal => meal.category === selectedCategory);

  if (loading) {
    return (
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-red-100 to-red-200 px-8 py-4 rounded-full mb-8">
            <span className="text-red-700 font-bold text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>🍽️ قائمتنا الشهية</span>
          </div>
          <h2 className="section-title text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="text-gradient">قائمتنا</span> المميزة
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
            اكتشف أطباقنا المصنوعة بعناية من أجود المكونات الطازجة 
            وتقنيات الطبخ التقليدية الأصيلة
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-10 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-red-50 border-2 border-gray-200 hover:border-red-300 shadow-lg hover:shadow-xl'
              }`}
              style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        {filteredMeals.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد وجبات متاحة</h3>
            <p className="text-gray-600">يرجى المحاولة مرة أخرى لاحقاً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMeals.map((meal, index) => (
            <div
              key={meal._id}
              className="card card-hover group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {meal.isSpecial && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ مميز
                  </div>
                )}
                {meal.discount && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                    -{meal.discount}%
                  </div>
                )}
                
                <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg">
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                    {meal.name}
                  </h3>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-yellow-700">{meal.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                  {meal.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gradient">
                      {meal.price} ريال
                    </span>
                    {meal.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {meal.originalPrice} ريال
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">15-20 دقيقة</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button className="btn-primary flex-1 text-sm">
                    🛒 أضف للسلة
                  </button>
                  <button className="bg-gray-100 hover:bg-red-100 p-3 rounded-xl transition-colors group">
                    <Users className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="btn-secondary">
            شاهد القائمة الكاملة
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMeals;

