'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'القائمة', href: '#menu' },
    { name: 'العروض', href: '#offers' },
    { name: 'من نحن', href: '#about' },
    { name: 'اتصل بنا', href: '#contact' },
    { name: 'لوحة التحكم', href: '/admin/login' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-2">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-8 mb-2 md:mb-0">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">شارع الملك فهد، الرياض</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">السبت-الخميس: 11:00 ص - 11:00 م</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className={`text-4xl font-bold ${
                isScrolled ? 'text-red-600' : 'text-white'
              }`} style={{fontFamily: 'Almarai, Changa, sans-serif'}}>
                       أوسال
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-20">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-bold text-lg transition-all duration-300 hover:scale-105 px-3 py-2 ${
                      isScrolled 
                        ? 'text-gray-800 hover:text-red-600' 
                        : 'text-white hover:text-red-200'
                    }`}
                    style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`font-bold text-lg transition-all duration-300 hover:scale-105 px-3 py-2 ${
                      isScrolled 
                        ? 'text-gray-800 hover:text-red-600' 
                        : 'text-white hover:text-red-200'
                    }`}
                    style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}
                  >
                    {item.name}
                  </a>
                )
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                isScrolled
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl'
                  : 'bg-white text-red-600 hover:bg-red-50 border-2 border-red-600 hover:border-red-700 shadow-md hover:shadow-lg'
              }`} style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                📞 احجز طاولة
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-xl border-t border-gray-100">
            <div className="container mx-auto px-6 py-6">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-800 hover:text-red-600 font-semibold text-lg py-3 px-4 rounded-lg hover:bg-red-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-800 hover:text-red-600 font-semibold text-lg py-3 px-4 rounded-lg hover:bg-red-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )
                ))}
                <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-bold mt-6 shadow-lg hover:shadow-xl transition-all duration-300 text-lg" style={{fontFamily: 'IBM Plex Sans Arabic, Cairo, sans-serif'}}>
                  📞 احجز طاولة
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

