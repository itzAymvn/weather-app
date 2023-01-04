import React from "react";

// Function that renders the test in the format: Sunday 1 January 2023.
export const dateBuilder = (d) => {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Get the day, date, month and year from the date object.
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    // Return the date in the string format.
    return `${day} ${date} ${month} ${year}`;
};

const LocationBox = ({ weather }) => {
    // Deconstruct the weather object to get the name and sys object.
    const currentDate = dateBuilder(new Date());

    return (
        <div className="location-box">
            <div className="location">
                <h3>{weather.address}</h3>
                <h5>{weather.resolvedAddress}</h5>
            </div>
            <div className="date">{currentDate}</div>
        </div>
    );
};

export default LocationBox;
