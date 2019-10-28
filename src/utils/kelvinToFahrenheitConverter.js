export const kelvinToFahrenheitConverter = kelvinTemperature => {
  return Math.round((kelvinTemperature - 273.15) * (9 / 5) + 32);
};
