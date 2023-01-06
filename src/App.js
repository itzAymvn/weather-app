import React, { useEffect, useState } from "react";

// Components

import LocationBox from "./components/LocationBox";
import SearchBar from "./components/SearchBar";
import WeatherBox from "./components/WeatherBox";
import Forecast from "./components/Forecast";
import Swal from "sweetalert2";

// App()

function App() {
    // Function to check if an object is empty.
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const api = process.env.REACT_APP_API;
    // State to store the weather data.

    const [weather, setWeather] = useState({});
    const [seeForecast, setSeeForecast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // get the main object from the weather object. (weather.main)
    useEffect(() => {
        if (error) Swal.fire("No Permissions", error, "error");
        return () => {
            setError("");
        };
    }, [error]);

    return (
        <div>
            <div
                className={
                    "app " +
                    (!isEmpty(weather)
                        ? weather.currentConditions.temp > 20
                            ? "warm"
                            : "cold"
                        : "")
                }></div>
            <main className="content">
                <SearchBar
                    api={api}
                    setWeather={setWeather}
                    setError={setError}
                    setIsLoading={setIsLoading}
                />
                {
                    // If the weather object is not empty, render the LocationBox and WeatherBox components.
                    !isEmpty(weather) && (
                        <>
                            <LocationBox weather={weather} />
                            <WeatherBox weather={weather} />
                            <button
                                className="forecast-button"
                                onClick={() => setSeeForecast(!seeForecast)}>
                                {seeForecast ? "Hide" : "See"} Forecast
                                {seeForecast ? <> &#8679;</> : <> &#8681;</>}
                            </button>
                            {seeForecast && <Forecast days={weather.days} />}
                        </>
                    )
                }{" "}
                {isLoading && (
                    <div className="loading">
                        <div className="lds-facebook">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
