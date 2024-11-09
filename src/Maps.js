import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const API_KEY = 'AIzaSyAZwL-gpNn6QlYacmpT1oiLwoJy5t5r4aE';

const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    let watchId;

    const startTrackingLocation = () => {
      if (navigator.geolocation) {
        // Start watching the user's position in real-time
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          {
            enableHighAccuracy: true, // Use high accuracy for better precision
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // Start tracking on component mount
    startTrackingLocation();

    // Cleanup watchPosition when the component is unmounted
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ flex: '1', height: '400px' }}
        center={currentLocation || { lat: 22.54992, lng: 0 }} // Default map center if location not available
        zoom={18} // Set default zoom level, but this can be changed by the user
        gestureHandling={'greedy'} // Allow users to zoom and pan freely
        disableDefaultUI={false} // Enable default UI so the user can zoom using the controls
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            title="Current Location"
          />
        )}
      </Map>
    </APIProvider>
  );
};

export default Maps;