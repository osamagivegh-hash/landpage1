'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';
import OfferImageUpload from './OfferImageUpload';

interface Offer {
  _id?: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  promoCode?: string;
  minOrderAmount: number;
  image?: string;
}

interface OfferFormProps {
  offer?: Offer | null;
  onSave: (offer: Offer) => void;
  onCancel: () => void;
}

const OfferForm = ({ offer, onSave, onCancel }: OfferFormProps) => {
  const [formData, setFormData] = useState<Offer>({
    _id: offer?._id || '',
    title: offer?.title || '',
    description: offer?.description || '',
    discountPercentage: offer?.discountPercentage || 0,
    validUntil: offer?.validUntil ? new Date(offer.validUntil).toISOString().split('T')[0] : '',
    promoCode: offer?.promoCode || '',
    minOrderAmount: offer?.minOrderAmount || 0,
    image: offer?.image || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const offerData = {
      ...formData,
      validUntil: new Date(formData.validUntil).toISOString(),
    };
    onSave(offerData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
            {offer ? 'تعديل العرض' : 'إضافة عرض جديد'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان العرض *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="أدخل عنوان العرض"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف العرض *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="أدخل وصف العرض"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نسبة الخصم (%) *
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                required
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأدنى للطلب (ريال) *
              </label>
              <input
                type="number"
                name="minOrderAmount"
                value={formData.minOrderAmount}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ انتهاء العرض *
            </label>
            <input
              type="date"
              name="validUntil"
              value={formData.validUntil}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كود الخصم (اختياري)
            </label>
            <input
              type="text"
              name="promoCode"
              value={formData.promoCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="أدخل كود الخصم"
            />
          </div>

          <OfferImageUpload
            onImageUpload={(imageUrl) => setFormData(prev => ({ ...prev, image: imageUrl }))}
            currentImage={formData.image}
          />

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>حفظ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferForm;
