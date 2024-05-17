// LawyersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

function LawyersPage() {
  const [lawyers, setLawyers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/fetchlawyers');
        setLawyers(response.data);
      } catch (error) {
        setError('Error fetching lawyers');
      }
    };

    fetchLawyers();
  },
   []);

   useEffect(()=>{
    console.log('hello');
    console.log(user);
    if (user) {
      console.log('Prisoner ID:', user.prisonerId);

    }
   },[user])

  const handleBook = async (lawyerId) => {
    try {
      // Implement the book function here
      // Make a POST request to book the lawyer
      await axios.post('http://localhost:4000/book-lawyer', { lawyerId });
      // Assuming the booking is successful, you can add further handling if needed
      console.log('Lawyer booked successfully');
    } catch (error) {
      console.error('Error booking lawyer:', error);
      // Handle the error here
    }
  };

  return (
    <div>
      <h1>Lawyers Page</h1>
      {error && <div>{error}</div>}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Age</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gender</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Specialization</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th> {/* New column for book button */}
          </tr>
        </thead>
        <tbody>
          {lawyers.map(lawyer => (
            <tr key={lawyer._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lawyer.phone_no}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lawyer.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lawyer.age}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lawyer.gender}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lawyer.specialization}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{lawyer.email_id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleBook(lawyer._id)}>Book</button>
              </td> {/* Button to book the lawyer */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LawyersPage;
