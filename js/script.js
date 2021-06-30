
getWeekDaysboxes = () => {

    let hs = document.querySelectorAll('.hs');
    let date = new Date();
    let days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(let i = 0; i < 5; i++) {
        hs[i].innerHTML = days[date.getDay() + i];
    }
    hs[0].innerHTML = 'Today';
    if(hs[4].innerHTML === 'undefined' ){
        hs[4].innerHTML = 'Sunday';
    }
    console.log(date.getDay() + 1)
}
getWeekDaysboxes();

document.querySelector('.searchButton').addEventListener('click', getForecast);

function  getForecast  ()  {


    let input  = document.querySelector('.searchTerm');
    let cityName = input.value.toLowerCase();
    const temperature = document.querySelectorAll('.temp');
    const icon = document.querySelectorAll('.description');
    const humidity = document.querySelectorAll(".humidity");
    const windSpeed = document.querySelectorAll(".windSpeed");
    const tempMax = document.querySelectorAll(".tempMax");
    const tempMin = document.querySelectorAll(".tempMin");
    const bg = document.querySelector("body");
    let cityNotFound = document.querySelector(".cityNotFound");
    bg.style.backgroundImage = `url(https://source.unsplash.com/featured/?${cityName.trim()})`;


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=87baafad9a4fb7eed5550969f5ab2bd3`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if(data.cod === "404"){
                cityNotFound.style.display = "block"
            }
            else{
                cityNotFound.style.display = "none"
                let mainContainer = document.querySelector('.mainContainer');
                mainContainer.style.display = 'block';
                mainContainer.style.display = 'grid';
                temperature.forEach((e,i)=>{
                    temperature[i].innerHTML = Math.round(data.list[i].main.temp - 273.15) + '&degC'
                })
                icon.forEach((e,i)=>{
                    icon[i].innerHTML =  `<img src="http://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}@2x.png" width="60" height="60">`;
                })
                humidity.forEach((e,i)=>{
                    humidity[i].innerHTML = `Humidity:  <p class="inf" style="display:inline-block;">${data.list[i].main.humidity}%</p>`;
                })
                windSpeed.forEach((e,i)=>{
                    windSpeed[i].innerHTML = `Wind speed:   <p class="inf" style="display:inline-block;">${data.list[i].wind.speed} m/s</p>`;
                })
                tempMax.forEach((e,i)=>{
                    tempMax[i].innerHTML = `temp max:  <p class="inf" style="display:inline-block;">${ Math.floor(data.list[i].main.temp_max - 273.15 )} &degC</p>`;
                });
                tempMin.forEach((e,i)=>{
                    tempMin[i].innerHTML = `temp min:  <p class="inf" style="display:inline-block;">${ Math.floor(data.list[i].main.temp_min - 273.15 )}  &degC</p>`;
                })
            }

        });
}



