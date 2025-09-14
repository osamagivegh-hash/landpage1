'use client';

import React, { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://landpage1-production.railway.app';
import { 
  LayoutDashboard, 
  Utensils, 
  Tag, 
  MessageSquare, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save,
  X
} from 'lucide-react';
import MealForm from '@/components/admin/MealForm';
import OfferForm from '@/components/admin/OfferForm';

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

interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  promoCode?: string;
  minOrderAmount: number;
  image?: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  time: string;
  guests: string;
  isRead: boolean;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check authentication on component mount
  React.useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAuthenticated(isLoggedIn);
    setCheckingAuth(false);
    
    if (isLoggedIn) {
      loadData();
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load meals
      const mealsResponse = await fetch(`${API_BASE_URL}/api/admin/meals`);
      if (mealsResponse.ok) {
        const mealsData = await mealsResponse.json();
        setMeals(mealsData);
      }

      // Load offers
      const offersResponse = await fetch(`${API_BASE_URL}/api/admin/offers`);
      if (offersResponse.ok) {
        const offersData = await offersResponse.json();
        setOffers(offersData);
      }

      // Load messages
      const messagesResponse = await fetch(`${API_BASE_URL}/api/messages`);
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'meals', name: 'إدارة الوجبات', icon: Utensils },
    { id: 'offers', name: 'إدارة العروض', icon: Tag },
    { id: 'messages', name: 'الرسائل', icon: MessageSquare },
    { id: 'settings', name: 'الإعدادات', icon: Settings },
  ];

  const handleAddMeal = () => {
    setShowAddMeal(true);
  };

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
  };

  const handleDeleteMeal = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الوجبة؟')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/meals/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMeals(meals.filter(meal => meal._id !== id));
          alert('تم حذف الوجبة بنجاح');
          // إعادة تحميل البيانات لضمان المزامنة
          loadData();
        } else {
          throw new Error('فشل في حذف الوجبة');
        }
      } catch (error) {
        console.error('Error deleting meal:', error);
        alert('حدث خطأ في حذف الوجبة. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const handleSaveMeal = async (meal: Meal) => {
    try {
      const url = meal._id 
        ? `${API_BASE_URL}/api/admin/meals/${meal._id}`
        : `${API_BASE_URL}/api/admin/meals`;
      
      const method = meal._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meal),
      });

      if (response.ok) {
        const savedMeal = await response.json();
        if (meal._id) {
          setMeals(meals.map(m => m._id === meal._id ? savedMeal : m));
        } else {
          setMeals([...meals, savedMeal]);
        }
        setShowAddMeal(false);
        setEditingMeal(null);
      } else {
        throw new Error('فشل في حفظ الوجبة');
      }
    } catch (error) {
      console.error('Error saving meal:', error);
      alert('حدث خطأ في حفظ الوجبة. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleCancelMeal = () => {
    setShowAddMeal(false);
    setEditingMeal(null);
  };

  const handleAddOffer = () => {
    setShowAddOffer(true);
  };

  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
  };

  const handleDeleteOffer = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/offers/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setOffers(offers.filter(offer => offer._id !== id));
          alert('تم حذف العرض بنجاح');
          // إعادة تحميل البيانات لضمان المزامنة
          loadData();
        } else {
          throw new Error('فشل في حذف العرض');
        }
      } catch (error) {
        console.error('Error deleting offer:', error);
        alert('حدث خطأ في حذف العرض. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const handleSaveOffer = async (offer: Offer) => {
    try {
      const url = offer._id 
        ? `${API_BASE_URL}/api/admin/offers/${offer._id}`
        : `${API_BASE_URL}/api/admin/offers`;
      
      const method = offer._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offer),
      });

      if (response.ok) {
        const savedOffer = await response.json();
        if (offer._id) {
          setOffers(offers.map(o => o._id === offer._id ? savedOffer : o));
        } else {
          setOffers([...offers, savedOffer]);
        }
        setShowAddOffer(false);
        setEditingOffer(null);
      } else {
        throw new Error('فشل في حفظ العرض');
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('حدث خطأ في حفظ العرض. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleCancelOffer = () => {
    setShowAddOffer(false);
    setEditingOffer(null);
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages/${id}/read`, {
        method: 'PUT',
      });

      if (response.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, isRead: true } : msg
        ));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    window.location.href = '/admin/login';
  };

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
            جاري التحقق من الصلاحيات...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    window.location.href = '/admin/login';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                لوحة تحكم أوسال
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                مرحباً، {localStorage.getItem('adminUser')}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-100 text-red-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                      {tab.name}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                  نظرة عامة
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100">إجمالي الوجبات</p>
                        <p className="text-3xl font-bold">{meals.length}</p>
                      </div>
                      <Utensils className="w-8 h-8 text-red-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">العروض النشطة</p>
                        <p className="text-3xl font-bold">{offers.length}</p>
                      </div>
                      <Tag className="w-8 h-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">الرسائل الجديدة</p>
                        <p className="text-3xl font-bold">{messages.filter(m => !m.isRead).length}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">إجمالي الرسائل</p>
                        <p className="text-3xl font-bold">{messages.length}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                      أحدث الرسائل
                    </h3>
                    <div className="space-y-3">
                      {messages.slice(0, 3).map((message) => (
                        <div key={message._id} className="bg-white p-4 rounded-lg border">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900">{message.name}</p>
                              <p className="text-sm text-gray-600">{message.subject}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              message.isRead ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {message.isRead ? 'مقروء' : 'جديد'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                      الوجبات المميزة
                    </h3>
                    <div className="space-y-3">
                      {meals.filter(meal => meal.isSpecial).slice(0, 3).map((meal) => (
                        <div key={meal._id} className="bg-white p-4 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-gray-900">{meal.name}</p>
                              <p className="text-sm text-gray-600">{meal.price} ريال</p>
                            </div>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                              مميز
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'meals' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                    إدارة الوجبات
                  </h2>
                  <button
                    onClick={handleAddMeal}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة وجبة جديدة</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الصورة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الاسم
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          السعر
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الفئة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {meals.map((meal) => (
                        <tr key={meal._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <img
                              src={meal.image}
                              alt={meal.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{meal.name}</div>
                            <div className="text-sm text-gray-500">{meal.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {meal.price} ريال
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {meal.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {meal.isSpecial && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                مميز
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditMeal(meal)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMeal(meal._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'offers' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                    إدارة العروض
                  </h2>
                  <button
                    onClick={handleAddOffer}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة عرض جديد</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.map((offer) => (
                    <div key={offer._id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                      {offer.image && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={offer.image.startsWith('http') ? offer.image : `${API_BASE_URL}${offer.image}`}
                            alt={offer.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditOffer(offer)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteOffer(offer._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm">{offer.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-red-600">
                            {offer.discountPercentage}%
                          </span>
                          <span className="text-sm text-gray-500">
                            حتى {new Date(offer.validUntil).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        {offer.promoCode && (
                          <div className="mt-3 p-2 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700">
                              <strong>كود الخصم:</strong> {offer.promoCode}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                  الرسائل
                </h2>

                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`p-6 rounded-lg border ${
                        message.isRead ? 'bg-gray-50' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                          <p className="text-sm text-gray-600">{message.email}</p>
                          <p className="text-sm text-gray-600">{message.phone}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            message.isRead ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {message.isRead ? 'مقروء' : 'جديد'}
                          </span>
                          {!message.isRead && (
                            <button
                              onClick={() => markMessageAsRead(message._id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">الموضوع: {message.subject}</h4>
                        <p className="text-gray-700">{message.message}</p>
                      </div>
                      
                      {message.subject === 'reservation' && (
                        <div className="bg-white p-4 rounded-lg border">
                          <h5 className="font-semibold text-gray-900 mb-2">تفاصيل الحجز:</h5>
                          <p className="text-sm text-gray-600">التاريخ: {message.date}</p>
                          <p className="text-sm text-gray-600">الوقت: {message.time}</p>
                          <p className="text-sm text-gray-600">عدد الضيوف: {message.guests}</p>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500 mt-4">
                        {new Date(message.date).toLocaleString('ar-SA')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                  الإعدادات
                </h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات المطعم</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          اسم المطعم
                        </label>
                        <input
                          type="text"
                          defaultValue="أوشال"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الهاتف
                        </label>
                        <input
                          type="text"
                          defaultValue="+966 50 123 4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          defaultValue="info@oshal.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          العنوان
                        </label>
                        <input
                          type="text"
                          defaultValue="شارع الملك فهد، الرياض"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ساعات العمل</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          من السبت إلى الأربعاء
                        </label>
                        <input
                          type="text"
                          defaultValue="11:00 ص - 10:00 م"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الخميس والجمعة
                        </label>
                        <input
                          type="text"
                          defaultValue="11:00 ص - 11:00 م"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                      حفظ التغييرات
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Forms */}
      {showAddMeal && (
        <MealForm
          onSave={handleSaveMeal}
          onCancel={handleCancelMeal}
        />
      )}

      {editingMeal && (
        <MealForm
          meal={editingMeal}
          onSave={handleSaveMeal}
          onCancel={handleCancelMeal}
        />
      )}

      {showAddOffer && (
        <OfferForm
          onSave={handleSaveOffer}
          onCancel={handleCancelOffer}
        />
      )}

      {editingOffer && (
        <OfferForm
          offer={editingOffer}
          onSave={handleSaveOffer}
          onCancel={handleCancelOffer}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
