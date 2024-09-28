import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiRequest from './apiRequest';

const MainSection = ({ dark }) => {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    setLoading(true);
    let url =
      region === 'all'
        ? 'https://restcountries.com/v3.1/all'
        : `https://restcountries.com/v3.1/region/${region}`;

    try {
      const data = await apiRequest(url);
      setCountries(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [region]);

  return (
    <div className={`mainsection_${dark}`}>
      <div className='filter_container'>
        <button
          onClick={() => setRegion('all')}
          className={`filter_button_${dark}`}
        >
          All
        </button>
        <button
          onClick={() => setRegion('africa')}
          className={`filter_button_${dark}`}
        >
          Africa
        </button>
        <button
          onClick={() => setRegion('americas')}
          className={`filter_button_${dark}`}
        >
          America
        </button>
        <button
          onClick={() => setRegion('asia')}
          className={`filter_button_${dark}`}
        >
          Asia
        </button>
        <button
          onClick={() => setRegion('europe')}
          className={`filter_button_${dark}`}
        >
          Europe
        </button>
        <button
          onClick={() => setRegion('oceania')}
          className={`filter_button_${dark}`}
        >
          Oceania
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='country_grid'>
          {countries.map((country) => (
            <Link
              to={`/country/${country.name.common}`}
              key={country.cca3}
              className={`country_card_${dark}`}
            >
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
              />
              <h3>{country.name.common}</h3>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital?.[0] || 'N/A'}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSection;
