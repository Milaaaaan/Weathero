"use strict";

import {lat, lon} from './coordinates.js'

export const innit = function () {
    document.querySelector('.location').innerHTML = localStorage.getItem('state') + localStorage.getItem('city');
    localStorage.setItem('API_URL', "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=" +  localStorage.getItem('API_key') + "&units=metric");

}

    const API = "32170ef0fc72596dcaae2034ea56b418";
    let API_URL = localStorage.getItem('API_URL')
    const blockHour = document.querySelectorAll('.displayBlock');
    const blockDay = document.querySelectorAll('.displayDay');
    const temp = document.querySelectorAll('.deg');
    const tempNight = document.querySelectorAll('.degNight');
    const time = document.querySelectorAll('.time');
    const day = document.querySelectorAll('.day');
    const img = document.querySelectorAll('div img');
    let dt = new Date('January 01, 1970 00:00:00');
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    export {API, API_URL, blockHour, blockDay, day, dt, img, temp, tempNight, time, weekday };


