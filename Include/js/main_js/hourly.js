"use strict";

import * as location from '../modules/coordinates.js'
import * as data from '../modules/initialize.js'
import * as weather from '../modules/getWeather.js'

(function () {
    if (localStorage.getItem('initialized') === "0") {
        console.log(true)
        location.getOwnCoords()
        localStorage.setItem('initialized', "1");
    }
    const daytrip = async function () {
        try {
            await data.innit()
        } catch (err) {
            console.log(err)
        } finally {
            await weather.getDataHour()
        }
    }
    daytrip()

})()

