import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import debounce from 'lodash/debounce';
import background from '../../assets/images/background.jpg';
import Search from '../../Pages/Components/Search';

const LandingPage = () => {
  const [searchInput, setSearchInput] = useState('');
  
  // Function to handle the search input changes
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    // Call the API with the debounced function
    debouncedSearch(event.target.value);
  };


  const debouncedSearch = debounce((query) => {
    // fetch('/api/search?query=' + query)
    //        .then((response) => response.json())
    //        .then((data) => updateSearchResults(data));
    // console.log('Perform API call with query:', query);
  }, 300); 

  return (
    <div className='w-full h-screen relative'>
      
      <img className='w-full h-full object-cover' src={background}/>

      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>
        <Search/>
        {/* <div className='flex justify-between items-center max-w-[700px] mx-auto w-full border p-1 rounded-md text-black bg-gray-100/90'>
          <div>
            <input
              className='bg-transparent w-[300px] sm:w-[400px] font-[Poppins] focus:outline-none'
              type='text'
              placeholder='Search Destinations'
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          
          <div>
          
            <button>
              <AiOutlineSearch size={20} className='icon' style={{ color: '#ffffff' }} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
