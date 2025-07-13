import React, { useState } from 'react';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    setWeather(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.message || 'City not found');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
