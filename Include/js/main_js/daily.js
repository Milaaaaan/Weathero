
import * as location from '../modules/coordinates.js'
import * as data from '../modules/initialize.js'
import * as weather from '../modules/getWeather.js'
import {weekday} from "../modules/initialize.js";
import Chart from "chart.js/auto";

    const dayCard = document.querySelectorAll('.displayDay');

    dayCard.forEach((element) => {
        element.addEventListener('click', () => {
            document.querySelector('.details').scrollIntoView({
                behavior: 'smooth'
            })
        })
    })



    if (localStorage.getItem('initialized') === "0") {
        console.log(true)
        location.getOwnCoords()
        localStorage.setItem('initialized', "1");
    }
    const daytrip = async function () {
        try {
            await data.innit()
            await weather.getDataDay()
        } catch (err) {
            console.log(err)
        } finally {
            await graph()
        }
    }
    daytrip()

