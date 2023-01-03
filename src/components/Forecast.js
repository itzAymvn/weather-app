import React from "react";
import { dateBuilder } from "./LocationBox";

const Forecast = ({ weather }) => {
    return (
        <div className="forecast">
            {weather.days.map((day, i) =>
                i > 0 ? (
                    <div className="day" key={i}>
                        <div className="daytime">
                            {dateBuilder(new Date(day.datetime))}
                        </div>
                        <div className="tempicon">
                            <img
                                src={require(`../assets/weather-icons/${day.icon}.png`)}
                                alt="weather icon"
                            />
                        </div>
                        <div className="temp">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Max:</td>
                                        <td>{Math.round(day.tempmax)}°c</td>
                                    </tr>
                                    <tr>
                                        <td>Avg:</td>
                                        <td>{Math.round(day.temp)}°c</td>
                                    </tr>
                                    <tr>
                                        <td>Min:</td>
                                        <td>{Math.round(day.tempmin)}°c</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
};

export default Forecast;
