'use client';

import { useState, useEffect } from 'react';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { apiService } from '@/lib/api';

interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  promoCode?: string;
  minOrderAmount: number;
}

const SpecialOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await apiService.getOffers();
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        // Fallback data
        setOffers([
          {
            _id: '1',
            title: 'عرض نهاية الأسبوع',
            description: 'احصل على خصم 20% على جميع الأطباق الرئيسية هذا الأسبوع',
            discountPercentage: 20,
            validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            promoCode: 'WEEKEND20',
            minOrderAmount: 30
          },
          {
            _id: '2',
            title: 'عرض العملاء الجدد',
            description: 'العملاء الجدد يحصلون على خصم 15% على طلبهم بالكامل',
            discountPercentage: 15,
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            promoCode: 'NEW15',
            minOrderAmount: 20
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="offers" className="py-20 bg-gray-50">
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
    <section id="offers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-red-100 to-orange-100 px-8 py-4 rounded-full mb-8">
            <span className="text-red-700 font-bold text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>🎉 عروض حصرية</span>
          </div>
          <h2 className="section-title text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="text-gradient">العروض</span> الخاصة
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
            لا تفوت عروضنا الحصرية والعروض المحدودة الوقت. 
            وفر أكثر وأنت تستمتع بأشهى أطباقنا الأصيلة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={offer._id}
              className="card card-hover bg-gradient-to-br from-white to-red-50 p-8 animate-slide-up border-2 border-red-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-full">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-gradient">
                      {offer.discountPercentage}%
                    </span>
                    <div className="text-sm text-gray-600 font-medium">خصم</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 bg-red-100 px-3 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    حتى {formatDate(offer.validUntil)}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                {offer.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                {offer.description}
              </p>

              {offer.promoCode && (
                <div className="bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-300 rounded-xl p-4 mb-6">
                  <div className="text-sm text-red-700 font-semibold mb-2" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                    كود الخصم:
                  </div>
                  <div className="font-mono bg-white px-4 py-2 rounded-lg text-red-800 font-bold text-lg border border-red-300">
                    {offer.promoCode}
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-600 mb-6 bg-red-50 px-4 py-3 rounded-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                <span className="font-semibold">الحد الأدنى للطلب:</span> {offer.minOrderAmount} ريال
              </div>

              <button className="w-full btn-primary flex items-center justify-center space-x-2 text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                <span>🎉 احصل على العرض</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
            شاهد جميع العروض
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

