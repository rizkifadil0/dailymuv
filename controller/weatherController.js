const getWeatherCondition = (code) => {
  if (code === 0) return { desc: "Clear Sky", icon: "fa-solid fa-sun" };
  if (code === 1 || code === 2)
    return { desc: "Partly Cloudy", icon: "fa-solid fa-cloud-sun" };
  if (code === 3) return { desc: "Overcast", icon: "fa-solid fa-cloud" };
  if (code >= 45 && code <= 48)
    return { desc: "Fog", icon: "fa-solid fa-smog" };
  if (code >= 51 && code <= 57)
    return { desc: "Drizzle", icon: "fa-solid fa-cloud-rain" };
  if (code >= 61 && code <= 67)
    return { desc: "Rain", icon: "fa-solid fa-cloud-showers-heavy" };
  if (code >= 71 && code <= 77)
    return { desc: "Snow", icon: "fa-solid fa-snowflake" };
  if (code >= 80 && code <= 82)
    return { desc: "Rain Showers", icon: "fa-solid fa-cloud-showers-water" };
  if (code >= 85 && code <= 86)
    return { desc: "Snow Showers", icon: "fa-solid fa-snowflake" };
  if (code >= 95 && code <= 99)
    return { desc: "Thunderstorm", icon: "fa-solid fa-cloud-bolt" };

  return { desc: "Unknown", icon: "fa-solid fa-cloud" }; // Default fallback
};

const weatherRender = (req, res) => {
  const e = "empty";
  res.render("pages/weather", {
    judul: "weather",
    hasData: false,
    error: false,
  });
};

const getWeather = async (req, res) => {
  const city = req.body.city;
  const empty = "empty";
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
    const cityName =
      namedCityData.address.city ||
      namedCityData.address.town ||
      namedCityData.address.village ||
      city;

    const dailyForecast = weatherData.daily.time.map((date, index) => {
      const code = weatherData.daily.weather_code[index];
      const cond = getWeatherCondition(code);
      return {
        day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
        max: weatherData.daily.temperature_2m_max[index],
        min: weatherData.daily.temperature_2m_min[index],
        icon: cond.icon,
      };
    });

    const condition = getWeatherCondition(weatherData.current.weather_code);

    res.render("pages/weather", {
      judul: "Weather",
      city: cityName,
      hasData: true, // Beritahu EJS untuk menampilkan grid cuaca
      error: false, // Sembunyikan error
      country: namedCityData.address.country,
      curtemp: weatherData.current.temperature_2m,
      curwind: weatherData.current.wind_speed_10m,
      curhum: weatherData.current.relative_humidity_2m,
      curuv: weatherData.current.uv_index,
      curpress: weatherData.current.pressure_msl,
      forecast: dailyForecast,
      curdesc: condition.desc,
      curicon: condition.icon,
    });
  } catch (err) {
    console.error(err);
    res.render("pages/weather", {
      judul: "Weather",
      searchedCity: city,
      hasData: false, // Beritahu EJS untuk menampilkan grid cuaca
      error: true, // Sembunyikan error
    });
  }
};

module.exports = { weatherRender, getWeather };
