'use client';

import { useState, useEffect } from 'react';
import { ChefHat, Award, Users, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { apiService } from '@/lib/api';

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  hours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  features: string[];
  rating: number;
  totalReviews: number;
}

const About = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const data = await apiService.getRestaurantInfo();
        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant info:', error);
        // Fallback data
        setRestaurant({
          _id: '1',
          name: 'مطعم أوسال',
          description: 'استمتع بتجربة طعام أصيلة مع قائمتنا المتنوعة من الأطباق الشهية والمكونات الطازجة. نفتخر بتقديم خدمة استثنائية وتجارب طعام لا تُنسى.',
          address: {
            street: 'شارع الملك فهد',
            city: 'الرياض',
            state: 'الرياض',
            zipCode: '12345'
          },
          contact: {
            phone: '+966 50 123 4567',
            email: 'info@mamanoura.com',
            website: 'www.mamanoura.com'
          },
          hours: {
            monday: { open: '11:00', close: '22:00', closed: false },
            tuesday: { open: '11:00', close: '22:00', closed: false },
            wednesday: { open: '11:00', close: '22:00', closed: false },
            thursday: { open: '11:00', close: '22:00', closed: false },
            friday: { open: '11:00', close: '23:00', closed: false },
            saturday: { open: '10:00', close: '23:00', closed: false },
            sunday: { open: '10:00', close: '21:00', closed: false }
          },
          features: [
            'طعام أصيل',
            'جلوس خارجي',
            'مناسبات خاصة',
            'اختيار المشروبات',
            'خيارات نباتية',
            'قائمة خالية من الجلوتين'
          ],
          rating: 4.6,
          totalReviews: 127
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantInfo();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!restaurant) return null;

  const features = [
    { icon: ChefHat, title: 'طهاة خبراء', description: 'طهاة عالميون يجلبون سنوات من الخبرة' },
    { icon: Award, title: 'حائز على جوائز', description: 'معترف به للتميز في الطعام الأصيل' },
    { icon: Users, title: 'عملاء سعداء', description: 'أكثر من 500+ عميل راضٍ تم خدمتهم' },
    { icon: Clock, title: '15+ سنة', description: 'نخدم المجتمع منذ عام 2008' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            عن <span className="text-gradient">أوسال</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
            {restaurant.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
              alt="Restaurant Interior"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-red-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold">{restaurant.rating}</div>
              <div className="text-sm opacity-90">التقييم المتوسط</div>
              <div className="text-xs opacity-75">{restaurant.totalReviews} تقييم</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                قصتنا
              </h3>
              <p className="text-gray-600 leading-relaxed">
                تأسس مطعم أوسال في عام 2008، وأصبح ركيزة أساسية للطعام الأصيل في قلب المدينة. 
                التزامنا باستخدام أجود المكونات الطازجة المحلية مع 
                تقنيات الطبخ المبتكرة جعلنا نكتسب اعترافاً كواحد من أفضل 
                وجهات الطعام في المنطقة.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ما نقدمه
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {restaurant.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="btn-primary">
                قصتنا
              </button>
              <button className="btn-secondary">
                تعرف على فريقنا
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-100 rounded-full">
                  <feature.icon className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">الموقع</h3>
              <p className="text-gray-600">
                {restaurant.address.street}<br />
                {restaurant.address.city}, {restaurant.address.state} {restaurant.address.zipCode}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">الهاتف</h3>
              <p className="text-gray-600">{restaurant.contact.phone}</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600">{restaurant.contact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

