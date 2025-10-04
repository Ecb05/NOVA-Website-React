import React, { useState } from 'react';
import CountdownSection from '../components/novathon/CountdownSection';
import RegistrationModal from '../components/novathon/RegistrationModal';
import SubmissionModal from '../components/novathon/SubmissionModal';

const Novathon = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);

  return (
    <>
     <br />
      <br />
      <br />
      <CountdownSection 
        onOpenRegistration={() => {
         
          setShowRegistration(true)}}
        onOpenSubmission={() => setShowSubmission(true)}
      />
      <br />
      <br />
      <br />
      <RegistrationModal 
        isOpen={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
        <SubmissionModal 
        isOpen={showSubmission} 
        onClose={() => setShowSubmission(false)} 
      />
      
     
    </>
  );
};

export default Novathon;