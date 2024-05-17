const dotenv=require('dotenv')
const express = require('express');
const app = express();
const Prisoner = require('./model/prisonerSchema');
const Lawyer = require('./model/lawyerSchema');
const Clinic = require('./model/clinicSchema');
const cors = require('cors');



dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json());
app.use(cors());

app.post('/prisoners', async (req, res) => {
  const { phone_no, name, age, gender, current_sentence, release_date, educational_level } = req.body;

  if (!phone_no || !name || !age || !gender || !current_sentence || !release_date || !educational_level) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {

    const prisonerExists = await Prisoner.exists({ phone_no });
    const lawyerExists = await Lawyer.exists({ phone_no });
    const clinicExists = await Clinic.exists({ phone_no });

    if (prisonerExists || lawyerExists || clinicExists) {
      return res.status(400).json({ error: 'Phone number already exists' });
    }

      const prisoner = new Prisoner({
          phone_no,
          name,
          age,
          gender,
          current_sentence,
          release_date,
          educational_level
      });
      await prisoner.save();
      return res.status(201).json(prisoner);
  } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/lawyers', async (req, res) => {
  const { phone_no, name, age, gender, specialization, email_id } = req.body;
  console.log(phone_no, name, age, gender, specialization, email_id);

  if (!phone_no || !name || !age || !gender || !specialization || !email_id) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {

    const prisonerExists = await Prisoner.exists({ phone_no });
    const lawyerExists = await Lawyer.exists({ phone_no });
    const clinicExists = await Clinic.exists({ phone_no });

    if (prisonerExists || lawyerExists || clinicExists) {
      return res.status(400).json({ error: 'Phone number already exists' });
    }

      const lawyer = new Lawyer({
          phone_no,
          name,
          age,
          gender,
          specialization,
          email_id
      });
      await lawyer.save();
      console.log(lawyer);
      return res.status(201).json(lawyer);
     
  } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/clinics', async (req, res) => {
  const { phone_no, name, email_id, location, products } = req.body;

  if (!phone_no || !name || !email_id || !location || !products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'phone_no, name, email_id, location, and products as array are required' });
  }

  try {

    const prisonerExists = await Prisoner.exists({ phone_no });
    const lawyerExists = await Lawyer.exists({ phone_no });
    const clinicExists = await Clinic.exists({ phone_no });

    if (prisonerExists || lawyerExists || clinicExists) {
      console.log("phone number already exists");
      return res.status(400).json({ error: 'Phone number already exists' });
    }

      const clinic = new Clinic({
          phone_no,
          name,
          email_id,
          location,
          products
      });
      await clinic.save();
      return res.status(201).json(clinic);
  } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { phone_no } = req.body;

  if (!phone_no) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    // Check if the phone number exists in any schema
    const prisonerExists = await Prisoner.exists({ phone_no });
    const lawyerExists = await Lawyer.exists({ phone_no });
    const clinicExists = await Clinic.exists({ phone_no });

    if (prisonerExists) {
      // Phone number exists in prisoner schema
      return res.status(200).json({ role: 'prisoner' });
    } else if (lawyerExists) {
      // Phone number exists in lawyer schema
      return res.status(200).json({ role: 'lawyer' });
    } else if (clinicExists) {
      // Phone number exists in clinic schema
      return res.status(200).json({ role: 'clinic' });
    } else {
      // Phone number does not exist in any schema
      return res.status(404).json({ error: 'Phone number not found' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/fetchlawyers', async (req, res) => {
  try {
    const lawyers = await Lawyer.find();
    res.status(200).json(lawyers);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({ error: 'Error fetching lawyers' });
  }
});

app.get('/fetchclinics', async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.status(200).json(clinics);
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ error: 'Error fetching clinics' });
  }
});

app.get('/fetchprisoners', async (req, res) => {
  try {
    const prisoners = await Prisoner.find();
    console.log(prisoners);
    res.status(200).json(prisoners);
  } catch (error) {
    console.error('Error fetching prisoners:', error);
    res.status(500).json({ error: 'Error fetching prisoners' });
  }
});


const PORT = 4000;
app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
});
