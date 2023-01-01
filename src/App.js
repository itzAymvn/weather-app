import React, { useState } from "react";

// Components

import LocationBox from "./components/LocationBox";
import SearchBar from "./components/SearchBar";
import WeatherBox from "./components/WeatherBox";

// App()

function App() {
    // The base URL and API key are stored in the .env file.

    const api = {
        key: process.env.REACT_APP_KEY,
        base: process.env.REACT_APP_BASE_URL,
    };

    // State to store the weather data.

    const [weather, setWeather] = useState({});

    // get the main object from the weather object. (weather.main)

    const { main } = weather;

    // Check if the weather object is defined and if the temperature is above 20 degrees. and set the class name accordingly.

    const isWeatherDefined = typeof main !== "undefined";
    const isWarm = main?.temp > 20;
    const className = `app ${isWeatherDefined && isWarm ? "warm" : "cold"}`;

    return (
        <div className={className}>
            <main>
                <SearchBar api={api} setWeather={setWeather} />
                {isWeatherDefined && (
                    <>
                        <LocationBox weather={weather} />
                        <WeatherBox weather={weather} />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
