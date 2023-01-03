import React, { useEffect, useState } from "react";

const SearchBar = ({ setWeather, api }) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        async function getLocation() {
            const response = await fetch("https://api.ipify.org?format=json");
            const user = await response.json();
            const ip = user.ip;
            const res = await fetch(`https://ipapi.co/${ip}/json`);
            const location = await res.json();
            const weather = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city}?unitGroup=metric&key=${api}&contentType=json`
            );
            const data = await weather.json();
            setWeather(data);
        }
        getLocation();
    }, [api, setWeather]);

    const search = async (e) => {
        if (e.key === "Enter") {
            try {
                const response = await fetch(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${api}&contentType=json`
                );
                const data = await response.json();
                setWeather(data);
                setQuery("");
            } catch (error) {
                if (error) {
                    alert(query + " is not a valid location");
                } else {
                    alert("Something went wrong");
                }
            }
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
