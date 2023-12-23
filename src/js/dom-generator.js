/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { format } from "date-fns";

// Searchbar
export const searchForm = document.querySelector("#search-bar");
export const inputEl = document.querySelector("input#location");
export const buttonEl = document.querySelector("button#change-location");

// Greeting Information
const greetingEl = document.querySelector("#greeting");
const currentDateEl = document.querySelector("#current-date");
const currentTimeEl = document.querySelector("#current-time");

// Main Location & Temp Information
const mainDescriptionEl = document.querySelector("#main-description");
const mainImageEl = document.querySelector("#main-weather");
const mainConditionEl = document.querySelector("#main-condition");
const mainTempEl = document.querySelector("#main-temp");
const mainTimePeriodEl = document.querySelector("#main-time-period");
const uvEl = document.querySelector("#main-uv");
const uvTooltipEl = document.querySelector("#main-uv-tooltip");

// Main Extra Information
const mainFeelsEl = document.querySelector("#main-feels");
const mainHumidityEl = document.querySelector("#main-humidity");
const mainRainChanceEl = document.querySelector("#main-rain-chance");
const mainWindSpeedEl = document.querySelector("#main-wind-speed");

// Forecast Daily Information
const dailyForecastDayEl = document.querySelectorAll(".daily-forecast-day");
const dailyForecastMaxTempEl = document.querySelectorAll(
  ".daily-forecast-max-temp",
);
const dailyForecastMinTempEl = document.querySelectorAll(
  ".daily-forecast-min-temp",
);
const dailyForecastIconEl = document.querySelectorAll(".daily-forecast-icon");

// Forecast Hourly Information
const hourlyForecastTimeEl = document.querySelectorAll(".hourly-forecast-time");
const hourlyForecastTempEl = document.querySelectorAll(".hourly-forecast-temp");
const hourlyForecastIconEl = document.querySelectorAll(".hourly-forecast-icon");

// Slider Button Forecast
export const prevButtonEl = document.querySelector(".prev");
export const nextButtonEl = document.querySelector(".next");
export const dotButtonEl = document.querySelectorAll(".dot");
export const hourlySlidesButtonEl = document.querySelector(
  "#forecast-slide-buttons",
);
export const hourlySlidesEl = document.querySelector("#forecast-hourly-slide");
export const dailySlidesEl = document.querySelector("#forecast-daily-slide");
export const dailyForecastButtonEl = document.querySelector(
  "#forecast-daily-button",
);
export const hourlyForecastButtonEl = document.querySelector(
  "#forecast-hourly-button",
);

export function changeGreetings(weatherData) {
  const currentCompleteDate = weatherData.location.localtime;

  const currentDate = currentCompleteDate.slice(0, 10);
  const convertDate = format(currentDate, "EEEE d LLLL yyyy");
  const currentTime = currentCompleteDate.substring(11);

  currentDateEl.textContent = convertDate;

  const greetingTime = currentCompleteDate.slice(11, 13);

  if (greetingTime >= 0 && greetingTime < 12) {
    currentTimeEl.textContent = currentTime + " AM";
  } else if (greetingTime >= 12 && greetingTime < 24) {
    currentTimeEl.textContent = currentTime + " PM";
  }

  if (greetingTime >= 0 && greetingTime < 12) {
    greetingEl.textContent = "Good Morning";
  } else if (greetingTime >= 12 && greetingTime < 18) {
    greetingEl.textContent = "Good Afternoon";
  } else if (greetingTime >= 18 && greetingTime < 24) {
    greetingEl.textContent = "Good Evening";
  }
}

export function changeMainLocationTempInfo(weatherData) {
  const tempDisplay = [" °C", " °F"];
  const currentData = weatherData.current;

  mainDescriptionEl.innerHTML = `${weatherData.location.name}, ${weatherData.location.region} </br> ${weatherData.location.country}`;
  mainImageEl.src = currentData.condition.icon;
  mainConditionEl.textContent = currentData.condition.text;
  mainTempEl.textContent = currentData.temp_c + tempDisplay[0];

  if (currentData.is_day === 1) {
    mainTimePeriodEl.textContent = "Day";
  } else if (currentData.is_day === 0) {
    mainTimePeriodEl.textContent = "Night";
  }

  uvEl.textContent = currentData.uv;

  if (currentData.uv >= 1 && currentData.uv <= 2) {
    uvEl.style.backgroundColor = "lightgreen";
    uvTooltipEl.textContent = "UV Scale Low";
  } else if (currentData.uv >= 3 && currentData.uv <= 5) {
    uvEl.style.backgroundColor = "yellow";
    uvTooltipEl.textContent = "UV Scale Moderate";
  } else if (currentData.uv >= 6 && currentData.uv <= 7) {
    uvEl.style.backgroundColor = "orange";
    uvTooltipEl.textContent = "UV Scale High";
  } else if (currentData.uv >= 8 && currentData.uv <= 10) {
    uvEl.style.backgroundColor = "red";
    uvTooltipEl.textContent = "UV Scale Very High";
  } else if (currentData.uv >= 11) {
    uvEl.style.backgroundColor = "violet";
    uvTooltipEl.textContent = "UV Scale Extreme";
  }
}

export function changeMainExtraInfo(weatherData) {
  const tempDisplay = [" °C", " °F"];
  const currentData = weatherData.current;

  mainFeelsEl.textContent = currentData.feelslike_c + tempDisplay[0];
  mainHumidityEl.textContent = currentData.humidity + "%";
  mainRainChanceEl.textContent =
    weatherData.forecast.forecastday[0].day.daily_chance_of_rain + "%";
  mainWindSpeedEl.textContent = currentData.wind_kph + " kph";
}

export function changeDailyForecastInfo(weatherData) {
  const tempDisplay = [" °C", " °F"];
  const currentForecastData = weatherData.forecast.forecastday;

  dailyForecastDayEl.forEach((dayEl, index) => {
    const convertDate = format(currentForecastData[index].date, "EEEE");
    dayEl.textContent = convertDate;
  });

  dailyForecastMaxTempEl.forEach((maxTempEl, index) => {
    maxTempEl.textContent =
      currentForecastData[index].day.maxtemp_c + tempDisplay[0];
  });

  dailyForecastMinTempEl.forEach((minTempEl, index) => {
    minTempEl.textContent =
      currentForecastData[index].day.mintemp_c + tempDisplay[0];
  });

  dailyForecastIconEl.forEach((iconEl, index) => {
    iconEl.src = currentForecastData[index].day.condition.icon;
    iconEl.classList.add("w-32");
  });
}

export function changeHourlyForecastInfo(weatherData, circleIndex = 0) {
  const tempDisplay = [" °C", " °F"];
  let currentForecastData = weatherData.forecast.forecastday[0].hour;

  let chunkSize = 8;
  let chunks = [];

  for (let i = 0; i < currentForecastData.length; i += chunkSize) {
    chunks.push(currentForecastData.slice(i, i + chunkSize));
  }

  let chunkSlice = [];

  chunks[circleIndex].forEach((chunkItem) => {
    chunkSlice.push(chunkItem);
  });

  hourlyForecastTimeEl.forEach((forecastTimeEl, index) => {
    forecastTimeEl.textContent = chunkSlice[index].time.slice(11);
  });

  hourlyForecastTempEl.forEach((forecastTempEl, index) => {
    const tempString = chunkSlice[index].temp_c.toString();

    if (tempString.length <= 2) {
      forecastTempEl.textContent = tempString + ".0" + tempDisplay[0];
    } else {
      forecastTempEl.textContent = tempString + tempDisplay[0];
    }
  });

  hourlyForecastIconEl.forEach((forecastIconEl, index) => {
    forecastIconEl.src = chunkSlice[index].condition.icon;
  });
}

export function changeForecastDisplay(display) {
  switch (display) {
    case "daily":
      dailySlidesEl.classList.add("active-slide");
      hourlySlidesEl.classList.remove("active-slide");
      hourlySlidesButtonEl.classList.remove("active-slide");
      break;

    case "hourly":
      dailySlidesEl.classList.remove("active-slide");
      hourlySlidesEl.classList.add("active-slide");
      hourlySlidesButtonEl.classList.add("active-slide");
      break;

    default:
      break;
  }
}
