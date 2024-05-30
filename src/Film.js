// src/Film.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Film = ({ url }) => {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(url);
        setFilm(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [url]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading film</p>;

  return (
    <div className="card">
      <h2>{film.title}</h2>
      <p>Episode: {film.episode_id}</p>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Release Date: {film.release_date}</p>
    </div>
  );
};

export default Film;
