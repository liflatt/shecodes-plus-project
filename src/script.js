function currentWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.condition.description;

  let temperatureElement = document.querySelector(
    "#current-temp-number-display"
  );
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = `${temperature}`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}mph`;
  descriptionElement.innerHTML = `${description}`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-emoji" />`;
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
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();

  // Add leading zero to minutes if less than 10
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedTime = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formattedTime;
}
let currentTime = new Date();
let timeNow = document.querySelector("#current-time");
timeNow.innerHTML = formatDate(currentTime);

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
