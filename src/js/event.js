import {
  changeIndex,
  changeSlider,
  changeWeather,
  indexChange,
  location,
  sliderChange,
} from ".";
import {
  buttonEl,
  changeForecastDisplay,
  dailyForecastButtonEl,
  dotButtonEl,
  hourlyForecastButtonEl,
  inputEl,
  nextButtonEl,
  prevButtonEl,
  searchForm,
} from "./dom-generator";

buttonEl.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputEl.value !== "") {
    changeWeather(inputEl.value);
  } else {
    location().then((coordinate) => changeWeather(coordinate));
  }

  searchForm.reset();
});

prevButtonEl.addEventListener("click", (e) => {
  sliderChange.nextSlide(-1);
});

nextButtonEl.addEventListener("click", (e) => {
  sliderChange.nextSlide(1);
});

dotButtonEl.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    dotButtonEl.forEach((selected) => {
      selected.classList.remove("active-slider");
    });
    indexChange.modifyIndex(index);
    sliderChange.currentSlide(index);
    el.classList.add("active-slider");
  });
});

dailyForecastButtonEl.addEventListener("click", (e) => {
  dailyForecastButtonEl.classList.add("active");
  hourlyForecastButtonEl.classList.remove("active");
  changeForecastDisplay("daily");
});

hourlyForecastButtonEl.addEventListener("click", (e) => {
  dailyForecastButtonEl.classList.remove("active");
  hourlyForecastButtonEl.classList.add("active");
  changeForecastDisplay("hourly");
});
