import React, { useState } from 'react';
import axios from 'axios';

function KeywordExtractor() {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleExtraction = async () => {
    try {
      const response = await axios.post('http://localhost:5000/extract_keyphrases', { text });
      setKeywords(response.data.keyphrases);
    } catch (error) {
      console.error('Error extracting keywords:', error);
    }
  };

  return (
    <div>
      <h2>Keyword Extraction</h2>
      <textarea
        placeholder="Enter text here..."
        value={text}
        onChange={handleTextChange}
        rows={6}
        cols={50}
      />
      <br />
      <button onClick={handleExtraction}>Extract Keywords</button>
      <br />
      <h3>Extracted Keywords:</h3>
      <ul>
        {keywords.map((keyword, index) => (
          <li key={index}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordExtractor;
