import React from 'react';

// Inline styles for the WeatherCard
const styles = {
  weatherCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
    textAlign: 'left',
  },
  title: {
    marginTop: '0',
  },
  paragraph: {
    margin: '10px 0',
  },
};

const WeatherCard = ({ weatherData }) => {
  // Check if it's a forecast or current weather data
  const isCurrentWeather = weatherData.hasOwnProperty('name');
  
  // For current weather, use the city name, for forecast, use the date
  const title = isCurrentWeather
    ? `Weather in ${weatherData.name}`
    : `Forecast for ${new Date(weatherData.dt_txt).toLocaleDateString()}`;
  
  // Extract the necessary data
  const temperature = weatherData.main.temp;
  const humidity = weatherData.main.humidity;
  const condition = weatherData.weather[0].description;

  return (
    <div style={styles.weatherCard}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.paragraph}>Temperature: {temperature}°C</p>
      <p style={styles.paragraph}>Humidity: {humidity}%</p>
      <p style={styles.paragraph}>Condition: {condition}</p>
    </div>
  );
};

export default WeatherCard;
