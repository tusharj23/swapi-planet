// src/Resident.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resident = ({ url }) => {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const response = await axios.get(url);
        setResident(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResident();
  }, [url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading resident</p>;

  return (
    <div className="card">
      <h2>{resident.name}</h2>
      <p>Height: {resident.height}</p>
      <p>Mass: {resident.mass}</p>
      <p>Hair Color: {resident.hair_color}</p>
      <p>Skin Color: {resident.skin_color}</p>
      <p>Eye Color: {resident.eye_color}</p>
      <p>Birth Year: {resident.birth_year}</p>
      <p>Gender: {resident.gender}</p>
    </div>
  );
};

export default Resident;
