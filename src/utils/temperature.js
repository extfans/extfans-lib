export function formatTemperature(fDegree, toCDegree, needUnit = false) {
  let temperature;
  let unit;

  if (toCDegree) {
    temperature = Math.round((fDegree - 32) / 1.8);
    unit = '°C';
  } else {
    temperature = fDegree;
    unit = '°F';
  }

  if (needUnit) {
    temperature = temperature + unit;
  }

  return temperature;
}