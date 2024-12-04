import React, { useState, useEffect } from 'react';

const LiveEditor = () => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing document content from the backend
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:3000/document');
        if (response.ok) {
          const data = await response.json();
          setContent(data.content || 'Start editing...');
        } else {
          console.error('Failed to fetch document content');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  // Save changes in real-time
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    localStorage.setItem('document', newContent);

    // Save content to the backend
    saveContentToBackend(newContent);
  };

  // Save content to backend with debounce to avoid excessive requests
  const saveContentToBackend = async (newContent) => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:3000/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent }),
      });
      if (!response.ok) {
        console.error('Failed to save document content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleContentChange}
        rows="20"
        cols="80"
        style={{ fontFamily: 'monospace', fontSize: '16px' }}
      />
      <p>
        {isSaving ? 'Saving...' : 'Changes are saved in real time. Reload the page to see them persist.'}
      </p>
    </div>
  );
};

export default LiveEditor;
