import React from "react";

const WeatherBox = ({ weather }) => {
    // Deconstruct the weather object to get the main object and the weather object.

    const { main } = weather;
    const { temp } = main;

    // Rename the weather.weather[0].main property to weatherDescription.
    const { main: weatherDescription } = weather.weather[0];

    return (
        <div className="weather-box">
            <div className="temp">
                {
                    // Round the temperature to the nearest whole number.
                    Math.round(temp)
                }
                °c
            </div>
            <div className="weather">{weatherDescription}</div>
        </div>
    );
};

export default WeatherBox;
