import React from "react";

const WeatherBox = ({ weather }) => {
    return (
        <div className="weather-box">
            <div className="temp">
                {Math.round(weather.currentConditions.temp)}
                °c
            </div>
            <div className="weather">{weather.description}</div>
        </div>
    );
};

export default WeatherBox;
