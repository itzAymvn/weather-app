import axios from "axios";
import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ setWeather, api, setIsLoading, setError }) => {
    // Function to get the weather data from the API. (Take the city name as a parameter.)
    const getWeather = useCallback(
        (queryArray, i) => {
            setWeather({});
            async function getWeatherData() {
                for (let i = 0; i < queryArray.length; i++) {
                    const query = queryArray[i];
                    try {
                        const res = await axios.get(
                            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${api}&contentType=json`
                        );
                        if (res.data.status === "error") {
                            console.log("No results found." + res.data.message);
                        } else {
                            setWeather(res.data);
                            break;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            getWeatherData();
        },
        [api, setWeather]
    );
    useEffect(() => {
        setIsLoading(true);
        if (navigator.geolocation) {
            const success = async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const res = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
                    );
                    const data = await res.json();
                    getWeather([data.city, data.principalSubdivision]);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            const error = (err) => {
                console.warn(` WARNING: ${err.message}`);
                setError(
                    "We need your location permission to show the weather automatically. Please allow location access to use this app. Or you can search for a city manually."
                );
                setIsLoading(false);
            };
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            setError("Your browser does not support geolocation.");
            setIsLoading(false);
        }
    }, [getWeather, setIsLoading, setError]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (e.target.query.value === "") return;
        getWeather([e.target.query.value]);
    };

    return (
        <div className="search-box">
            <h1 className="search-title">Weather App</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search..."
                    name="query"
                />
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    setWeather: PropTypes.func.isRequired,
    api: PropTypes.string.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
};

export default SearchBar;
