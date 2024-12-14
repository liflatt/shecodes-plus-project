function currentWeather(response) {
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
  windElement.innerHTML = `${response.data.wind.speed}mph`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-emoji" />`;
  timeElement.innerHTML = formatDate(date);
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
    "Oct",
    "Sep",
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let cityDisplay = document.querySelector("#current-city-display");
  cityDisplay.innerHTML = searchInput.value;
  let city = `${searchInput.value}`;

  let apiKey = "b0452f91cd75631eoba398t0f42a2100";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(currentWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
