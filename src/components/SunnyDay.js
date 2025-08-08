// SunnyDay.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Image } from "react-bootstrap";
import sun from "../assets/images/sun.png";
import cloud from "../assets/images/cloud.png";
import rain from "../assets/images/rain.png";

const WeatherWidget = ({lat, long, style, setWeatherExt}) => {
  const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL
  });
  const ref = useRef(null);

  const [weather, setWeather] = useState({weather: "sunny", temperature: 0});
  const [currentPosition, setCurrentPosition] = useState(null);
  
  useEffect(() => {
    const currentTime = new Date().getHours();
    let adjustedCurrentTime = 0;
    if(currentTime >= 6 && currentTime <= 18) {
      adjustedCurrentTime = currentTime - 6;
    }
    else if(currentTime > 18) {
      adjustedCurrentTime = 12;
    }
    console.log(adjustedCurrentTime);
    console.log(ref.current.clientWidth);
    setCurrentPosition((adjustedCurrentTime / 12) * ref?.current?.clientWidth);
  });

  useEffect(() => {
    if(lat && long) {
      getPoint(lat, long);
    }
  }, [lat, long]);

  const getPoint = (lat, long) => {
    axiosInstance.get(`https://api.weather.gov/points/${lat},${long}`)
    .then(response => {
      console.log(response.data);
      getWeather(
        response.data?.properties?.gridId,
        response.data?.properties?.gridX,
        response.data?.properties?.gridY
      );
    })
    .catch(err => {
      console.log(err);
    });
  };

  const getWeather = (gridId, gridX, gridY) => {
    axiosInstance.get(`https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}`)
    .then(response => {
      const weather = findClosest(response.data?.properties?.weather?.values);
      const temperature = findClosest(response.data?.properties?.temperature?.values);
      let condition = "sunny";
      const weatherMapper = {slight_chance: 0.25, chance: 0.5}
      let highestChance = 0;
      let highestWeather = "sunny";
      weather.value.forEach(element => {
        console.log(element);
        if(weatherMapper[element?.coverage] > highestChance && element?.weather?.includes("rain") || element?.weather.includes("thunderstorm")) {
          highestWeather = "cloudy";
          if(Math.random() < (weatherMapper[element?.coverage] ?? 0)) {
            highestWeather = element.weather;
            highestChance = weatherMapper[element?.coverage];
          }
        }
      });
      setWeather({weather: highestWeather, temperature: temperature.value});
    })
    .catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    setWeatherExt(weather);
  }, [weather])

  const findClosest = list => {
    let smallestDifference = Number.MAX_SAFE_INTEGER;
    let smallestRecord = list[0];
    list.forEach(element => {
      const valueTimeStr = element.validTime?.substring(0, element.validTime?.indexOf("+"))
      const valueTime = new Date(valueTimeStr);
      let currentTime = new Date();
      currentTime = new Date(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDay(), 
        currentTime.getUTCHours(), currentTime.getUTCMinutes(), currentTime.getUTCSeconds());
      const timeDifference = currentTime.getTime() - valueTime.getTime();
      if(timeDifference < smallestDifference) {
        smallestDifference = timeDifference;
        smallestRecord = element;
      }
    });
    return smallestRecord;
  };

  return (
    <div style={style} ref={ref}>
      {weather?.weather.includes("sun") && <Sun delay={1} duration={2} width={40} height={40} 
        start={currentPosition}/>}
      {(weather?.weather.includes("rain") || weather?.weather?.includes("thunder")) && (
        (new Array(100)).fill(0).map((element, index) => 
          <Rain delay="1" duration="20" height={50} width={50} start={20 + Math.random() * (ref?.current?.clientWidth - 100)} 
            end={ref?.current?.clientWidth}/>
      ))}
      {weather?.weather === "cloudy" && (
        (new Array(100)).fill(0).map((element, index) => 
          <Cloud delay="1" duration="20" height={50} width={50} start={20 + Math.random() * (ref?.current?.clientWidth - 100)} 
            end={ref?.current?.clientWidth}/>
      ))}
    </div>
  );
};

const Cloud = ({ delay, duration, height, width, start, end, animate = false }) => {
  let animation = [];
  for(var i = 0; i < 1; i += 0.1) {
    animation = [...animation, `calc(${i} * ${end - width}px)` ]
  }
  return (
    <motion.div
      className="rounded-full shadow-md"
      style={{width: width + "px", position: "absolute"}}
      initial={{ x: start + "px" }}
      animate={{ x: animate ? animation : [start]}}
      transition={{
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "linear",
      }}
    >
      <Image src={cloud} style={{height: height + "px"}}/>
    </motion.div>
  );
};

const Rain = ({ delay, duration, height, width, start, end, animate = false }) => {
  let animation = [];
  for(var i = 0; i < 1; i += 0.1) {
    animation = [...animation, `calc(${i} * ${end - width}px)` ]
  }
  return (
    <motion.div
      className="absolute rounded-full shadow-md"
      style={{width: width + "px", position: "absolute"}}
      initial={{ x: start + "px" }}
      animate={{ x: animate ? animation : [start]}}
      transition={{
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "linear",
      }}
    >
      <Image src={rain} style={{height: height + "px"}}/>
    </motion.div>
  );
};

const Sun = ({ delay, duration, width = 800, height = 600, start }) => {
  return (
      <motion.div
        className="absolute rounded-full"
        style={{
          width: width + "px"
        }}
        initial={{x: start + "px"}}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          delay: delay,
          duration: duration,
          repeat: Infinity,
        }}
      >
        <Image src={sun} style={{height: height + "px"}}/>
      </motion.div>
  );
};

export default WeatherWidget;
