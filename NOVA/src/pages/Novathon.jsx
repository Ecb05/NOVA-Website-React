import React, { useState } from 'react';
import CountdownSection from '../components/novathon/CountdownSection';
import RegistrationModal from '../components/novathon/RegistrationModal';
import SubmissionModal from '../components/novathon/SubmissionModal';
import RulesSection from '../components/sections/RulesSection';
import ProblemStatementsSection from '../components/sections/ProblemStatementsSection';
import VibeathonHeroSection from '../components/sections/VibeathonHeroSection';

const Novathon = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);

  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <VibeathonHeroSection onScrollToSection={scrollToSection} />
      <CountdownSection 
        onOpenRegistration={() => {
         
          setShowRegistration(true)}}
        onOpenSubmission={() => setShowSubmission(true)}
      />
      <RegistrationModal 
        isOpen={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
        <SubmissionModal 
        isOpen={showSubmission} 
        onClose={() => setShowSubmission(false)} 
      />
      
     <RulesSection />
     <ProblemStatementsSection />
    </>
  );
};

export default Novathon;