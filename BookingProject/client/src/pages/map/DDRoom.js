import React from 'react';
import {useState,useEffect} from 'react';
import axios from "axios";
import 'mapbox-gl/dist/mapbox-gl.css'

import { format } from "timeago.js";
import { EnvironmentOutlined, StarOutlined} from '@ant-design/icons';
import Map from 'react-map-gl';
import { Marker,Popup } from 'react-map-gl';





function DDRoom() {
  const myStorage = window.localStorage;
  const [currentname] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 15.8700,
    longitude: 100.9925,
    zoom: 7,
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      name: currentname,
      title,
      desc,
      rate: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  
 useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/api/pins");
        console.log("Pins Data:", allPins.data); // Log data here
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
}, []);


  return (
    <Map
  
      mapboxAccessToken="pk.eyJ1IjoidHJpcHB5a3VkaSIsImEiOiJjbG45MTJ1ZzEwMm41Mm1zZXFuZHJya25nIn0.PpLulG4hOrr86gECxzH7Pg"
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
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={currentname && handleAddClick}
    >
       {pins.map((p) => (
            <>
     <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
        <EnvironmentOutlined 
        style={{
          fontSize: 7 * viewport.zoom,
           color:
           currentname === p.name ? "tomato" : "slateblue",
           cursor: "pointer",
         }}
         onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
       />
     </Marker>
    
     {p._id === currentPlaceId && (
    
      <Popup 
      key={p._id}
      latitude={p.lat}
      longitude={p.long}
       closeButton={true}
       closeOnClick={false}
       onClose={() => setCurrentPlaceId(null)}
        anchor="left"
       
        >
        <div className="cardd">
       
                     <labell>Place</labell>
                  <h4 className="placee">{p.titlee}</h4>
                  <labell>Review</labell>
                  <p className="descc">{p.desc}</p>
                  <labell>Rating</labell>
                  <div className="stars">
                    {Array(p.rate).fill(<StarOutlined className="star" />)}
                  </div>
                  <labell>Information</labell>
                  <span className="username">
                    Created by <b>{p.name}</b>
                  </span>
                  <span className="datee">{format(p.createdAt)}</span>
                </div>
      </Popup>)}
      </>
       ))}
{newPlace && (
          <>
            <Marker
              latitude={newPlace.lat}
              longitude={newPlace.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <EnvironmentOutlined
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
              </Popup>
          </>
            )}
    </Map>
    
  );
}

export default DDRoom;
