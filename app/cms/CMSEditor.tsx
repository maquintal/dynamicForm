// CMSEditor.tsx
import React, { useState } from 'react';
import Dropdown from './Dropdown';
import ContentSection from './ContentSection';

const CMSEditor: React.FC = () => {
  const [contentTypes, setContentTypes] = useState<string[]>(['Paragraph', 'Heading']);
  const [sections, setSections] = useState<any[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const handleAddSection = (type: string) => {
    setSections([...sections, { type, content: '' }]);
  };

  const handleSaveSection = (index: number, content: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode);
  };

  const handleSaveToFile = () => {
    const combinedContent = sections.map((section) => `<${section.type}>${section.content}</${section.type}>`).join('\n');
    
    // Save to a file (you may need additional logic based on your environment)
    const blob = new Blob([combinedContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output.html';
    link.click();
  };

  return (
    <div>
      <h1>CMS Editor</h1>
      <Dropdown options={contentTypes} onSelect={handleAddSection} />
      {sections.map((section, index) => (
        <ContentSection
          key={index}
          type={section.type}
          onSave={(content: string) => handleSaveSection(index, content)}
        />
      ))}
      <div>
        <button onClick={handlePreviewToggle}>{previewMode ? 'Edit' : 'Preview'}</button>
        <button onClick={handleSaveToFile}>Save to File</button>
      </div>
      <div>
        <h2>Preview</h2>
        {sections.map((section, index) => (
          <div key={index}>
            {previewMode ? (
              <div>
                <h2>{section.type} Section</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            ) : (
              <textarea value={section.content} readOnly />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSEditor;
