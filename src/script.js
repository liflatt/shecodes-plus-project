let currentCity = "Fort Worth";
let currentUnit = "imperial";
let degreesUnit = "°F";
let windUnit = "mph";

function currentWeather(response) {
  let cityElement = document.querySelector("#current-city-display");
  let temperatureElement = document.querySelector(
    "#current-temp-number-display"
  );
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} ${windUnit}`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-forecast-icon" />`;
  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[date.getDay()];
  let dayOfMonth = date.getDate();
  let month = months[date.getMonth()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${dayOfMonth}, ${hour}:${minutes}`;
}

function toggleTemperatureUnit() {
  let toggleButton = document.getElementById("toggle-button");
  let degreesElement = document.querySelector("#degrees");

  if (currentUnit === "imperial") {
    currentUnit = "metric";
    degreesUnit = "°C";
    windUnit = "km/h";
    toggleButton.innerHTML = "°F";
  } else {
    currentUnit = "imperial";
    degreesUnit = "°F";
    windUnit = "mph";
    toggleButton.innerHTML = "°C";
  }

  degreesElement.innerHTML = `${degreesUnit}`;
  searchCity(currentCity);
}

let toggleButton = document.querySelector("#toggle-button");
toggleButton.addEventListener("click", toggleTemperatureUnit);

function searchCity(city) {
  currentCity = city;
  let apiKey = "b0452f91cd75631eoba398t0f42a2100";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${currentUnit}`;

  axios.get(apiUrl).then(currentWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b0452f91cd75631eoba398t0f42a2100";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${currentUnit}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Fort Worth");
