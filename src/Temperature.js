import React, { useState, useEffect } from 'react';
import sun from './weather_icons/sun.svg';
import {ReactComponent as Sun} from './weather_icons/sun.svg';
import {ReactComponent as Cloudy} from './weather_icons/cloud-sun.svg';
import {ReactComponent as Rain} from './weather_icons/cloud-showers-heavy.svg';
import {ReactComponent as HeavyRain} from './weather_icons/cloud-showers-water.svg';
import {ReactComponent as Drizzle} from './weather_icons/cloud-drizzle.svg';
import {ReactComponent as Snow} from './weather_icons/snowflake.svg';
import {ReactComponent as Thunder} from './weather_icons/thunderstorm.svg';
import {ReactComponent as Fog} from './weather_icons/fog.svg';
import {ReactComponent as Hail} from './weather_icons/cloud-hail-mixed.svg';

const TemperatureWidget = () => {
  const [temperature, setTemperature] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch temperature data
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = {latitude: 39.794869, longitude: -86.234521};//position.coords

          const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&current_weather=true&temperature_unit=fahrenheit`;

          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              if (data.current_weather && data.current_weather.temperature !== undefined) {
                setTemperature(data.current_weather.temperature);
                
              } else {
                setError('Unable to fetch temperature data');
              }
              
              //if (data.current && data.current_weather.weather_code !== undefined) {
                setWeatherCode(data.daily.weather_code[4]);
              //}

            })
            .catch(() => setError('Failed to fetch data from the weather API'));
        },
        () => setError('Location access denied by the user')
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

  const WeatherIcon = () => {
    const commonProps = { x: 75, y: 50, width: 50, height: 50, fill: "white",};

    switch (weatherCode){ // https://open-meteo.com/en/docs
      case 0:
        return <Sun {...commonProps}/> // Clear Sky
      case 1:
      case 2:
      case 3:
        return <Cloudy {...commonProps} /> // Partly Cloudy
      case 45:
      case 48:
        return <Fog {...commonProps} /> // Fog
      case 51:
      case 53:
      case 55:
        return <Drizzle {...commonProps} /> // Light Rain
      case 56:
      case 57:
        return <Hail {...commonProps} /> // Freezing Drizzle
      case 61:
      case 63:
      case 65:
        return <Rain {...commonProps} /> // Rain
      case 71:
      case 73:
      case 75:
        return <Snow {...commonProps}  /> // Snow
      case 77:
        return <Snow {...commonProps}  /> // Snow Grains
      case 80:
      case 81:
      case 82:
        return <HeavyRain {...commonProps} /> // Rain Showers
      case 85:
      case 86:
        return <Snow {...commonProps}  /> // Snow Heavy
      case 95:
      case 96:
      case 99:
        return <Thunder {...commonProps} /> // Thunderstorm
      default:
        return "Err"
    }
  }

  const test = () => {
    return <p>wow</p>
  }

  return (
    <div className="temperature-visualization">
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          {/* Current Time Display */}
          <h2 style={{ color: 'white', marginBottom: '20px' }}>{currentTime}</h2>
          
          {/* Temperature Visualization */}
          {temperature !== null ? (
            <svg width="200" height="200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="lightblue"
                strokeWidth="15"
              />
              <text
                x="100"
                y="135"
                fontSize="1.7rem"
                textAnchor="middle"
                fill="white"
              >
                {`${temperature}°F`}
              </text>
              <text
                x="100"
                y="110"
                fontSize="2rem"
                textAnchor="middle"
                fill="white"
              >
                {test()}
              </text>
              <image src={sun} alt="Sun" />
              <WeatherIcon />
            </svg>
          ) : (
            <p style={{ color: 'white' }}>Loading temperature...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TemperatureWidget;
