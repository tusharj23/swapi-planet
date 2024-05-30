// src/Planet.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Resident from './Resident';
import Film from './Film';

const PLANET_URL = 'https://swapi.dev/api/planets/1/';
const CACHE_KEY = 'planetData';
const CACHE_EXPIRY = 86400000; // 24 hours in milliseconds

const Planet = () => {
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(`${CACHE_KEY}_expiry`);
        const now = new Date().getTime();

        if (cachedData && cachedTime && now < cachedTime) {
          setPlanet(JSON.parse(cachedData));
        } else {
          const response = await axios.get(PLANET_URL);
          setPlanet(response.data);
          localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
          localStorage.setItem(`${CACHE_KEY}_expiry`, now + CACHE_EXPIRY);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!planet) return <p>No data available</p>;

  return (
    <div>
      <h1>{planet.name}</h1>
      <div class = 'planetinfo'>

      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      </div>
      <h2 class = 'planetinfo'>Residents</h2>
      <div className="residents">
        {planet.residents.map((url) => (
          <Resident key={url} url={url} />
        ))}
      </div>
      <h2 class = 'planetinfo'>Films</h2>
      <div className="films">
        {planet.films.map((url) => (
          <Film key={url} url={url} />
        ))}
      </div>
    </div>
  );
};

export default Planet;
