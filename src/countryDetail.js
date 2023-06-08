import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import React, { useEffect, useState } from 'react';

const CountryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, ispending} = useFetch('http://localhost:3001/countries/');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (data) {
      setCountries(data);
    }
  }, [data]);

  const country = countries.find(country => country.alpha3Code === id);

// get back to MainPage
  const handleGoBack = () => {
    navigate(-1);
  };


//   adjusting the border where country render first 
  let borderCountries = [];
  
  if (country) {
    borderCountries = country.borders.map((borderCode) => {
      const borderCountry = countries.find((country) => country.alpha3Code === borderCode);
      return borderCountry.name;
    });
  }

return (
    <div className="min-h-screen p-4 pt-10 md:px-10 dark:bg-dark-veryDarkBlue  bg-light-veryLightGray text-dark-text">
        <div className="p-1 px-4 mb-10 w-fit shadow-lg text-sm dark:bg-dark-blue dark:text-light-white rounded-sm flex items-center gap-3" onClick={handleGoBack}> 
        <svg className=' dark:fill-light-white' height="1em" viewBox="0 0 512 512"><path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/></svg>
        <p>Back</p></div>
        { ispending && <div> Loading ... </div> }
        { error && <div> {error} </div> }
        {/* render the country informaation */}
        {country && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <img src={country.flags.png} className="w-full" alt="" />
        <div className="p-1 lg:p-5 lg:ml-10 md:ml-5 mr-0 pr-0">
            <h1 className="dark:text-white font-bold text-xl pb-5">{country.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-light-veryLightGray ">
                <div className="text-dark-text dark:text-light-white font-semibold">
                    <p className="py-1">
                    Native Name: <span className="dark:text-light-gray text-light-gray ">{country.nativeName}</span>
                    </p>
                    <p className="py-1">
                    Population: <span className="dark:text-light-gray text-light-gray ">{country.population}</span>
                    </p>
                    <p className="py-1">
                    Region: <span className="dark:text-light-gray text-light-gray ">{country.region}</span>
                    </p>
                    <p className="py-1">
                    Sub Region: <span className="dark:text-light-gray text-light-gray ">{country.subregion}</span>
                    </p>
                    <p className="py-1">
                    Capital: <span className="dark:text-light-gray text-light-gray ">{country.capital}</span>
                    </p>
                </div>
                <div className="text-dark-text font-semibold dark:text-light-white ">
                    <p className="py-1">
                    Top Level Domain: <span className="dark:text-light-gray text-light-gray ">{country.topLevelDomain}</span>
                    </p>
                    <p className="py-1">
                    Currencies: <span className="dark:text-light-gray text-light-gray ">{country.currencies[0].name}</span>
                    </p>
                    <p className="py-1">
                    languages: <span className="dark:text-light-gray text-light-gray ">{country.languages[0].name}</span>
                    </p>
                </div>
            </div>
            <div className="flex items-center flex-wrap mt-10 font-semibold dark:text-light-white ">
                Border Countries: {borderCountries.map(borders => 
                <p className="p-1 px-2 w-fit shadow-lg text-xs dark:bg-dark-blue dark:text-light-white text-light-gray rounded-sm m-1">{borders}</p>
                    )}
            </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
