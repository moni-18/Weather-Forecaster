import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css';  // Import the CSS file

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const apiKey = 'dff7ee4b7e2851b5df22a45fda9ce1ab'; // OpenWeatherMap API key
      
      // Fetch current weather data
      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(currentWeatherResponse.data);

      // Fetch 5-day weather forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError('City not found or something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather();
    } else {
      setError('Please enter a city.');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display current weather data */}
      {weatherData && <WeatherCard weatherData={weatherData} />}

      {/* Display 5-day forecast data */}
      {forecastData && (
        <div className="forecast">
          {forecastData.list
            .filter((_, index) => index % 8 === 0) // Filter data to show 1 forecast per day
            .map((forecast, index) => (
              <WeatherCard key={index} weatherData={forecast} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
