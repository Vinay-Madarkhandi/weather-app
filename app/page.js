"use client";
import React, { useState } from "react";
import axios from "axios";
import Myqr from "./components/Myqr";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [clickedQr, setClickedQr] = useState(false);

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiKey = "ab7a7e5c9e1719f229ae2f96f586f08d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("error");
      setWeatherData(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Weather App</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80 text-black mb-8"
      >
        <label htmlFor="cityName" className="block text-lg font-medium mb-2">
          Enter city name:
        </label>
        <input
          type="text"
          id="cityName"
          value={cityName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Weather
        </button>
      </form>
      {errorMessage && (
        <div className="bg-white p-6 rounded-xl shadow-2xl w-80 text-black">
          <p className=" text-red-500">{errorMessage}</p>
          <p>Aache se naam daalo </p>
          <p>Ya phir local place ka naam maat daal 😂</p>
          <p>
            agar local place ka weather chiaye to paisa do 😗🥺 taki mai data le
            pau{" "}
          </p>
          {!clickedQr ? (
            <button onClick={() => setClickedQr(!clickedQr)}>
              CLICK FOR QR
            </button>
          ) : null}
          {clickedQr ? <Myqr /> : null}
        </div>
      )}
      {weatherData && (
        <div className="bg-white p-6 rounded-xl shadow-2xl w-80 text-black">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold">{weatherData.name}</h2>
            <span className="text-4xl font-bold">
              {Math.round(weatherData.main.temp - 273.15)}°
            </span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-20 h-20"
            />
          </div>
          <p className="text-lg text-center mb-4">
            {weatherData.weather[0].description}
          </p>
          <div className="flex justify-between text-md">
            <div>
              <p>
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
              </p>
            </div>
            <div className="text-right">
              <p>
                <strong>High:</strong>{" "}
                {Math.round(weatherData.main.temp_max - 273.15)}°C
              </p>
              <p>
                <strong>Low:</strong>{" "}
                {Math.round(weatherData.main.temp_min - 273.15)}°C
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
