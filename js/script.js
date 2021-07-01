

document.querySelector('.searchButton').addEventListener('click', getForecast);
document.querySelector('.searchTerm').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getForecast()
    }
});
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


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=b3843b19f7f8bc0f97d70f7ca31cb0bf`)
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

                let datas = data.list;
                let daysD = [];
                datas.map((e,i)=>{
                    let allDays = new Date(e.dt * 1000).getDay();
                    daysD.push(allDays);
                })
                let tempResDays2 = new Set (daysD);
                let restDays = Array.from(tempResDays2)
                console.log(restDays);
                getWeekDaysboxes = () => {

                    let hs = document.querySelectorAll('.hs');
                    let date = new Date();
                    let days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    for(let i = 1; i < 5; i++) {
                        hs[i].innerHTML = days[restDays[i]];
                    }
                    hs[0].innerHTML = 'Today';

                    console.log(date.getDay() + 1)
                }
                getWeekDaysboxes();


                temperature.forEach((e,i)=>{
                    temperature[i].innerHTML = Math.round(data.list[i*8].main.temp) + '&degC'
                })
                icon.forEach((e,i)=>{
                    icon[i].innerHTML =  `<img src="http://openweathermap.org/img/wn/${data.list[i*8].weather[0]['icon']}@2x.png" width="60" height="60">`;
                })
                humidity.forEach((e,i)=>{
                    humidity[i].innerHTML = `Humidity:  <p class="inf" style="display:inline-block;">${data.list[i*8].main.humidity}%</p>`;
                })
                windSpeed.forEach((e,i)=>{
                    windSpeed[i].innerHTML = `Wind speed:   <p class="inf" style="display:inline-block;">${data.list[i*8].wind.speed} m/s</p>`;
                })
                tempMax.forEach((e,i)=>{
                    tempMax[i].innerHTML = `temp max:  <p class="inf" style="display:inline-block;">${data.list[i*8].main.temp_max} &degC</p>`;
                });
                tempMin.forEach((e,i)=>{
                    tempMin[i].innerHTML = `temp min:  <p class="inf" style="display:inline-block;">${ data.list[i*8].main.temp_min}  &degC</p>`;
                })
            }

        });
}



