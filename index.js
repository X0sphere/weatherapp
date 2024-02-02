
const timeEl=document.getElementById("time");
const dateEl=document.getElementById("date");
const currentweatherEl=document.getElementById("current-weather-items");
const timezone=document.getElementById("time-zone");
const countryEl=document.getElementById("country");
const weatherForecastEl=document.getElementById("weather-forecast");
const curretTempEl=document.getElementById("current-temp");
const days=[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`];
const months=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];

const API_Key='01132cd2f490d3bd5bbbd4a5c436a69b';
setInterval(() => {
 const time=new Date();
 const month=time.getMonth();
 const date=time.getDate();
 const day=time.getDay();
 const hour=time.getHours();
 const hourIn12HrFormat=hour >=13 ? hour%12 :hour;
 const minutes=time.getMinutes();
 const ampm=hour>=12 ?'PM' :'AM'
 timeEl.innerHTML=hourIn12HrFormat + ':' +minutes+ ' '+ `<span id="am-pm">${ampm}</span>`
 dateEl.innerHTML=days[day]+ ',' +date+ ' ' +months[month];
 

},1000);
getWeatherData();
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let {latitude,longitude}=success.coords;
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,&units=metric&appid=${API_Key}`).then(res=>res.json()).then(data=>{
            console.log(data);
            showWeather(data);
        })
})
}
function showWeather(data){
let {humidity,pressure,sunrise,sunset,wind_speed}=data.current;

currentweatherEl.innerHTML=
 `  <div class="weather-items">
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