// PrisonersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PrisonersPage() {
  const [prisoners, setPrisoners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrisoners = async () => {
      try {
        const response = await axios.get('http://localhost:4000/fetchprisoners');
        setPrisoners(response.data);
      } catch (error) {
        setError('Error fetching prisoners');
      }
    };

    fetchPrisoners();
  }, []);

  return (
    <div>
      <h1>Prisoners Page</h1>
      {error && <div>{error}</div>}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone No</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Age</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gender</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Current Sentence</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Release Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Educational Level</th>
          </tr>
        </thead>
        <tbody>
          {prisoners.map(prisoner => (
            <tr key={prisoner._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prisoner.phone_no}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prisoner.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prisoner.age}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prisoner.gender}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prisoner.current_sentence}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prisoner.release_date}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{prisoner.educational_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrisonersPage;
