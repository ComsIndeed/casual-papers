import React, { useState } from 'react';
import { Content } from '../classes/Content';

interface WriteFormProps {
  onSubmit: (content: Content) => void;
}

export const WriteForm: React.FC<WriteFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    head: '',
    body: '',
    author: '',
    tags: '',
    imageUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = new Content(
      formData.head,
      formData.body,
      formData.author,
      formData.tags.split(',').map(tag => tag.trim()),
      formData.imageUrl || null
    );
    onSubmit(content);
  };

  return (
    <form onSubmit={handleSubmit} className="write-form">
      <label htmlFor="head">Title:</label>
      <input
        type="text"
        id="head"
        name="head"
        value={formData.head}
        onChange={handleChange}
        required
      />

      <label htmlFor="body">Content:</label>
      <textarea
        id="body"
        name="body"
        rows={4}
        value={formData.body}
        onChange={handleChange}
        required
      />

      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
      />

      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="url"
        id="imageUrl"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
      <p>Your submission will first undergo an approval process before it may be published.</p>
    </form>
  );
};