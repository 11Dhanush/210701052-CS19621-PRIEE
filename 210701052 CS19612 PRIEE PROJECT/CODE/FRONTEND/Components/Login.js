import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [phoneNo, setPhoneNo] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:4000/login', { phone_no: phoneNo });
      const { role } = response.data;

      // Redirect based on the role
      if (role === 'prisoner') {
        window.location.href = '/prisoners'; // Redirect to prisoners page
      } else if (role === 'lawyer') {
        window.location.href = '/lawyers'; // Redirect to lawyers page
      } else if (role === 'clinic') {
        window.location.href = '/clinics'; // Redirect to clinics page
      } else {
        setError('Invalid role received from server');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div>
      <label>
        Phone No:
        <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;
