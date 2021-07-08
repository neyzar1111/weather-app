import {calculateDates} from './modules/calculateDates.js';
import {getWeekDaysboxes} from './modules/calculateDates.js';
import '../css/reset.css';
import '../css/sass.css';

window.onload = function() {



    const temperature = document.querySelectorAll('.temp');
    const icon = document.querySelectorAll('.description');
    const humidity = document.querySelectorAll(".humidity");
    const windSpeed = document.querySelectorAll(".windSpeed");
    const tempMax = document.querySelectorAll(".tempMax");
    const tempMin = document.querySelectorAll(".tempMin");
    const dayTemp = document.querySelectorAll(".day-temp");
    const nightTemp = document.querySelectorAll(".night-temp");


    document.querySelector('.searchButton').addEventListener('click', getForecast);
    document.querySelector('.searchTerm').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            getForecast()
        }
    });

    function getForecast() {

        let input = document.querySelector('.searchTerm');
        let cityName = input.value.toLowerCase();

        const bg = document.querySelector("body");
        let cityNotFound = document.querySelector(".cityNotFound");
        bg.style.backgroundImage = `url(https://source.unsplash.com/featured/?${cityName.trim()})`;


        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=b3843b19f7f8bc0f97d70f7ca31cb0bf`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.cod === "404") {
                    cityNotFound.style.display = "block";
                    return;
                }
                cityNotFound.style.display = "none";

                function renderMainContainer() {
                    let mainContainer = document.querySelector('.mainContainer');
                    mainContainer.style.display = 'block';
                    mainContainer.style.display = 'grid';
                }

                renderMainContainer();
                let {restDays, dates} = calculateDates(data); //imported
                getWeekDaysboxes(restDays);

                let makeAverage = (p) => Math.round(p.reduce((a, c) => a + c) / 4);
                let makeAverforAll = (p) => Math.round(p.reduce((a, c) => a + c) / 8);

                function getRightDate(date) {
                    return data.list.filter((e, i) => {
                        let allDays = new Date(e.dt * 1000).getDate();
                        return (allDays === dates[date])
                    });
                }

                function getDayWeather(p) {
                    return getRightDate(p).filter(e =>
                        (new Date(e.dt * 1000).getHours() > 6 && new Date(e.dt * 1000).getHours() < 18)
                    ).map(e => e.main.temp)
                }

                function getNightWeather(p) {
                    return getRightDate(p).filter(e =>
                        (new Date(e.dt * 1000).getHours() > 18 || new Date(e.dt * 1000).getHours() < 6)
                    ).map(e => e.main.temp);
                }

                function getHumidity(p) {
                    return getRightDate(p).map((e, i) => e.main.humidity)
                }

                function getWindSpeed(p) {
                    return getRightDate(p).map((e, i) => e.wind.speed);
                }

                function getTempMax(p) {
                    return getRightDate(p).map((e, i) => e.main.temp_max);
                }

                function getTempMin(p) {
                    return getRightDate(p).map((e, i) => e.main.temp_min);
                }

                function getWeatherDataReady() {
                    let readyWeatherData = [];
                    for (let i = 1; i <= 4; i++) {
                        readyWeatherData.push(
                            {
                                'temperatureNight': makeAverage(getNightWeather(i)),
                                'temperatureDay': makeAverage(getDayWeather(i)),
                                'allHumdities': makeAverforAll(getHumidity(i)),
                                'windSpeeds': makeAverforAll(getWindSpeed(i)),
                                'tempsMax': Math.ceil(Math.max(...getTempMax(i))),
                                'tempsMin': Math.floor(Math.min(...getTempMin(i))),
                            }
                        );
                    }
                    return readyWeatherData;
                }

                let readyWeatherData = getWeatherDataReady();
                console.log(readyWeatherData);

                for (let i = 1; i < 5; i++) {
                    temperature[i].innerHTML = readyWeatherData[i - 1].temperatureDay + '&degC';
                    humidity[i].innerHTML = 'Humidity: ' + readyWeatherData[i - 1].allHumdities + '%';
                    windSpeed[i].innerHTML = `Wind speed: ${readyWeatherData[i - 1].windSpeeds}`;
                    tempMax[i].innerHTML = 'Temp max expected: ' + readyWeatherData[i - 1].tempsMax + '&degC';
                    tempMin[i].innerHTML = 'Temp min expected: ' + readyWeatherData[i - 1].tempsMin + '&degC';
                }


                function getWeatherforToday(cityName) {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=87baafad9a4fb7eed5550969f5ab2bd3`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            if (data.cod === "404") {
                                cityNotFound.style.display = "block"
                            } else {
                                temperature[0].innerHTML = Math.round(data.main.temp) + '&degC';
                                humidity[0].innerHTML = 'Humidity: ' + data.main.humidity + '%';
                                windSpeed[0].innerHTML = `Wind speed: ${data.wind.speed}`;
                                tempMax[0].innerHTML = 'Temp max expected: ' + Math.round(data.main.temp_max) + '&degC';
                                tempMin[0].innerHTML = 'Temp min expected: ' + Math.round(data.main.temp_min) + '&degC';


                                dayTemp.forEach((e, i) => {
                                    e.addEventListener("click", function () {
                                        temperature[i + 1].innerHTML = readyWeatherData[i].temperatureDay + '&degC';
                                    })
                                })
                                nightTemp.forEach((e, i) => {
                                    e.addEventListener("click", function () {
                                        temperature[i + 1].innerHTML = readyWeatherData[i].temperatureNight + '&degC';
                                    })
                                })

                            }
                        })
                }

                getWeatherforToday(cityName);
                // TODO get correct icons
                icon.forEach((e, i) => {
                    icon[i].innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[i * 8].weather[0]['icon']}@2x.png" width="60" height="60">`;
                })


            });
    }
}


