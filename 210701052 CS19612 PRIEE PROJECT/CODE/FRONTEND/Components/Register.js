import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [phoneNo, setPhoneNo] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [currentSentence, setCurrentSentence] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [educationalLevel, setEducationalLevel] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleSaveData = async () => {
    setError(null);
    try {
      if (role === 'prisoner') {
        await axios.post('http://localhost:4000/prisoners', {
          phone_no: phoneNo,
          name: name,
          age: age,
          gender: gender,
          current_sentence: currentSentence,
          release_date: releaseDate,
          educational_level: educationalLevel
        });
      } else if (role === 'clinic') {
        await axios.post('http://localhost:4000/clinics', {
          phone_no: phoneNo,
          name: name,
          email_id: email,
          location: location,
          products: products
        });
      }else if (role === 'lawyer') {
        await axios.post('http://localhost:4000/lawyers', {
            phone_no: phoneNo,
            name: name,
            age: age,
            gender: gender,
            specialization: specialization,
            email_id: email
        });
      } else {
        setError('Please select a valid role');
      }
    } catch (error) {
      setError('Error saving data');
    }
  };

  const handleAddProduct = () => {
    setProducts([...products, '']);
  };

  const handleProductChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index] = value;
    setProducts(updatedProducts);
  };

  return (
    <div>
      <label>
        Phone No:
        <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
      </label>
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="prisoner">Prisoner</option>
          <option value="clinic">Clinic</option>
          <option value="lawyer">Lawyer</option>
        </select>
      </label>
      {role === 'prisoner' && (
        <>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Age:
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <label>
            Gender:
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
          </label>
          <label>
            Current Sentence:
            <input type="text" value={currentSentence} onChange={(e) => setCurrentSentence(e.target.value)} />
          </label>
          <label>
            Release Date:
            <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
          </label>
          <label>
            Educational Level:
            <input type="text" value={educationalLevel} onChange={(e) => setEducationalLevel(e.target.value)} />
          </label>
        </>
      )}
      {role === 'clinic' && (
        <>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Location:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <label>
            Products:
            {products.map((product, index) => (
              <div key={index}>
                <input type="text" value={product} onChange={(e) => handleProductChange(index, e.target.value)} />
              </div>
            ))}
            <button onClick={handleAddProduct}>Add Product</button>
          </label>
        </>
      )}
        {role === 'lawyer' && (
        <>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Age:
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <label>
            Gender:
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
          </label>
          <label>
            Specialization:
            <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </>
      )}
      <button onClick={handleSaveData}>Save Data</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
