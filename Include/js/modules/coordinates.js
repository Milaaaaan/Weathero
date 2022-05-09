"use strict";


localStorage.setItem('API_key', "32170ef0fc72596dcaae2034ea56b418");
let lon;
let lat;
if (localStorage.getItem('lat') === null || localStorage.getItem('lon') === null) {
    lat = 51.2346207
    lon = 3.7250121
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
    localStorage.setItem('state', 'East-Flanders');
    localStorage.setItem('city', 'Ghent');
    localStorage.setItem('country', 'BE');
} else {
    lat = localStorage.getItem('lat');
    lon = localStorage.getItem('lon');
}
let state
let country
let city

export {lat, lon};

export const getOwnCoords = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            lon = position.coords.longitude
            localStorage.setItem('lat', lat);
            localStorage.setItem('lon', lon);
            fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=5&appid=32170ef0fc72596dcaae2034ea56b418")
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('state', data[0].state + " - ");
                    localStorage.setItem('country', data[0].country);
                    localStorage.setItem('city', data[0].name);
                    document.querySelector('.location').innerHTML = localStorage.getItem('state') + localStorage.getItem('city');
                    document.querySelector('.cntry').innerHTML = localStorage.getItem('country');
                })
        });
    } else {
        console.log("brower does not support")
    }
}

export const getNewCoords = function () {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + document.querySelector('input').value
        + "&limit=5&appid=" + localStorage.getItem('API_key'))
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let newstate = data[0].state;
            if (newstate === null) {
                newstate = "";
            } else {
                newstate += " - ";
            }
            lat = data[0].lat;
            lon = data[0].lon;

            localStorage.setItem('lat', lat);
            localStorage.setItem('lon', lon);
            localStorage.setItem('state', newstate);
            localStorage.setItem('city', data[0].name);
            localStorage.setItem('country', data[0].country);

            document.querySelector('.cntry').innerHTML = localStorage.getItem('country');
            document.querySelector('.location').innerHTML = localStorage.getItem('state') + localStorage.getItem('city');
            localStorage.setItem('API_URL', "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=" + data.API + "&units=metric");

        })
        .catch(err => console.log("wrong city"))
}
