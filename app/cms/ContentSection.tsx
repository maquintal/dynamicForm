// ContentSection.tsx
import React, { useState } from 'react';

interface ContentSectionProps {
  type: string;
  onSave: (content: string) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ type, onSave }) => {
  const [content, setContent] = useState<string>('');

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div>
      <h2>{type} Section</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ContentSection;
