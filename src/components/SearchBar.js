import axios from "axios";
import React, { useCallback, useEffect } from "react";

const SearchBar = ({ setWeather, api }) => {
    // Function to get the weather data from the API. (Take the city name as a parameter.)
    const getWeather = useCallback(
        (query) => {
            axios
                .get(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${api}&contentType=json`
                )
                .then((res) => {
                    setWeather(res.data);
                })
                .catch((err) => {
                    return false;
                });
        },
        [api, setWeather]
    );

    // Get the user's location and get the weather data for that location. (Using the ipify and ipapi APIs.)
    useEffect(() => {
        async function getIP() {
            const res = await fetch("https://api.ipify.org?format=json");
            const data = await res.json();
            return data.ip;
        }
        async function city() {
            const ip = await getIP();
            const res = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await res.json();
            return [data.city, data.region, data.country_name];
        }
        city().then((city) => {
            city.map((c) => {
                try {
                    getWeather(c);
                } catch (err) {
                    return false;
                }
            });
        });
    }, [getWeather]);

    // Function to handle the form submission.
    const onSubmit = async (e) => {
        e.preventDefault();
        if (e.target.query.value === "") return;
        getWeather(e.target.query.value);
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

export default SearchBar;
