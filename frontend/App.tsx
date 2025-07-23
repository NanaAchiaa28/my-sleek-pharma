import axios from 'axios';
import { useEffect, useState } from 'react';

// Add this inside your component:
const [pharmacies, setPharmacies] = useState([]);

useEffect(() => {
  axios.get('http://10.0.2.2:5000/api/pharmacies')  // For Android emulator
    .then(res => setPharmacies(res.data))
    .catch(err => console.error(err));
}, []);