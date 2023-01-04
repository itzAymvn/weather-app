import React from "react";
import { dateBuilder } from "./LocationBox";

const Forecast = ({ days }) => {
    return (
        <div className="forecast">
            {days.map((day, i) =>
                i > 0 ? (
                    <div className="day" key={i}>
                        <div className="daytime">
                            {dateBuilder(new Date(day.datetime))}
                        </div>
                        <div className="tempicon">
                            <img
                                src={require(`../assets/weather-icons/${day.icon}.png`)}
                                alt="weather-icon"
                            />
                        </div>
                        <div className="temp">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>max:</td>
                                        <td>{Math.round(day.tempmax)}°c</td>
                                    </tr>
                                    <tr>
                                        <td>temp:</td>
                                        <td>{Math.round(day.temp)}°c</td>
                                    </tr>
                                    <tr>
                                        <td>min:</td>
                                        <td>{Math.round(day.tempmin)}°c</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="weather">
                            <h3>{day.conditions}</h3>
                            <p>{day.description}</p>
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
};

export default Forecast;
