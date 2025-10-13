import React, { useState } from 'react';
import CountdownSection from '../components/novathon/CountdownSection';
import RegistrationModal from '../components/novathon/RegistrationModal';
import SubmissionModal from '../components/novathon/SubmissionModal';
import RulesSection from '../components/sections/RulesSection';
import VibeathonHeroSection from '../components/sections/VibeathonHeroSection';

const Novathon = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);

  return (
    <>
      <VibeathonHeroSection />
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
    </>
  );
};

export default Novathon;