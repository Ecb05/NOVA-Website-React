import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import VisionSection from '../components/sections/VisionSection';
import MissionSection from '../components/sections/MissionSection';
import TeamSection from '../components/sections/TeamSection';
import TeamScrollSection from '../components/team/TeamScrollSection';
import AboutSection from '../components/sections/AboutSection';

const Home = () => {
  return (
   
    <>
      
      <HeroSection />
      <VisionSection />
      <MissionSection />
      <TeamScrollSection />
      <AboutSection />

    </>
    
  );
};

export default Home;