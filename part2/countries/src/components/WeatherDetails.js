import { useState, useEffect } from "react";

import weatherService from "../services/weatherService";

const WatherDetails = ({ country }) => {
  const [weather, setWeather] = useState({
    temperature: 0,
    wind: 0,
    icon: "10d",
  });

  const { latitude, longitude } = country;

  useEffect(() => {
    weatherService
      .getWeather(latitude, longitude)
      .then((weather) => setWeather(weather));
  }, []);

  return (
    <div>
      <h2>Weather in {country.name}</h2>
      <p>temperature {weather.temperature.toFixed(2)} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default WatherDetails;
