//onLoad

// Map JS
let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



let ipAddress = '8.8.8.8';
//IP Information {location, address, timezone} API
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
       // Typical action to be performed when the document is ready:

        let apiData = JSON.parse(xhttp.responseText)
        
        let ipAddress = document.getElementById('ip-address')
        ipAddress.textContent = apiData.ip;
        let location = document.getElementById('location')
        location.textContent = `${apiData.location.region} ${apiData.location.country}`;
        let timezone = document.getElementById('timezone')
        timezone.textContent = apiData.location.timezone;
        let isp = document.getElementById('isp')
        isp.textContent = apiData.isp;
    }
};
xhttp.open("GET", `https://geo.ipify.org/api/v2/country?apiKey=at_VwkHWFSuKY068e9WM2b163kkh4jKf&ipAddress=${ipAddress}`, true);
xhttp.send();


let userInput = document.querySelector('#search-input');
let form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //reassign search endpoint for url (IP tracker)
    ipAddress = userInput.value;

    //API for coordinates based on state and country
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let apiData = JSON.parse(xhttp.responseText)
                //setting as global vars to use with map
                let latitude;
                let longitude;

                var coordinatesApi = new XMLHttpRequest();
                coordinatesApi.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {

                    let coordinatesApiData = JSON.parse(coordinatesApi.responseText);
                    latitude = coordinatesApiData.data[0].latitude;
                    longitude = coordinatesApiData.data[0].longitude;
                    map.setView([latitude, longitude], 6);
                    var marker = L.marker([latitude, longitude]).addTo(map);
                }
            };
            coordinatesApi.open("GET", `http://api.positionstack.com/v1/forward?access_key=d72899939abf4a6b5a48efee417f1b2c&output=json&country=${apiData.location.country}&region=${apiData.location.region}&query=${apiData.location.region}`, true);
            coordinatesApi.send();

        let ipAddress = document.getElementById('ip-address')
        ipAddress.textContent = apiData.ip;
        let location = document.getElementById('location')
        location.textContent = `${apiData.location.region} ${apiData.location.country}`;
        let timezone = document.getElementById('timezone')
        timezone.textContent = apiData.location.timezone;
        let isp = document.getElementById('isp')
        isp.textContent = apiData.isp;
        }
    };
    xhttp.open("GET", `https://geo.ipify.org/api/v2/country?apiKey=at_VwkHWFSuKY068e9WM2b163kkh4jKf&domain=${ipAddress}`, true);
    xhttp.send();
})