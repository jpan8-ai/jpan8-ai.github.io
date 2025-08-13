import './App.css';
import Axios from 'axios';
import { Nav, Stack, Image } from 'react-bootstrap';
import Circuit from './components/Circuit';
import logo from "./assets/images/logo.png"
import WeatherWidget from './components/SunnyDay';
import { px } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AboutMe from './components/AboutMe';
import { useGeolocated } from 'react-geolocated';
import land from "./assets/images/sunny_no_sun_resized.png";
import { useState } from 'react';

function App() {
  const today = new Date();
  const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const dateStr = `${dayList[today.getDay()]} ${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });
  const [weather, setWeather] = useState({});

  return (
    <div className="App">
      <header className="App-header">
        <Stack>
          <Stack direction="horizontal" style={{justifyContent: "space-between", borderRadius: "5px", 
            height: "100px", backgroundImage: `url(${land})`, paddingLeft: "10px", paddingRight: "10px"}}>
            <div style={{zIndex: "101"}}>
              <Image src={logo} style={{height: "80px"}}/>
            </div>
            <div style={{color: "darkseagreen", fontFamily: "cursive", zIndex: "101"}}>
              <h1>Jie Pan's Website</h1>
            </div>
            <div style={{color: "darkgoldenrod", zIndex: "101", textAlign: "end"}}>
              <div>{dateStr}</div>
              <div>{`${weather?.weather} ${new Number(weather?.temperature).toFixed(2)}°C`}</div>
            </div>
            <WeatherWidget lat={coords?.latitude} long={coords?.longitude} 
              style={{position: "absolute", zIndex: "100", top: "20px", width: "100%", left: "0px", height: "20px"}} 
                setWeatherExt={weather => 
                  setWeather(weather)
              }/>
              {/* {coords?.latitude} {coords?.longitude} - {isGeolocationAvailable ? "True" : "False"} - {isGeolocationEnabled ? "True": "False"} */}
          </Stack>
          <Nav
            activeKey="/"
           >
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='/aboutme'>About Me</Nav.Link>
            </Nav.Item>
          </Nav>
        </Stack>
      </header>
      <main style={{height: "calc(100vh - 220px)", backgroundColor: "beige", borderRadius: "5px", overflowY: "auto", minHeight: "100px"}}>
        <Routes>
          <Route path={""} element={<Home/>}/>
          <Route path={"/aboutme"} element={<AboutMe/>}/>
        </Routes>      
      </main>
      <footer>
        <p>&copy; {today.getFullYear()} Jie Pan's Personal Website</p>
      </footer>
    </div>
  );
}

export default App;
