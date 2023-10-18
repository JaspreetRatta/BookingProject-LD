import React from 'react';
import {useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import Login from '../Login';
import Register from '../Register'
import Map from 'react-map-gl';
import { Marker ,Popup } from 'react-map-gl';
import "./map.css"


function DDRoom() {
  const myStorage = window.localStorage;
  const [currentname , setCurrentname] = useState(myStorage.getItem("user"));
  
  const { user } = useSelector((state) => state.users);

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [userDetails, setUserDetails] = useState({}); // Store user details keyed by user ID
  const [titlee, setTitlee] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setviewport] = useState({
 
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setviewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    console.log(e);  // Log the entire event object
    
    // Check if lngLat is an object and has the expected properties before accessing them
    if (e.lngLat && typeof e.lngLat === 'object' && 'lng' in e.lngLat && 'lat' in e.lngLat) {
      const longitude = e.lngLat.lng;
      const latitude = e.lngLat.lat;
      setNewPlace({
        lat: latitude,
        long: longitude,
      });
    } else {
      console.error("lngLat is not an object or does not have the expected properties", e.lngLat);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
     name : currentname,
      titlee,
      desc,
      rate: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      const res = await axios.post("/api/pins", newPin);
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
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleLogout = () => {
    setCurrentname(null);
    myStorage.removeItem("user");
  };
  return (
    <Map
    user={user}

      mapboxAccessToken="pk.eyJ1IjoidHJpcHB5a3VkaSIsImEiOiJjbG5qOXd4d3MwYXp2MmlwMjk4MmY1ajI5In0.J7BjYa3JSxWF8dXNbzwpTA"
      onViewportChange={(viewport) }
      width="100%"
      height="100%"
      transitionDuration="200"
      initialViewState={{
        longitude: 100.9925,
        latitude: 15.8700,
        zoom: 9
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onviewportChange={(viewport) => setviewport(viewport)}
      onDblClick={currentname && handleAddClick}
    >
       {pins.map((p) => (
        <>
      <Marker
       longitude={p.long} 
       latitude={p.lat}
       offsetLeft={-3.5 * viewport.zoom}
       offsetTop={-7 * viewport.zoom}
       >
        <LocationOnIcon
          style={{ fontSize: '30px',
           color:   currentname === p.name ? "blue" : "slateblue",
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
                <label className="yourLabelClassNamee">Place</label>
                <h4 className="placee">{p.titlee}</h4>
                <label className="yourLabelClassNamee">Review</label>
                <p className="descc">{p.desc}</p>
                <label className="yourLabelClassNamee">Rating</label>
                <div className="stars">
                  {Array(p.rate).fill(<StarIcon className="star" />)}
                </div>
                <label className="yourLabelClassNamee">Information</label>
                <span className="username">
                    Created    <b> </b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
              </div> 
            </Popup>
            
       )}
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
              <LocationOnIcon
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
    <form onSubmit={handleSubmit} className="yourClassNameHere">
      <label>Title</label>
      <input
        placeholder="Enter a title"
        autoFocus
        onChange={(e) => setTitlee(e.target.value)}
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
         {currentname ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentname}
            myStorage={myStorage}
          />
        )}
    </Map>
  );
}

export default DDRoom;