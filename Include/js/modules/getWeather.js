"use strict";


import {temp, day, img, dt, tempNight, weekday, blockDay, blockHour, time} from "./initialize.js";
import Chart from "chart.js/auto";

let tempArrDay = [];
let tempArrNight = [];
let windArr = [];

export const getDataDay = function () {
    fetch(localStorage.getItem('API_URL'))
        .then(response => response.json())
        .then(data => {
                console.log(data)
                let date = new Date(dt);
                document.querySelector('.thisHourTemp').textContent = parseInt(data.hourly[0].temp) + "°C";
                document.querySelector('.top img').src = getImg(data.hourly[0].weather[0].id);
                document.querySelector('h3').textContent = data.hourly[0].weather[0].description + "";
                for (let i = 0; i < blockDay.length; i++) {
                    let date = new Date(dt);
                    tempArrDay.push(data.daily[i].temp.day);
                    tempArrNight.push(data.daily[i].temp.night);
                    windArr.push(data.daily[i].wind_speed)
                    date.setHours(date.getHours() + parseInt((data.daily[i].dt + data.timezone_offset) / 3600));
                    temp[i].textContent = parseInt(data.daily[i].temp.day) + "°C";
                    tempNight[i].textContent = parseInt(data.daily[i].temp.night) + "°C";
                    day[i].textContent = weekday[date.getDay()] + "";
                    img[i].src = getImg(data.daily[i].weather[0].id, false);

                }
                const tmpChart = document.getElementById('tempChart');
                const wndChart = document.getElementById('windChart');
                const myChart = new Chart(tmpChart, {
                    type: 'bar',
                    data: {
                        labels: weekday,
                        datasets: [
                            {
                                label: 'Day °C',
                                data: tempArrDay,
                                backgroundColor: 'rgb(227,62,62)',
                            },
                            {
                                label: 'Night °C',
                                data: tempArrNight,
                                backgroundColor: 'rgb(66,18,20)',

                            },
                        ]
                    },
                    options: {
                        responsive: true,
                    }
                });
            const tempChart = new Chart(wndChart, {
                type: 'line',
                data: {
                    labels: weekday,
                    datasets: [
                        {
                            label: 'Wind speed (km/h)',
                            data: windArr,
                            borderColor: 'rgb(0,255,225)',
                            backgroundColor: 'rgb(0,255,225)',
                            tension: 0.4,
                        },
                    ]
                },
                options: {
                    responsive: true,
                }
            });
            }
        )
}
export const getDataHour = function () {
    fetch(localStorage.getItem('API_URL'))
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const label = document.querySelectorAll('.hourBar');
            document.querySelector('.thisHourTemp').textContent = parseInt(data.hourly[0].temp) + "°C";
            document.querySelector('.top img').src = "../" + getImg(data.hourly[0].weather[0].id);
            document.querySelector('h3').textContent = data.hourly[0].weather[0].description + "";
            for (let i = 0; i < blockHour.length; i++) {
                let date = new Date(dt);
                date.setHours(date.getHours() + parseInt((data.hourly[i].dt + data.timezone_offset) / 3600));
                temp[i].textContent = parseInt(data.hourly[i].temp) + "°C";
                time[i].textContent = date.getHours() + ":00";
                day[i].textContent = weekday[date.getDay()] + "";
                img[i].src = "../" + getImg(data.hourly[i].weather[0].id, date.getHours() >= 0 && date.getHours() < 6);
            }
            let date = new Date(dt);
            localStorage.setItem('thisTime', date.getHours() + parseInt((data.hourly[0].dt + data.timezone_offset) / 3600));
            date.setHours(date.getHours() + parseInt((data.hourly[0].dt + data.timezone_offset) / 3600) - 1);
            for (let i = 1; i < 5; i++) {
                date.setHours(date.getHours() + 12);
                label[i].label = weekday[date.getDay()] + "-" + date.getHours() + ":00";
            }
        })
}

export {tempArr};

function getImg(id, night) {
    if (id >= 200 && id <= 202 || id >= 230 && id <= 232) {
        if (night)
            return "Include/img/rain/thunderstorms-night-rain.scg";
        return "Include/img/rain/thunderstorms-day-rain.scg";
    } else if (id >= 210 && id <= 221) {
        if (night)
            return "Include/img/rain/thunderstorms-night.scg";
        return "Include/img/rain/thunderstorms-day.scg";
    } else if (id >= 300 && id <= 321) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night-drizzle.svg";
        return "Include/img/cloudness/partly-cloudy-day-drizzle.svg";
    } else if (id >= 500 && id <= 531) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night-rain.svg";
        return "Include/img/cloudness/partly-cloudy-day-rain.svg";
    } else if (id >= 600 && id <= 622) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night-snow.svg";
        return "Include/img/cloudness/partly-cloudy-day-snow.svg";
    } else if (id === 701 || id === 41) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night-fog.svg";
        return "Include/img/cloudness/partly-cloudy-day-fog.svg";
    } else if (id === 711 || id === 731 || id === 751 || id === 761 || id === 762) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night-smoke.svg";
        return "Include/img/cloudness/partly-cloudy-day-smoke.svg";
    } else if (id === 721) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night-haze.svg";
        return "Include/img/cloudness/partly-cloudy-day-haze.svg";
    } else if (id === 771 || id === 781) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night-fog.svg";
        return "Include/img/cloudness/partly-cloudy-day-fog.svg";
    } else if (id === 800) {
        if (night)
            return "Include/img/cloudness/clear-night.svg";
        return "Include/img/cloudness/clear-day.svg";
    } else if (id >= 801 && id <= 802) {
        if (night)
            return "Include/img/cloudness/partly-cloudy-night.svg";
        return "Include/img/cloudness/partly-cloudy-day.svg";
    } else if (id >= 803 && id <= 804) {
        if (night)
            return "Include/img/cloudness/overcast-night.svg";
        return "Include/img/cloudness/overcast-day.svg";
    }
}

