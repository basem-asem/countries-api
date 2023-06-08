import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';

const CountriesPage = ({searchValue = '', region = ''}) => {
  const { data, ispending, error } = useFetch('http://localhost:3001/countries');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data]);

  // filter countries by region
  const filter = countries ? countries.filter((country) => country.region === region) : [];

  const showData = filter.length === 0 ? countries : filter;

  // search countries
  const search = countries.filter((country) =>
    country.name.toLowerCase().includes(Object.values(searchValue).join('').toLowerCase())
  );
  const renderData = searchValue ? search : showData;

  return (
    <div className="py-4 dark:bg-dark-veryDarkBlue  bg-light-veryLightGray text-light-gray">
      <div className="rounded-sm grid grid-cols-1 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {renderData.map((country) => (
          <div className="w-full sm:w-fit" key={country.alpha3Code}>
            <Link to={`/countries/${country.alpha3Code}`} key={country.alpha3Code}>
              <img src={country.flags.png} className="h-48 w-full sm:w-fit" alt="" />
              <div className="dark:bg-dark-blue  p-4 bg-light-white">
                <h1 className="font-bold dark:text-light-veryLightGray">{country.name}</h1>
                <div className="py-3 text-sm dark:text-light-veryLightGray">
                  <p>
                    Population: <span className="dark:text-light-gray">{country.population}</span>
                  </p>
                  <p>
                    Region: <span className="dark:text-light-gray">{country.region}</span>
                  </p>
                  <p>
                    Capital: <span className="dark:text-light-gray">{country.capital}</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesPage;
