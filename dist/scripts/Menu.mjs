"use strict";
fetch("./dist/scripts/Menu.html")
    .then(response => response.text())
    .then(data => {
    document.getElementById('HeaderContent').innerHTML = data;
})
    .catch(error => console.error('Error loading menu:', error));
