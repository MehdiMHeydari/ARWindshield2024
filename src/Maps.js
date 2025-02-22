import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import TrackOverlay from "./Indianapolis_Oval.png";

const API_KEY = "AIzaSyAUh-VvgcKpdw4HhafonT_u2Yz1JWybA5Q";

const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    let watchId;

    const startTrackingLocation = () => {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    startTrackingLocation();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          center={{ lat: 39.798, lng: -86.235 }}
          zoom={15}
          mapTypeId="satellite"
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          onLoad={(map) => {
            setTimeout(() => {
              map.setHeading(90);
            }, 1000);
          }}
        >
          {currentLocation && <Marker position={currentLocation} title="Current Location" />}
        </Map>
      </APIProvider>

      <img
        src={TrackOverlay}
        alt="Track Overlay"
        style={{
          position: "absolute",
          top: "50%", // Center vertically
          left: "50%", // Center horizontally
          transform: "translate(-50%, -30%)", // Ensures exact centering
          width: "80%", // Adjust size if needed
          maxWidth: "200px", // Prevents oversized images
          opacity: 0.7, // Adjust transparency
          pointerEvents: "none",  
        }}
      />
    </div>
  );
};

export default Maps;