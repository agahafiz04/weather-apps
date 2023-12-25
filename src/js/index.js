import "./import";

/* eslint-disable import/extensions */
import {
  changeDailyForecastInfo,
  changeGreetings,
  changeHourlyForecastInfo,
  changeMainExtraInfo,
  changeMainLocationTempInfo,
  dailySlidesEl,
  dotButtonEl,
  hourlySlidesButtonEl,
  hourlySlidesEl,
  loader,
} from "./dom-generator.js";
import { getWeather, getLocation, convertLocation } from "./fetch.js";

export let currentLocation;

// location().then((coordinate) => changeWeather(coordinate));
location()
  .then((coordinate) => convertLocation(coordinate))
  .then((location) => changeWeather(location.city));

export async function location() {
  const location = await getLocation();
  const { latitude, longitude } = await location.coords;
  const coordinate = `${latitude},${longitude}`;
  return coordinate;
}

export function changeWeather(location) {
  getWeather(location)
    .then((weatherData) => {
      currentLocation = weatherData;
      changeGreetings(weatherData);
      changeMainLocationTempInfo(weatherData);
      changeMainExtraInfo(weatherData);
      changeDailyForecastInfo(weatherData);
      changeHourlyForecastInfo(weatherData);
    })
    .catch((error) => {
      console.log(error);
    });
}

export const indexChange = changeIndex();

function changeIndex() {
  let currentIndex = 0;

  function modifyIndex(index) {
    currentIndex = index;
  }

  function plusMinusIndex(digit) {
    currentIndex += digit;
  }

  function resetIndex() {
    currentIndex = 0;
  }

  function getIndex() {
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex > 2) {
      currentIndex = 2;
    }

    return currentIndex;
  }

  return { modifyIndex, resetIndex, plusMinusIndex, getIndex };
}

export const sliderChange = changeSlider();

function changeSlider() {
  function currentSlide() {
    let index = indexChange.getIndex();
    changeHourlyForecastInfo(currentLocation, index);
  }

  function nextSlide(digit) {
    indexChange.plusMinusIndex(digit);
    let index = indexChange.getIndex();

    dotButtonEl.forEach((selected) => {
      selected.classList.remove("active-slider");
    });
    dotButtonEl[index].classList.add("active-slider");
    changeHourlyForecastInfo(currentLocation, index);
  }

  return { currentSlide, nextSlide };
}

export function displayLoading() {
  loader.classList.add("display-loading");

  setTimeout(() => {
    loader.classList.remove("display-loading");
  }, 15000);
}

export function hideLoading() {
  loader.classList.remove("display-loading");
}
