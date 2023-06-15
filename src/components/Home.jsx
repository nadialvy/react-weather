import { useState,useEffect } from 'react';
import data from '../data/cities.json';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchCities, setMatchCities] = useState([]);
  const [error, setError] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  }

  useEffect(() => {
    const fetchCities = () => {
      try{
        setMatchCities([]);
        const filteredCities = data.data.cities.filter((el) =>
          el.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if(!filteredCities) return;

        // count total pages
        const total = Math.ceil(filteredCities.length/citiesPerPage);
        setTotalPages(total);

        // get data that suitable with current page
        const indexOfLastItem = currentPage * citiesPerPage;
        const indexOfFirstItem = indexOfLastItem - citiesPerPage;
        const currentItems = filteredCities.slice(indexOfFirstItem, indexOfLastItem);

        // set match cities
        setMatchCities(currentItems);
      } catch(err){
        setError(err);
      }
    }

    fetchCities();
  }, [searchQuery, currentPage, citiesPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className='mx-8 my-8 md:mx-32 lg:mx-40 xl:mx-72 2xl:mx-[30rem]'>
      <div className='text-center text-3xl font-semibold mb-4'>Weather App</div>
      <div className='flex justify-center'>
        <div className="relative mb-4 w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input value={searchQuery} onChange={handleInputChange} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none" placeholder="Search city..." required />
            <button type="submit" className="absolute right-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-gray-900">Search</button>
        </div>
      </div>

      {error && <div className='text-center mt-10 font-semibold text-red-500 text-xl'>Error: {error.message}</div>}

      {
        searchQuery != '' && matchCities.length == 0
          ? <div className='text-center mt-10 font-semibold text-red-500 text-xl'>No data</div>
          : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
              {matchCities.map((city) => (
                <div key={city.id} className='w-full'>
                  <Link to={`/${city.slug}?lat=${city.latitude}&long=${city.longitude}&region=${city.name}`}>
                    <div className='rounded-md p-4 bg-blue-100 hover:bg-blue-200 hover:cursor-pointer'>
                      <p className='text-center'>{city.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
      }

      {/* pagination nav */}
      <div className='flex justify-between items-center mt-4 lg:mt-8 2xl:mt-10 lg:mx-24'>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='disabled:bg-opacity-50 bg-slate-300 px-4 py-2 md:px-6 lg:px-8 rounded-lg disabled:cursor-not-allowed'>
          &lt; Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='disabled:bg-opacity-50 bg-slate-300 px-4 py-2 md:px-6 lg:px-8 rounded-lg disabled:cursor-not-allowed'>
          Next &gt;
        </button>
      </div>
    </div>
   );
}

export default Home;