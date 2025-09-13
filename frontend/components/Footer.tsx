'use client';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'من نحن', href: '#about' },
      { name: 'قصتنا', href: '#about' },
      { name: 'الوظائف', href: '#' },
      { name: 'الأخبار', href: '#' },
    ],
    menu: [
      { name: 'المقبلات', href: '#menu' },
      { name: 'الأطباق الرئيسية', href: '#menu' },
      { name: 'الحلويات', href: '#menu' },
      { name: 'المشروبات', href: '#menu' },
    ],
    support: [
      { name: 'اتصل بنا', href: '#contact' },
      { name: 'الأسئلة الشائعة', href: '#' },
      { name: 'الحجوزات', href: '#contact' },
      { name: 'الملاحظات', href: '#contact' },
    ],
    legal: [
      { name: 'سياسة الخصوصية', href: '#' },
      { name: 'شروط الخدمة', href: '#' },
      { name: 'سياسة ملفات تعريف الارتباط', href: '#' },
      { name: 'إمكانية الوصول', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/mamanoura' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/mamanoura' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/mamanoura' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-4xl font-bold mb-6" style={{fontFamily: 'Almarai, Changa, sans-serif'}}>أوسال</h3>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
              استمتع بتجربة طعام أصيلة مع قائمتنا المتنوعة من الأطباق الشهية والمكونات الطازجة. 
              نفتخر بتقديم خدمة استثنائية وتجارب طعام لا تُنسى.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">شارع الملك فهد، الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">info@mamanoura.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">السبت-الخميس: 11:00 ص - 11:00 م</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الشركة</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">القائمة</h4>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الدعم</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">ابق على اطلاع</h4>
            <p className="text-gray-300 mb-6">
              اشترك في نشرتنا الإخبارية للحصول على أحدث العروض وتحديثات القائمة.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="btn-primary whitespace-nowrap">
                اشترك
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} مطعم ماما نورا. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

