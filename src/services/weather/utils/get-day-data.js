export default function getDayData(day) {
  return {
    weather: day.conditionCode,
    weatherName: day.conditionDescription,
    date: day.observationTime.timestamp,
    lowTemp: day.temperature.low,
    highTemp: day.temperature.high
  };
}