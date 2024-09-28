import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiRequest from './apiRequest';

const CountryDetail = ({ dark }) => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const data = await apiRequest(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(data[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('An error occurred while fetching data');
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`countrydetail_${dark}`}>
      <button onClick={() => navigate(-1)} className={`back_button_${dark}`}>
        ← Back
      </button>
      <div className='country_detail'>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <div className='country_info'>
          <h2>{country.name.common}</h2>
          <p>
            Native Name:{' '}
            {
              country.name.nativeName?.[Object.keys(country.name.nativeName)[0]]
                .common
            }
          </p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Sub Region: {country.subregion}</p>
          <p>Capital: {country.capital?.[0] || 'N/A'}</p>
          <p>Top Level Domain: {country.tld?.[0]}</p>
          <p>
            Currencies:{' '}
            {Object.values(country.currencies)
              ?.map((currency) => currency.name)
              .join(', ')}
          </p>
          <p>Languages: {Object.values(country.languages)?.join(', ')}</p>
          <p>
            Border Countries:{' '}
            {country.borders?.map((border) => (
              <span key={border}>{border}</span>
            )) || 'None'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
