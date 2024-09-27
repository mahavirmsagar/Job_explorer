import React, { useState } from "react";
import "./Weather.css";
import Axios from "axios";

function Weather() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await Axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "fffe6890c2b24c69b33125035242108",
            q: city,
          },
        }
      );
      console.log(response.data);
      setWeather(response.data);
    } catch (error) {
      setError("City Not Found, Please Enter a Correct City Name!!!");
    }
    setLoading(false)
  };

  return (
    <div className="weather-container">
      <h1>Weather Application</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Your City"
          value={city}
          onChange={changeHandler}
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <span className="loading">Loading.........</span>}
      {error && <span className="error">{error}</span>}
      
      {weather && (
        <div className="weather-details">
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>Temperature: {weather.current.temp_c} °C</p>
          <p>Weather: {weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
