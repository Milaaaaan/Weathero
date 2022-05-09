"use strict";

(function () {

    document.querySelector('.hamburger').addEventListener('click', function () {
        let x = document.querySelector(".hamburger").getAttribute("aria-pressed");
        if (x === "true") {
            x = "false"
        } else {
            x = "true"
        }
        document.querySelector("#menulijst").classList.toggle('hidden');
        document.querySelector(".hamburger").setAttribute("aria-pressed", x);
        document.querySelector("nav").setAttribute("aria-expanded", x);
    })


    const mediaQuery = window.matchMedia('(min-width: 680px)')

    function handleTabletChange(e) {
        if (e.matches) {
            document.querySelector("#menulijst").classList.add('hidden');
            document.querySelector(".hamburger").setAttribute("aria-pressed", "false");
            document.querySelector("nav").setAttribute("aria-expanded", "false");
        }
    }

    mediaQuery.addListener(handleTabletChange)
    handleTabletChange(mediaQuery)

})()