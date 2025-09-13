'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import SpecialOffers from '@/components/SpecialOffers';
import FeaturedMeals from '@/components/FeaturedMeals';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SpecialOffers />
      <FeaturedMeals />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

