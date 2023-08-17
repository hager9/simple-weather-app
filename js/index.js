
// search variable 
let searchInput = document.getElementById("search");


// select today variables
let todayName = document.getElementById("todayDateName");
let todayNumber = document.getElementById("todayDateNumber");
let todayMonth = document.getElementById("todayDateMonth");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayConditionImg");
let todayConditionText = document.getElementById("todayConditionText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");


// select tomorrow & after tomorrow variables
let nextDayName = document.querySelectorAll(".nextDayName");
let nextConditionImg = document.querySelectorAll(".nextConditionImg");
let nextMaxTemp = document.querySelectorAll(".nextMaxTemp");
let nextMinTemp = document.querySelectorAll(".nextMinTemp");
let nextConditionText = document.querySelectorAll(".nextConditionText");


// fetch data from api
async function getWeatherData(cityName = "london") {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7a847fcc64d04e4fa9a190354231608&q=${cityName}&days=3`);
    let ResponseData = await weatherResponse.json();
    return ResponseData
}



// display today data
function displayTodaytData(data) {

    let date = new Date();
    todayName.innerHTML = date.toLocaleDateString("us-en", { weekday: "long" });
    todayNumber.innerHTML = date.getDate();
    todayMonth.innerHTML = date.toLocaleDateString("us-en", { month: "long" });
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src", data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir;
}


// display tomorrow & after tomorrow data
function displayNextDayesData(data) {

    for (let i = 0; i <= nextDayName.length; i++){
        let nextDate = new Date(data.forecast.forecastday[i + 1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("us-en", { weekday: "long" });
        nextConditionImg[i].setAttribute("src", data.forecast.forecastday[i + 1].day.condition.icon);
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c;
        nextConditionText[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text;
    }

}


// start app working
async function workingApp(city) {
    let weatherData = await getWeatherData(city);
    displayTodaytData(weatherData);
    displayNextDayesData(weatherData);
}

workingApp();


searchInput.addEventListener("input", function () {
    workingApp(searchInput.value);
})