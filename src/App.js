import React, { Component } from "react";
import "./App.css";
import TemperatureViewSelector from "./components/temperatureViewSelector/temperatureViewSelector";
import Header from "./components/common/header";

class App extends Component {
  state = {
    latitude: null,
    longitude: null
  };

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(position =>
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    );
  }

  render() {
    const name = "Weather Channel";
    const { latitude, longitude } = this.state;
    return (
      <div>
        <Header name={name} variant={"h6"} />
        <TemperatureViewSelector latitude={latitude} longitude={longitude} />
      </div>
    );
  }
}

export default App;
