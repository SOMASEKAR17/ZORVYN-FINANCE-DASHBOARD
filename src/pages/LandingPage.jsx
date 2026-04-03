import React from 'react';
import Navbar from '../components/common/Navbar.jsx';
import ScrollProgress from '../components/common/ScrollProgress.jsx';
import Hero from '../components/sections/Hero.jsx';
import Footer from '../components/sections/Footer.jsx';

export default function LandingPage({ scrollYProgress }) {
  return (
    <div className="relative w-full">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Footer scrollYProgress={scrollYProgress} />
    </div>
  );
}
