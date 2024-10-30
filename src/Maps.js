import React, { useState, useEffect, useCallback } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { MapPin, AlertCircle } from 'lucide-react';

const API_KEY = "key"

const defaultLocation = { lat: 22.54992, lng: 0 };

const geoOptions = {
  enableHighAccuracy: true,
  timeout: 20000,        
  maximumAge: 1000      
};

const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [followLocation, setFollowLocation] = useState(true);
  const [mapInstance, setMapInstance] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLocationError = (error) => {
    console.error('Location error:', error);
    let errorMessage = 'Error getting location';
    
    switch(error.code) {
      case error.TIMEOUT:
        errorMessage = 'Location request timed out. Using default location.';
        break;
      case error.PERMISSION_DENIED:
        errorMessage = 'Location permission denied. Please enable location access.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable. Using default location.';
        break;
      default:
        errorMessage = `Location error: ${error.message}`;
    }
    
    setLocationError(errorMessage);
    setIsLoading(false);
    setCurrentLocation(defaultLocation);
  };

  const getLocation = () => {
    setIsLoading(true);
    setLocationError(null);

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        (error) => {
          if (error.code === error.TIMEOUT) {
            console.log('High accuracy timeout, trying with lower accuracy...');
            navigator.geolocation.getCurrentPosition(
              resolve,
              reject,
              { ...geoOptions, enableHighAccuracy: false }
            );
          } else {
            reject(error);
          }
        },
        geoOptions
      );
    });
  };

  const onMapLoad = useCallback((map) => {
    console.log('Map loaded successfully');
    setMapInstance(map);
  }, []);

  useEffect(() => {
    let watchId;

    const startTrackingLocation = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setCurrentLocation(newLocation);
        setLocationError(null);

        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };
            setCurrentLocation(newLocation);
            if (mapInstance && followLocation) {
              mapInstance.panTo(newLocation);
            }
          },
          handleLocationError,
          { ...geoOptions, maximumAge: 2000 } // More lenient for watching
        );
      } catch (error) {
        handleLocationError(error);
      } finally {
        setIsLoading(false);
      }
    };

    startTrackingLocation();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [mapInstance, followLocation]);

  return (
    <div className="relative w-full h-[400px]">
      {locationError && (
        <div className="absolute top-4 left-4 right-4 z-20 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{locationError}</span>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
          <span className="text-gray-600">Loading location...</span>
        </div>
      )}

      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={currentLocation}
          defaultZoom={18}
          gestureHandling={'cooperative'}
          disableDefaultUI={false}
          onLoad={onMapLoad}
          style={{ width: '100%', height: '100%' }}
        >
          <Marker
            position={currentLocation}
            title="Current Location"
          />
        </Map>
      </APIProvider>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => setFollowLocation(!followLocation)}
          className={`p-2 rounded-full ${
            followLocation ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          title={followLocation ? 'Disable location following' : 'Enable location following'}
          disabled={isLoading}
        >
          <MapPin size={24} />
        </button>
      </div>
    </div>
  );
};

export default Maps;