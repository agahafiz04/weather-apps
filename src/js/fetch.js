export async function getWeather(currentLoc) {
  try {
    const fetchApi = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=444a0f30839a4b4a82860048231412&q=${currentLoc}&days=3&aqi=yes&alerts=yes`,
      { mode: "cors" },
    );
    const weatherData = await fetchApi.json();
    console.log(weatherData);

    if (fetchApi.status === 200) {
      return weatherData;
    }
    throw weatherData.error;
  } catch (error) {
    console.log(error.message);
  }

  return null;
}

export function getLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      console.log("Geolocation is not supported");
    }
  });
}

export async function convertLocation(latitude, longitude) {
  try {
    const fetchApi = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
      { mode: "cors" },
    );
    const locationData = await fetchApi.json();

    if (fetchApi.status === 200) {
      console.log(locationData);
      return locationData;
    }
    throw locationData.description;
  } catch (error) {
    console.log(error);
  }

  return null;
}
