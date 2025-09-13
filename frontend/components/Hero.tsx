'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Star, Users, Award } from 'lucide-react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-8 text-white">
            مرحباً بكم في{' '}
            <span className="text-red-300">أوسال</span>
          </h1>
          <p className="text-xl md:text-3xl mb-10 text-gray-100 leading-relaxed" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
            استمتع بتجربة طعام أصيلة مع قائمتنا المتنوعة من الأطباق الشهية والمكونات الطازجة 
            المحضرة بأيدي طهاة مهرة.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <button className="btn-primary text-xl px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-2xl hover:shadow-3xl">
              🍽️ شاهد قائمتنا
            </button>
            <button className="btn-secondary text-xl px-12 py-6 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 hover:border-white/50 shadow-2xl hover:shadow-3xl">
              📞 احجز طاولة
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 animate-slide-up">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <Star className="w-10 h-10 text-red-300 fill-current" />
            </div>
            <div className="text-4xl font-bold text-white mb-2" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>4.8</div>
            <div className="text-gray-200 text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>التقييم المتوسط</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <Users className="w-10 h-10 text-red-300" />
            </div>
            <div className="text-4xl font-bold text-white mb-2" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>500+</div>
            <div className="text-gray-200 text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>عميل سعيد</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex justify-center mb-4">
              <Award className="w-10 h-10 text-red-300" />
            </div>
            <div className="text-4xl font-bold text-white mb-2" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>15+</div>
            <div className="text-gray-200 text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>سنة خبرة</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

export default Hero;

