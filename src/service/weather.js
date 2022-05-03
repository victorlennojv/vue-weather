import http from "@/helper/http";

const getWeather = (query) =>
  http.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=3d84546881654ccd7964d20dc7e4a847`
  );

export { getWeather };
