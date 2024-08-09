
// .............TOGGLE ICON NAVBAR...............
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}


const time = document.getElementById("time");
const timeFormat = document.getElementById("timeFormat");

document.addEventListener("DOMContentLoaded", () => {
    setInterval(showTime, 1000);
});

const showTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    timeFormat.innerHTML = hour > 12 ? "PM" : "AM";

    hour = hour > 12 ? hour - 12 : hour;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;

    time.innerHTML = `${hour} : ${minute} : ${second}`

}



let timerDisplay = document.querySelector('.timerDisplay');
let stopBtn = document.getElementById('stopBtn');
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');

let msec = 0;
let secs = 0;
let mins = 0;

let timerId = null;

startBtn.addEventListener('click', function () {
    if (timerId !== null) {
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10);
});

stopBtn.addEventListener('click', function () {
    clearInterval(timerId);
});

resetBtn.addEventListener('click', function () {
    clearInterval(timerId);
    timerDisplay.innerHTML = `00 : 00 : 00`;
    msec = secs = mins = 0;
});

function startTimer() {
    msec++;
    if (msec == 100) {
        msec = 0;
        secs++;
        if (secs == 60) {
            secs = 0;
            mins++;
        }
    }

    let msecString = msec < 10 ? `0${msec}` : msec;
    let secsString = secs < 10 ? `0${secs}` : secs;
    let minsString = mins < 10 ? `0${mins}` : mins;


    timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;

}




function showTimeWatch() {
    document.getElementById("time-watch").style.display = "flex";
    document.getElementById("stop-watch").style.display = "none";
    document.getElementById("weather-app").style.display = "none"
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
function showStopWatch() {
    document.getElementById("time-watch").style.display = "none";
    document.getElementById("stop-watch").style.display = "flex";
    document.getElementById("weather-app").style.display = "none"
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}
function showWeatherApp() {
    document.getElementById("time-watch").style.display = "none";
    document.getElementById("stop-watch").style.display = "none";
    document.getElementById("weather-app").style.display = "flex"
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}


// .......................Weather app...............
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const city_location = document.getElementById('location');
const city_time = document.querySelector('#location-time');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city) {
    const api_key = "8ef94d80373b27ad2dd277591db18a88";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


    const weather_data = await fetch(`${url}`).then(response => response.json());


    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";


    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${Math.round(weather_data.wind.speed * 3.6)}Km/H`;


    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "../assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "../assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "../assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "../assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "../assets/snow.png";
            break;

    }

    city_location.innerHTML = `${city} Weather`;
    let current_time = new Date();
    let day_nmae ='';
    let timeFormat = current_time.getHours()>12 ? "PM" : "AM";
    let hours = current_time.getHours()>12 ? current_time.getHours()-12 : current_time.getHours(); 
    hours = hours<10 ? `0${hours}`:hours;
    let minutes = current_time.getMinutes();
    minutes = minutes<10 ? `0${minutes}`: minutes;
    

    switch (current_time.getDay()) {
        case 1:
            day_nmae = "Monday";
            break;
        case 2:
            day_nmae = "Tuesday";
            break;
        case 3:
            day_nmae = "Wednesday";
            break;
        case 4:
            day_nmae = "Thursday";
            break;
        case 5:
            day_nmae = "Friday";
            break;
        case 6:
            day_nmae = "Saturday";
            break;
        case 7:
            day_nmae = "Sunday";
            break;
    }


    city_time.innerHTML = `${day_nmae}, ${hours}:${minutes} ${timeFormat}`;
    console.log(city_time);
    console.log(weather_data);
}


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});