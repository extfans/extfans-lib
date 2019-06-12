import axios from '@extfans/lib/modules/axios';

export async function getCurrentLocation() {
  const { data: htmlDom } = await axios.get(
    'https://ipstack.com',
    {
      responseType: 'document'
    }
  );

  let input = htmlDom.querySelector('input[name="client_ip"]') || htmlDom.querySelector('input[name="iptocheck"]')

  const ip = input.value;

  const { data } = await axios.get(
    `http://ip-api.com/json/${ip}`
  );

  if (data.region_name === null) {
    throw new Error('not found');
  }

  return {
    ip: data.ip,
    latitude: data.lat,
    longitude: data.lon,
    cityName: data.city,
    countryName: data.country,
    continentName: data.regionName
  };
}
