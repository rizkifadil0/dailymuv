const getWeather = async () => {
  const city = "Bekasi";
  try {
    const responseCity = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
    );

    const geoRes = await responseCity.json();

    if (!geoRes.results || geoRes.results.length === 0) {
      throw "City not found";
    }

    const { longitude, latitude } = geoRes.results[0];
    const namedCityRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
      { headers: { "User-Agent": "MyWeatherApp/1.0 (rftv07@gmail.com)" } },
    );
    if (!namedCityRes.ok) {
      throw "API City dalam Maintenence";
    }
    const namedCityData = await namedCityRes.json();
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,uv_index,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`;
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) {
      throw "API is not working";
    }
    const weatherData = await weatherRes.json();
    const currtemperature = weatherData.current.temperature_2m;
    console.log(
      // namedCityData.address.city,
      // namedCityData.address.country,
      // namedCityData.address.state,
      // weatherData.current.relative_humidity_2m,
      // weatherData.current.temperature_2m,
      weatherData,
    );
  } catch (err) {
    console.error(err);
  }
};

getWeather();
