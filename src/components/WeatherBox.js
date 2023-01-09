import React from "react";
import PropTypes from "prop-types";

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

WeatherBox.propTypes = {
    weather: PropTypes.object.isRequired,
};

export default WeatherBox;
