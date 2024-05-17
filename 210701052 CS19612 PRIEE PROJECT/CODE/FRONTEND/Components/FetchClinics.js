// ClinicsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClinicsPage() {
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('http://localhost:4000/fetchclinics');
        setClinics(response.data);
      } catch (error) {
        setError('Error fetching clinics');
      }
    };

    fetchClinics();
  }, []);

  return (
    <div>
      <h1>Clinics Page</h1>
      {error && <div>{error}</div>}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone No</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Products</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map(clinic => (
            <tr key={clinic._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{clinic.phone_no}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{clinic.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{clinic.email_id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{clinic.location}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{clinic.products.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClinicsPage;
