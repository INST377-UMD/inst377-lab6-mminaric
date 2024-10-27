function createMap() {
    var map = L.map('map').setView([40, -100], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    randomLocation1x = getRandomInRange(30, 35, 3);
    randomLocation2x = getRandomInRange(30, 35, 3);
    randomLocation3x = getRandomInRange(30, 35, 3);
    randomLocation1y = getRandomInRange(-90, -100, 3);
    randomLocation2y = getRandomInRange(-90, -100, 3);
    randomLocation3y = getRandomInRange(-90, -100, 3);
    var marker1 = L.marker([randomLocation1x, randomLocation1y]).addTo(map);
    findLocation(randomLocation1x, randomLocation1y, marker1, "locality1id");
    document.getElementById('marker1id').textContent += "Lattitude: " + randomLocation1x + " Longitude: " + randomLocation1y;


    var marker2 = L.marker([randomLocation2x, randomLocation2y]).addTo(map);
    findLocation(randomLocation2x, randomLocation2y, marker2, "locality2id");
    document.getElementById('marker2id').textContent += "Lattitude: " + randomLocation2x + " Longitude: " + randomLocation2y;
    
    var marker3 = L.marker([randomLocation3x, randomLocation3y]).addTo(map);
    findLocation(randomLocation3x, randomLocation3y, marker3, "locality3id");
    document.getElementById('marker3id').textContent += "Lattitude: " + randomLocation3x + " Longitude: " + randomLocation3y;

}

function findLocation(latitude, longitude, marker, id) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then((res) => res.json())
    .then((resJson) => {
        Object.entries(resJson).forEach((object) => {
            if(object[0] == "locality") {
                marker.bindPopup(object[1].toString()).openPopup();
                document.getElementById(id).textContent += object[1].toString();
            }
        })
    })
    return false;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

window.onload = createMap;