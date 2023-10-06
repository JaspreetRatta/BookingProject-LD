import React from 'react';
import {useState} from 'react';
import { EnvironmentOutlined, StarOutlined, StarTwoTone } from '@ant-design/icons';
import Map from 'react-map-gl';
import { Marker,Popup } from 'react-map-gl';

function DDRoom() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <Map
      mapboxAccessToken=""
      width="100%"
      height="100%"
      transitionDuration="200"

      initialViewState={{
        longitude: 100.9925,
        latitude: 15.8700,
        zoom: 7
      }}
      style={{width: '100vw', height: '100vh'}}
       
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker 
      longitude={ 100.517}
      latitude={13.75}
       anchor="left">
        <EnvironmentOutlined 
        style = {{
          fontSize:visualViewport.zoom*20,
           color:'slateblue'}} />
  
      </Marker>
      {showPopup && (
      <Popup longitude={100.517} latitude={13.75}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        You are here
      </Popup>)}
    
    </Map>
  );
}

export default DDRoom;
