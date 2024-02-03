const API_Key = 'e38897f8565a7022f9f1011ba26fbe78';

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentweatherEl = document.getElementById("current-weather-items");
const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
const months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

function updateTime() {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hourIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  timeEl.innerHTML = hourIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML = days[day] + ',' + date + ' ' + months[month];
}

function getWeatherData() {
  navigator.geolocation.getCurrentPosition(
    (success) => {
      const { latitude, longitude } = success.coords;
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_Key}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Weather data not available');
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          showWeather(data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          // Handle the error, e.g., display an error message to the user
        });
    }
  );
}

function showWeather(data) {
  // Extract relevant information from the forecast data
  const currentForecast = data.list[0]; // Assuming the first item in the list is the current forecast
  const { humidity, pressure, speed: wind_speed } = currentForecast.wind;

  currentweatherEl.innerHTML =
    `<div class="weather-items">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="weather-items">
      <div>Pressure</div>
      <div>${pressure}</div>
    </div>
    <div class="weather-items">
      <div>Wind speed</div>
      <div>${wind_speed}</div>
    </div>`;
}

setInterval(updateTime, 1000);
getWeatherData();
