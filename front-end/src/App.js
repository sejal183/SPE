import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [keyphrases, setKeyphrases] = useState([]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/extract_keyphrases', { text });
      setKeyphrases(response.data.keyphrases);
    } catch (error) {
      console.error('Error extracting keyphrases:', error);
    }
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2.5em', backgroundColor: '#f4f4f4', color: '#333', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    <h1 style={{ marginBottom: '20px', fontSize: '3em' }}>Keyphrase Extraction</h1>
    <textarea
      placeholder="Enter text here..."
      value={text}
      onChange={handleTextChange}
      rows={6}
      cols={50}
      style={{ padding: '15px', marginBottom: '20px', width: '80%', fontSize: 'inherit', borderRadius: '5px', border: '2px solid #ccc', backgroundColor: '#fff', color: '#333' }}
    />
    <button
      onClick={handleSubmit}
      style={{ padding: '15px 30px', fontSize: 'inherit', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease-in-out' }}
    >
      Extract Keyphrases
    </button>
    <br />
<h2 style={{ marginTop: '10px', marginBottom: '10px', fontSize: '2.0em' }}>Keyphrases:</h2>
<ul>
  {keyphrases.map((keyphrase, index) => (
    <li key={index} style={{ marginBottom: '5px' }}>{keyphrase}</li>
  ))}
</ul>
  </div>
  );
}

export default App;

