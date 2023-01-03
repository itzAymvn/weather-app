import React, { useState } from "react";

// Components

import LocationBox from "./components/LocationBox";
import SearchBar from "./components/SearchBar";
import WeatherBox from "./components/WeatherBox";

// App()

function App() {
    // Function to check if an object is empty.
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const api = process.env.REACT_APP_API;
    // State to store the weather data.

    const [weather, setWeather] = useState({});

    // get the main object from the weather object. (weather.main)

    return (
        <div>
            <main
                className={
                    "app " +
                    (!isEmpty(weather)
                        ? weather.currentConditions.temp > 16
                            ? "warm"
                            : "cold"
                        : "")
                }>
                <SearchBar api={api} setWeather={setWeather} />
                {
                    // If the weather object is not empty, render the LocationBox and WeatherBox components.
                    !isEmpty(weather) && (
                        <>
                            <LocationBox weather={weather} />
                            <WeatherBox weather={weather} />
                        </>
                    )
                }
            </main>
        </div>
    );
}

export default App;
