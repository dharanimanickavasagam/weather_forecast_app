import React, { Component } from "react";
import { getCurrentTemperature } from "../../services/currentTemperatureService";
import { kelvinToFahrenheitConverter } from "../../utils/kelvinToFahrenheitConverter";
import { formatDateTime } from "../../utils/formatDateTime";
import Table from "../common/table";
import Header from "../common/header";
import _ from "lodash";
import "./currentTemperature.css";

class CurrentTemperature extends Component {
  state = {
    cityName: "",
    main: {},
    columns: ["Pressure (hpa)", "Humidity %", "Min °F", "Max °F"],
    weatherDetails: "",
    isLoading: true,
    dateTime: this.getCurrentDateAndTime()
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.latitude !== this.props.latitude ||
      prevProps.longitude !== this.props.longitude
    ) {
      this.getCurrentTemperatureAtCurrentLocation();
    }
  }

  getCurrentDateAndTime() {
    return formatDateTime(Date.now(), "dddd, MM-DD-YYYY HH:mm");
  }

  getCurrentTemperatureAtCurrentLocation = async () => {
    try {
      const { name: cityName, main, weather } = await getCurrentTemperature(
        this.props.latitude,
        this.props.longitude
      );
      const weatherDetails = weather[0];
      this.setState({ cityName, main, weatherDetails, isLoading: false });
    } catch (error) {
      alert("Something went wrong..");
    }
  };

  getWeatherDetails = weather => {
    const weatherTableDetails = [_.omit(weather, ["temp"])];
    weatherTableDetails[0]["temp_min"] = kelvinToFahrenheitConverter(
      weatherTableDetails[0].temp_min
    );
    weatherTableDetails[0]["temp_max"] = kelvinToFahrenheitConverter(
      weatherTableDetails[0].temp_max
    );
    return weatherTableDetails;
  };

  render() {
    const { cityName, main, weatherDetails, isLoading, dateTime } = this.state;
    const weatherTableDetails = this.getWeatherDetails(main);

    return (
      <main className="container">
        {!isLoading ? (
          <>
            <Header name={cityName} variant={"h6"} />
            <div className="flexContainer">
              <div className="flexContainer__weatherIcon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`}
                  alt="weather_icon"
                />
              </div>

              <div className="flexContainer__weather">
                {kelvinToFahrenheitConverter(main.temp)}°F
              </div>
            </div>

            <div className="weatherDetails">
              {_.upperFirst(weatherDetails.description)}
            </div>

            <div className="dateTime">{dateTime}</div>

            <Table data={weatherTableDetails} columns={this.state.columns} />
          </>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </main>
    );
  }
}

export default CurrentTemperature;
