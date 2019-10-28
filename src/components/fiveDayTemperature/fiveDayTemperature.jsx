import React, { Component } from "react";
import Table from "../common/table";
import { getFiveDayTemperature } from "../../services/fiveDayTemperatureService";
import { kelvinToFahrenheitConverter } from "../../utils/kelvinToFahrenheitConverter";
import { formatDateTime } from "../../utils/formatDateTime";
import Header from "../common/header";
import _ from "lodash";

class FiveDayTemperature extends Component {
  state = {
    cityName: "",
    data: [],
    columns: ["Date", "Time", "Temperature °F", "Weather Description", ""]
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.latitude !== this.props.latitude ||
      prevProps.longitude !== this.props.longitude
    ) {
      this.getFiveDayTemperatureAtCurrentLocation();
    }
  }

  getFiveDayTemperatureAtCurrentLocation = async () => {
    try {
      const { city, list } = await getFiveDayTemperature(
        this.props.latitude,
        this.props.longitude
      );
      const { name: cityName } = city;
      let weatherData = {};

      const data = list.map(item => {
        weatherData = {};

        weatherData["date"] = formatDateTime(item.dt_txt, "dddd, MM-DD-YYYY");
        weatherData["time"] = formatDateTime(item.dt_txt, "HH:mm");
        weatherData["temp"] = (
          <b> {kelvinToFahrenheitConverter(item.main.temp)}</b>
        );
        weatherData["description"] = _.upperFirst(item.weather[0].description);
        weatherData["icon"] = (
          <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="weather_icon"
          />
        );
        return weatherData;
      });

      this.setState({ cityName, data });
    } catch (error) {
      alert("Something went wrong..");
    }
  };

  render() {
    return (
      <div className="container">
        <Header name={this.state.cityName} variant={"h6"} />
        <Table data={this.state.data} columns={this.state.columns} />
      </div>
    );
  }
}

export default FiveDayTemperature;
