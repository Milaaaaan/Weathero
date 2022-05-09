"use strict";

import {getNewCoords, getOwnCoords} from "../modules/coordinates.js";
import {innit} from "../modules/initialize.js";

(function (){
    document.querySelector('.location').innerHTML = localStorage.getItem('state') + localStorage.getItem('city');
    document.querySelector('.cntry').innerHTML = localStorage.getItem('country');
    document.querySelector('.citybtn').addEventListener('click', function () {
        getNewCoords()
    })
    document.querySelector('.yourLocation').addEventListener('click', function () {
        getOwnCoords()
    })
})()