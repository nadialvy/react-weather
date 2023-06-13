import { useState } from 'react';
import data from '../data/cities.json';
import { Link } from 'react-router-dom';

const Home = () => {
  const [region, setRegion] = useState('');
  const [matchCities, setMatchCities] = useState(null);

  const onSearch = (e) => {
    e.preventDefault();

    // set match cities to empty array
    setMatchCities([]);

    data.data.cities.forEach((el) => {
      if(el.name.toLowerCase().includes(region.toLowerCase())){
        setMatchCities((matchCities) => [...matchCities, el]);
      }
    })
  }

  return (
    <div className='mx-32 my-12'>
      <form onSubmit={onSearch} className='mb-6'>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input value={region} onChange={(e) => setRegion(e.target.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none" placeholder="Search Region..." required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>

      {matchCities == null && <div> No data</div>}

      { matchCities != null &&
        matchCities.map((city) => (
          <div key={city.id} className='flex-wrap inline-flex items-center justify-center'>
              <Link to={`/${city.slug}?lat=${city.latitude}&long=${city.longitude}&region=${city.name}`}>
                <div className='items-center justify-around w-40 h-20 rounded-md p-4 bg-blue-100 m-2 hover:bg-blue-200 hover:cursor-pointer'>
                  <p className='text-center'>{city.name}</p>
                </div>
              </Link>
          </div>
        ))
      }

    </div>
   );
}

export default Home;