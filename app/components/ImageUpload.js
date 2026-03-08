'use client';

import { useState } from 'react';

export default function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        setPreview(reader.result);
        onImageSelect(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange}
        style={{ marginBottom: '10px' }}
      />
      {preview && (
        <div>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ maxWidth: '300px', maxHeight: '300px' }} 
          />
        </div>
      )}
    </div>
  );
}
