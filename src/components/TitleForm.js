import React, { useState } from 'react';
import './components.scss';

function TitleForm({ addTitle }) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addTitle && subject && description) {
      addTitle({ id: Date.now(), subject, description });
      setSubject('');
      setDescription('');
    } else if (!addTitle) {
      alert('Please connect your MetaMask wallet to add a title.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="basic-field-style"
        type="text"
        placeholder="Title subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        className="basic-field-style"
        placeholder="Title description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className="submit-btn" type="submit" disabled={!addTitle}>Add Title</button>
    </form>
  );
}

export default TitleForm;
