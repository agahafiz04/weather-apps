import { displayLoading, hideLoading } from ".";

export async function getWeather(currentLoc) {
  try {
    displayLoading();
    const fetchApi = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=444a0f30839a4b4a82860048231412&q=${currentLoc}&days=3&aqi=yes&alerts=yes`,
      { mode: "cors" },
    );
    const weatherData = await fetchApi.json();

    if (fetchApi.status === 200) {
      hideLoading();
      return weatherData;
    }
    throw weatherData.error;
  } catch (error) {
    hideLoading();
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
      return locationData;
    }
    throw locationData.description;
  } catch (error) {
    console.log(error);
  }

  return null;
}
