import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import TrackOverlay from "./Indianapolis_Oval.png";

const API_KEY = process.env.REACT_APP_API_KEY;
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

  const mapStyles = [
    //removes labels from map
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "550px",
        minWidth: "270px",
        position: "relative",
        marginTop: "-20px", // Moves the widget UP
        marginLeft: "140px", // Moves the widget RIGHT
        transform: "rotate(270deg)",
        transformOrigin: "50% 50%",
        overflow: "hidden",
        boxSizing: "border-box",
        paddingBottom: "50px",
      }}
    >
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: "100%", height: "80vh" }}
          center={{ lat: 39.795, lng: -86.235 }}
          zoom={15.2}
          // mapTypeId="satellite"
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          options={{
            styles: mapStyles,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            setTimeout(() => {
              map.setHeading(90);
            }, 1000);
          }}
        >
          {currentLocation && (
            <Marker position={currentLocation} title="Current Location" />
          )}
        </Map>
      </APIProvider>

      <img
        src={TrackOverlay}
        alt="Track Overlay"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -47%)",
          height: "auto",
          maxWidth: "260px",
          opacity: 0.7,
          pointerEvents: "none",
          paddingBottom: "50px",
        }}
      />
    </div>
  );
};

export default Maps;
