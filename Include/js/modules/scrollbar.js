"use strict";


import {blockHour, dt, weekday} from "./initialize.js";

(function () {

    const scroll = document.querySelector('.hourly');
    const range = document.querySelector('.slideBar');
    const spanThumb = document.querySelector('.slidevalue');
    let max = scroll.scrollWidth - scroll.clientWidth * 1.10
    range.max = max;
    range.step = range.max / 47.0;
    let lastElement = 0;
    let element = 0;

    document.querySelector('option:nth-child(2)').value = max * 0.25;
    document.querySelector('option:nth-child(3)').value = max * 0.5;
    document.querySelector('option:nth-child(4)').value = max * 0.75;
    document.querySelector('option:nth-child(5)').value = max;

    range.oninput = function () {
        element = Math.round( range.value / max * 47);
        blockHour[lastElement].classList.remove('now');
        blockHour[element].classList.add('now');
        lastElement = element;
        let dateCopy = new Date(dt);
        dateCopy.setHours(localStorage.getItem('thisTime'));
        dateCopy.setHours(dateCopy.getHours() + Math.round( range.value / max * 47))
        spanThumb.innerHTML = weekday[dateCopy.getDay()] + ", " + dateCopy.getHours() + ":00"
        scroll.scrollLeft = range.value;
        spanThumb.style.marginLeft = "calc(" + (range.value / max) * 100 + "% - " + (range.value / max) * 88 + "px)";
        return undefined;
    }
})()