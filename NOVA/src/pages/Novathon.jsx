import React, { useState } from 'react';
import CountdownSection from '../components/novathon/CountdownSection';
import RegistrationModal from '../components/novathon/RegistrationModal';
import SubmissionModal from '../components/novathon/SubmissionModal';
import RulesSection from '../components/sections/RulesSection';

const Novathon = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);

  return (
    <>
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