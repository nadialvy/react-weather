import { useState } from 'react';
import data from '../data/cities.json';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchCities, setMatchCities] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    event.preventDefault();
    setMatchCities([]);

    data.data.cities.forEach((el) => {
      if(el.name.toLowerCase().includes(searchQuery.toLowerCase())){
        setMatchCities((matchCities) => [...matchCities, el]);
      }
    })
  }

  return (
    <div className='mx-24 my-12 md:mx-32 lg:mx-40 xl:mx-72 2xl:mx-[30rem]'>
      <div className='text-center text-4xl font-semibold mb-4'>Weather App</div>
      <div className='flex justify-center'>
        <div className="relative mb-4 w-full lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input value={searchQuery} onChange={handleInputChange} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none" placeholder="Search city..." required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>

      {
        searchQuery == '' && matchCities.length == 0
        ? <div></div>
        : searchQuery != '' && matchCities.length == 0
          ? <div className='text-center mt-10 font-semibold text-red-500 text-xl'>No data</div>
          : <div className='flex flex-wrap items-center justify-center'>
              {matchCities.map((city) => (
                <div  key={city.id} className='w-full md:w-1/3 lg:w-1/4 mb-2 mx-4 md:mb-4'>
                  <Link to={`/${city.slug}?lat=${city.latitude}&long=${city.longitude}&region=${city.name}`}>
                    <div className='rounded-md p-4 bg-blue-100 hover:bg-blue-200 hover:cursor-pointer'>
                      <p className='text-center'>{city.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
      }

    </div>

   );
}

export default Home;