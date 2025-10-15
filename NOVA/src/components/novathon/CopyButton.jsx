import React, { useState } from 'react';

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button className="copy-team-id" onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy Code'}
    </button>
  );
};

export default CopyButton;
