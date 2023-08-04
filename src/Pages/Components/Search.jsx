
import {useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import debounce from 'lodash/debounce';
import weather from '../../assets/images/weather.jpg';


let result = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Search = () => {
    const [query, setQuery] = useState('');
  
   const [data1, setData1] = useState([]);
   

   

   const fetchData = debounce(async (searchQuery) => {
    try {
      if (typeof searchQuery !== 'string') {
        console.error('Search query should be a string.');
        return;
      }
  
      const response1 = await axios.get(`http://localhost:9000/geoAPI`, {
        params: { city: searchQuery },
      });
    
      const response = await axios.get(`http://localhost:9000/weatherAPI`, {
        params: { lat: response1.data[0]['lat'],lon:response1.data[0]['lon'] },
      });

      const currencyCode = await axios.get(`https://currencies-and-countries.p.rapidapi.com/getCountryInfo`, {
        params: { param:'ISO', value:response1.data[0]['country']},
        headers: {
            'X-RapidAPI-Key': '25074cb821mshe7a7d75984194fbp1c9f4fjsn54a91d51c3c0',
            'X-RapidAPI-Host': 'currencies-and-countries.p.rapidapi.com'
          }
      });

      if (typeof currencyCode.data['currency'] !== 'string') {
        console.error('currency query should be a string.');
        return;
      }
      const currencyRate = await axios.get(`http://localhost:9000/currencyAPI`, {
        params: { currency:currencyCode.data['currency']},
        
      });

      const population = await axios.get('http://localhost:9000/populationAPI', {
        params: {
          country:response1.data[0]['country'],
         
        }
      });


      console.log(population.data);
      
      result = [
                {
                name:response1.data[0]['name'],    
                temp_max: response.data['main']['temp_max'],
                temp_min: response.data['main']['temp_min'],
                descript: response.data['weather'][0]['description'],
                icon:response.data['weather'][0]['icon'],
                USD:currencyRate.data['rates']['USD'],
                EUR:currencyRate.data['rates']['EUR'],
                ZAR:currencyRate.data['rates']['ZAR']
                
                }
             ];

      setData1(response1.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 300);
   

  useEffect(() => {
   
    fetchData();
  }, []);

  
  
    
  
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2 justify-center transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
          <Combobox >
            {({ activeOption }) => (
              <>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-red-600"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search destination..."
                    onChange={(event) => {
                        fetchData(event.target.value);
                        
                      }}
                  />
                </div>
  
                {(query === '' || result.length > 0) && (
                  <Combobox.Options as="div" static hold className="flex divide-x divide-gray-100">
                    {result.length > 0 && (
                      <div
                        className={classNames(
                          'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                          activeOption && 'sm:h-96'
                        )}
                      >
                        {query === '' && (
                          <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500"></h2>
                        )}
                        <div className="-mx-2 text-sm text-gray-700">
                          {result.map((data) => (
                            <Combobox.Option
                              as="div"
                              key={data?.name}
                              value={data}
                              className={({ active }) =>
                                classNames('flex cursor-default select-none items-center rounded-md p-2', active && 'bg-gray-100 text-gray-900')
                              }
                            >
                              {({ active }) => (
                                <>
                                  
                                  <span className="ml-3 flex-auto truncate">{data.name}</span>
                                  {active && (
                                    <ChevronRightIcon className="ml-3 h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </div>
                      </div>
                    )}
  
                    {activeOption && (
                      <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                        <div className="flex-none p-6 text-center">
                          <img src={weather} alt="" className="mx-auto h-16 w-16 rounded-full" />
                          <h2 className="mt-3 font-semibold text-gray-900">{activeOption.name}</h2>
                          <p className="text-sm leading-6 text-gray-500">weather forecast</p>
                          <div className="flex justify-center items-center">
                            <p className="text-xs leading-6 text-gray-500">{activeOption.temp_max}ºC max</p>
                            <p className="text-xs leading-6 text-gray-500 mx-2">{activeOption.temp_min}ºC min</p>
                            <p className="text-xs leading-6 text-gray-500">{activeOption.descript}</p>
                           </div>
                        </div>
                        <div className="flex flex-auto flex-col justify-between p-6">
                          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                          <p className="mt-3 font-semibold text-gray-900">Rate</p>
                          <div className="flex justify-center items-center">
                            <p className="text-xs leading-6 text-gray-500">USD: {activeOption?.USD}</p>
                            <p className="text-xs leading-6 text-gray-500 mx-2">EUR: {activeOption?.EUR}</p>
                            <p className="text-xs leading-6 text-gray-500">ZAR: {activeOption?.ZAR}</p>
                           </div>
                         
                            <dd></dd>
                            <dt className="col-end-1 font-semibold text-gray-900">GDP</dt>
                            <dd className="truncate">
                              <a href="" className="text-indigo-600 underline">
                                
                              </a>
                            </dd>
                            <dt className="col-end-1 font-semibold text-gray-900">Population</dt>
                            <dd className="truncate">
                              <a href="" className="text-indigo-600 underline">
                                
                              </a>
                            </dd>
                          </dl>
                    
                        </div>
                      </div>
                    )}
                  </Combobox.Options>
                )}
  
                {query !== '' && result.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-gray-900">No destination found</p>
                    <p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </div>
      </div>
    );
  };
  
  export default Search;
  