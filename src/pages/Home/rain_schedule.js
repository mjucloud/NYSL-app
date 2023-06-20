import React, { useState , useEffect } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Geo_API_Options, Geo_API_URL, Weather_API_URL, Weather_API_KEY } from '../data/JSON/weatherAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faRain } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import './rain_schedule.css';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);

  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(`${Geo_API_URL}/cities?namePrefix=${inputValue}&minPopulation=100000&countryIds=US`, Geo_API_Options);
      const response_1 = await response.json();
      const options = response_1.data.map((city) => ({
        value: `${city.latitude},${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`
      }));
  
      const defaultOption = {
        value: '41.8781,-87.6298', // Coordinates for Chicago, US
        label: 'Chicago, US'
      };
  
      return {
        options: [defaultOption, ...options]
      };
    } catch (error) {
      return console.error(error);
    }



  }
  console.log(loadOptions)
  console.log(search)

  return (
    <AsyncPaginate
      debounceTimeout={500}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      className='searchTab'
      placeholder={'Chicago, US'}
    />
  )
}

const CurrentWeather = ({ data }) => {
  return (
    <div>
      <div className='card text-white bg-black mb-3 weatherCard'>
        <p className='card-header'>{data.city}</p>
        <div className='card-body'>
          <div className='d-flex'>
            <p className='card-title mr-2 fw-bold'>{data.weather[0].main}</p>
            <FontAwesomeIcon icon={faSun} className='weatherIcon' />
          </div>

          <div className="WeatherSection">

            <div>
            <p className='d-1 h1 fs-1'>{Math.round(data.main.temp)}°C</p>  
            <p className='p-1 mb-0'>MIN: {Math.round(data.main.temp_min)}°C</p>
            <p className='p-1 mb-0'>MAX: {Math.round(data.main.temp_max)}°C</p>
            </div>
            <div className='detailedInfo' >
              <div className='details'>
                <p className='detailsTitle'> Details </p>
                <p>Feels like:</p>
                <p>Hummidity:</p>
                <p>Wind:</p>
              </div>
              <div className='values'>
                <p>-</p>
                <p>{Math.round(data.main.feels_like)}°C</p>
                <p>{Math.round(data.main.humidity)}%</p>
                <p>{data.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (idx) => {
    setSelectedCard(idx === selectedCard ? null : idx);
  };

  return (
    <div className='weatherContainer'>
      <div>
      {data.list && data.list.slice(0, 6).map((item, idx) => (
          <div key={idx} className='forecast' >
            <div className={`card text-white bg-black mb-3 ${idx === selectedCard ? 'activated' : ''}`} onClick={() => handleCardClick(idx)}>
              <div className="card-body">
                <div className='forecast-content'>
                <h5 className="card-title">{forecastDays[idx]}</h5>
                <p>{item.weather[0].main}</p>
                <p>
                  {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
                </p>
                </div>
                
                <div className='weatherIconForecast'>
                <FontAwesomeIcon icon={faCloudSun} />
                </div> 
                {selectedCard === idx && (
                  <div className={`detailedInfo`}>
                  <div className="details">
                    <p className="detailsTitle">Details</p>
                    <p>Feels like:</p>
                    <p>Humidity:</p>
                    <p>Wind:</p>
                  </div>
                  <div className="values">
                    <p>-</p>
                    <p>{item.main.feels_like}°C</p>
                    <p>{item.main.humidity}%</p>
                    <p>{item.wind.speed} m/s</p>
                  </div>
                </div>
                
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export const RainSchedule = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchData = (searchData) => {
    const [lat, lon] = searchData.value.split(',');
    
    const currentWeatherFetch = fetch(`${Weather_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${Weather_API_KEY}&units=metric`);
    const currentForecastFetch = fetch(`${Weather_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, currentForecastFetch])
      .then(async (responses) => {
        const weatherResponse = await responses[0].json();
        const forecastResponse = await responses[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  const handleOnSearchChange = (searchData) => {
    fetchData(searchData);
  };

  useEffect(() => {
    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    // Fetch weather data for Chicago on component mount
    const defaultSearchData = {
      value: '41.8781,-87.6298',
      label: 'Chicago, US'
    };
    fetchData(defaultSearchData);
  }, []);

  console.log(currentWeather);
  console.log(forecast);

  return (
    <>
      <div>
        <Search onSearchChange={handleOnSearchChange} />
        <div className={`${windowWidth < 768 ? 'weatherDisplay-mobile' : 'weatherDisplay'}`}>
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast}/>}
        </div>
      </div>
    </>
  );
};
