import React, { useState, useEffect } from 'react';

const TemperatureWidget = () => {
  const [temperature, setTemperature] = useState(null);
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
          const { latitude, longitude } = position.coords;

          const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`;

          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              if (data.current_weather && data.current_weather.temperature !== undefined) {
                setTemperature(data.current_weather.temperature);
              } else {
                setError('Unable to fetch temperature data');
              }
            })
            .catch(() => setError('Failed to fetch data from the weather API'));
        },
        () => setError('Location access denied by the user')
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

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
                y="110"
                fontSize="2rem"
                textAnchor="middle"
                fill="white"
              >
                {`${temperature}°F`}
              </text>
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
