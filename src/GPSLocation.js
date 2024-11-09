// GPSLocation.js
import React, { useState, useEffect } from 'react';

const GPSLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError('Error fetching location');
          console.error(err);
        },
        {
          enableHighAccuracy: true, // High accuracy for better results
          maximumAge: 0, // No cached position
          timeout: 5000, // 5-second timeout
        }
      );

      // Cleanup on component unmount
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h2>Real-Time GPS Location</h2>
      {error ? (
        <p>{error}</p>
      ) : location.latitude && location.longitude ? (
        <p>
          Latitude: {location.latitude.toFixed(6)} <br />
          Longitude: {location.longitude.toFixed(6)}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default GPSLocation;
