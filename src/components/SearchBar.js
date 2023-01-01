import React, { useEffect, useState } from "react";

const SearchBar = ({ setWeather, api }) => {
    // State to store the query.

    const [query, setQuery] = useState("");

    // Get the current location, and set the weather state. (If the user allows it.)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    // Destructure the latitude and longitude from the position object.

                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
                    );
                    const data = await response.json();
                    setWeather(data);
                },
                (error) => {
                    alert(error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, [api.base, api.key, setWeather]);

    const search = async (e) => {
        if (e.key === "Enter") {
            const response = await fetch(
                `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
            );
            const data = await response.json();
            setWeather(data);
            setQuery("");
        }
    };

    return (
        <div className="search-box">
            <h1 className="search-title">Weather App</h1>
            <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyDown={search}
            />
        </div>
    );
};

export default SearchBar;
