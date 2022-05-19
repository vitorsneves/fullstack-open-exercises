import axios from "axios";

const url = "http://api.openweathermap.org";
const api_key = process.env.REACT_APP_API_KEY;

const getWeather = async (latitude, longitude) => {
  const response = await axios({
    method: "get",
    url: `${url}/data/2.5/weather`,
    params: {
      lat: latitude,
      lon: longitude,
      appid: api_key,
    },
  });

  const data = response.data;

  return {
    temperature: data.main.temp - 273,
    wind: data.wind.speed,
    icon: data.weather[0].icon,
  };
};

export default { getWeather };
