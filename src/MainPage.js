import React, { useEffect, useState} from 'react';
import Countries from './Countries';

const MainPage = () => {
    // const [list, setList] = useState(false);

    const [countries, setCountries] = useState([]);
    const [region, setRegion] = useState();
    const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:3001/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchCountries();
  }, []);
  
  const unique = Array.from(new Set (countries.map(country => (country.region) )));

  // const showList = () => {
  //   setList(!list);
  // }
  return (
        <div className=' p-4 md:px-10 dark:bg-dark-veryDarkBlue dark:text-light-white bg-light-veryLightGray text-light-gray min-h-screen overflow-y-hidden'>
          <div className="flex justify-between my-4">
            <div className="search flex items-center relative">
            <svg className='absolute pl-4 dark:fill-light-white' height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            {/* searchbar  */}
              <input type="search" className='p-2 pl-12  shadow-md md:w-[400px] dark:bg-dark-blue dark:text-light-white rounded-sm' placeholder='Search for a country..' onChange={(e) => setSearchValue(e.target.value)}/>
            </div>
            {/* region filter */}
            <select onChange={(e) => setRegion(e.target.value)} className='bg-light-white shadow-md dark:bg-dark-blue dark:text-light-white rounded-sm cursor-pointer p-2 px-4' name="Filter by Region" >
              <option className='mt-1 pl-6 pr-14 py-2 rounded-sm' >Filter by Region</option>
              {unique.map(region => (
                <option value={region}>{region}</option>
                
              ))}
            </select>
          </div>
          {/* rendering the countries  */}
            <Countries region={region} searchValue={searchValue}/>
        </div>
    );
}

export default MainPage;