import React from "react";
import CurrentTemperature from "../currentTemperature/currentTemperature";
import FiveDayTemperature from "../fiveDayTemperature/fiveDayTemperature";
import TabSelector from "../common/tabSelector";
import "./temperatureViewSelector.css";

const TemperatureViewSelector = props => {
  const { latitude, longitude } = props;

  const tabData = [
    {
      label: "Current Temperature",
      component: (
        <CurrentTemperature latitude={latitude} longitude={longitude} />
      )
    },
    {
      label: "5 Day Forecast",
      component: (
        <FiveDayTemperature latitude={latitude} longitude={longitude} />
      )
    }
  ];

  return (
    <div className="tab">
      <TabSelector tabData={tabData} />
    </div>
  );
};

export default TemperatureViewSelector;
