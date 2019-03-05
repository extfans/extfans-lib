import axios from '@extfans/lib/modules/axios';
import { getLang } from '@extfans/lib/utils/i18n';

import getDayData from './utils/get-day-data';

export async function getWeather(woeid) {
  const result = await axios.get(
    `https://www.yahoo.com/news/_tdnews/api/resource/WeatherService;woeids=%5B${woeid}%5D`
  );

  const { weathers: [originWeather] } = result.data;

  if (!originWeather || !originWeather.location || originWeather.location.woeid !== woeid) {
    throw new Error(404);
  }

  const today = getDayData(originWeather.observation);
  today.currentTemp = originWeather.observation.temperature.now;
  today.wind = originWeather.observation.windSpeed;
  today.humidity = originWeather.observation.humidity;
  today.pressure = originWeather.observation.barometricPressure;

  const days = [];

  for (let i = 1, ii = Math.min(originWeather.forecasts.daily.length, 5); i < ii; i++) {
    days.push(
      getDayData(
        originWeather.forecasts.daily[i]
      )
    );
  }

  return {
    today,
    days
  };
}

export async function getWeatherLocations(keyword) {
  const lang = getLang();

  const result = await axios.get(
    `https://www.yahoo.com/news/_td/api/resource/WeatherSearch;text=${encodeURIComponent(keyword)}?bkt=news-d-147&device=desktop&feature=cacheContentCanvas%2Ccanvass%2Cfeaturebar%2CdeferModalCluster%2CspecRetry&intl=${lang}&lang=${lang}&partner=none&region=US&site=fp&tz=America%2FLos_Angeles&ver=2.0.2213002&returnMeta=true`
  );

  const { data: cities } = result.data;

  return cities
    .map(
      item => {
        return {
          woeid: item.woeid,
          name: item.qualifiedName,
          cityName: item.city,
          countryName: item.country,
          latitude: item.lat,
          longitude: item.lon,
        }
      }
    );
}
