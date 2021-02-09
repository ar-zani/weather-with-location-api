// api.openweathermap.org/data/2.5/weather?q={City Name}&units=metric&appid={API Key}
const api = {
    key: 'b6cc4392568a3586e950307c86a22bbd',
    base: 'https://api.openweathermap.org/data/2.5/weather'
}
function currentLocalTemp() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}
const showError = () => {
    handleSearch(false);
}
const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(data => display(data));
}
currentLocalTemp();

function handleSearch(check) {
    let city;
    if (check == true) {
        city = document.getElementsByClassName('form-control')[0].value;
    }
    else {
        city = 'dhaka';
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(data => display(data));
}
// const display = data => {
//     findById('city').innerText = data.name;
//     findById('temp').innerText = data.main.temp;
//     findById('lead').innerText = data.weather[0].main;
//     findById('icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
// }
// const findById = id => {
//     return document.getElementById(id);
// }

// function handleSearch(){
//     const city = document.getElementsByClassName('form-control')[0].value;
//     const url = `${api.base}?q=${city}&units=metric&appid=${api.key}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => display(data))
// }

const display = data => {
    const div = `
        <div class="weather-status text-white text-center">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
            <h1>${data.name}</h1>
            <h3><span>${data.main.temp}</span>&deg;C</h3>
            <h1 class="lead">${data.weather[0].main}</h1>
        </div>
        `
    document.getElementsByClassName('weather')[0].innerHTML += div;
}