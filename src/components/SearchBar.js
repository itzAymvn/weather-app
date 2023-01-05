import axios from "axios";
import React, { useCallback, useEffect } from "react";

const SearchBar = ({ setWeather, api, setIsLoading }) => {
    // Function to get the weather data from the API. (Take the city name as a parameter.)
    const getWeather = useCallback(
        (query) => {
            setWeather({});
            axios
                .get(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${api}&contentType=json`
                )
                .then((res) => {
                    setWeather(res.data);
                    return true;
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    return false;
                });
        },
        [api, setWeather]
    );
    // Get the user's location and get the weather data for that location. (Using the ipify and ipapi APIs.)
    useEffect(() => {
        setIsLoading(true);

        async function getLocationData() {
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                const data = await res.json();
                const ip = data.ip;
                const locationRes = await fetch(`https://ipapi.co/${ip}/json/`);
                const locationData = await locationRes.json();
                return {
                    city: locationData.city,
                    region: locationData.region,
                    country: locationData.country_name,
                };
            } catch (error) {
                throw new Error("Error getting location data.");
            }
        }

        getLocationData()
            .then((data) => {
                if (getWeather(data.city)) return;
                if (getWeather(data.region)) return;
                if (getWeather(data.country)) return;
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setIsLoading(false);
            });
    }, [getWeather, setIsLoading]);

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
