
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
function  getForecast  ()  {

    let input  = document.querySelector('.searchTerm');
    let cityName = input.value.toLowerCase();

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
                let daysDay = [];
                let daysDate = [];
                datas.map((e,i)=>{
                    let allDays = new Date(e.dt * 1000).getDay();
                    let allDates = new Date(e.dt*1000).getDate();

                    daysDay.push(allDays);
                    daysDate.push(allDates);
                });
                let tempResDates = new Set(daysDate);
                let tempResDays2 = new Set (daysDay);
                let restDays = Array.from(tempResDays2)
                let dates = Array.from(tempResDates)
                console.log(dates);

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

                let  makeAverage= (p)=> Math.round(p.reduce((a,c)=>a+c)/4);
                let makeAverforAll =(p)=> Math.round(p.reduce((a,c)=>a+c)/8);

                function getDayWeather(p){
                    let  temperatures = datas.filter((e,i)=>{
                        let allDays = new Date(e.dt * 1000).getDate();
                        return (allDays ===dates[p])
                    }).map((e,i)=>{
                        if(new Date(e.dt *1000).getHours() > 6 && new Date(e.dt *1000).getHours()< 18){
                            return  e.main.temp;
                        }
                    }).filter(e=>e);
                    return temperatures;
                }
                function getNightWeather(p){
                    let  temperatures = datas.filter((e,i)=>{
                        let allDays = new Date(e.dt * 1000).getDate();
                        return (allDays === dates[p])
                    }).map((e,i)=>{
                        if(new Date(e.dt *1000).getHours() > 18 || new Date(e.dt *1000).getHours()< 6){
                            return  e.main.temp;
                        }
                    }).filter(e=>e);
                    return temperatures;
                }
                function getHumidity(p){
                    let  humidities = datas.filter((e,i)=>{
                        let allDays = new Date(e.dt * 1000).getDate();
                        return (allDays === dates[p])
                    }).map((e,i)=>e.main.humidity)
                    return humidities;
                }
                function getWindSpeed(p){
                    let  speeds = datas.filter((e,i)=>{
                        let allDays = new Date(e.dt * 1000).getDate();
                        return (allDays === dates[p])
                    }).map((e,i)=> e.wind.speed);
                    return speeds;
                }
                function getTempMax(p){
                    let  temp_max = datas.filter((e,i)=>{
                        let allDays = new Date(e.dt * 1000).getDate();
                        return (allDays === dates[p])
                    }).map((e,i)=> e.main.temp_max);
                    return temp_max;
                }
                function getTempMin (p){
                    let  temp_mins= datas.filter((e,i)=>{
                        let allDays = new Date(e.dt * 1000).getDate();
                        return (allDays === dates[p])
                    }).map((e,i)=> e.main.temp_min);
                    return temp_mins;
                }

                let allDayTemps = [ makeAverage(getDayWeather(1)), makeAverage(getDayWeather(2)),makeAverage(getDayWeather(3)), makeAverage(getDayWeather(4)) ];
                let allNightTemps = [makeAverage(getNightWeather(1)),makeAverage(getNightWeather(2)), makeAverage(getNightWeather(3)),makeAverage(getNightWeather(4))];
                let allHumdities = [makeAverforAll(getHumidity(1)), makeAverforAll(getHumidity(2)), makeAverforAll(getHumidity(3)), makeAverforAll(getHumidity(4))];
                let windSpeeds = [makeAverforAll(getWindSpeed(1)), makeAverforAll(getWindSpeed(2)), makeAverforAll(getWindSpeed(3)), makeAverforAll(getWindSpeed(4))];
                let tempsMax =[Math.ceil(Math.max(...getTempMax(1))), Math.ceil(Math.max(...getTempMax(2))),Math.ceil(Math.max(...getTempMax(3))),Math.ceil(Math.max(...getTempMax(4)))];
                let tempsMin = [Math.floor(Math.min(...getTempMin(1))), Math.floor(Math.min(...getTempMin(2))), Math.floor(Math.min(...getTempMin(3))), Math.floor(Math.min(...getTempMin(4)))]


                for(let i = 1; i < 5 ; i++){
                    temperature[i].innerHTML = allDayTemps[i-1] +'&degC';
                    humidity[i].innerHTML = 'Humidity: ' + allHumdities[i-1] +'%';
                    windSpeed[i].innerHTML =  `Wind speed: ${windSpeeds[i-1]}`;
                    tempMax[i].innerHTML = 'Temp max expected: ' + tempsMax[i-1]  +'&degC';
                    tempMin[i].innerHTML = 'Temp min expected: '+ tempsMin[i-1] +'&degC';
                }



                function getWeatherforToday (cityName){
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=87baafad9a4fb7eed5550969f5ab2bd3`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            if(data.cod === "404"){
                                cityNotFound.style.display = "block"
                            }
                            else{
                                temperature[0].innerHTML = Math.round(data.main.temp) +'&degC';
                                humidity[0].innerHTML = 'Humidity: ' + data.main.humidity +'%';
                                windSpeed[0].innerHTML =  `Wind speed: ${data.wind.speed}`;
                                tempMax[0].innerHTML = 'Temp max expected: ' + Math.round(data.main.temp_max)  +'&degC';
                                tempMin[0].innerHTML = 'Temp min expected: '+ Math.round(data.main.temp_min)  +'&degC';


                                dayTemp.forEach((e,i)=>{
                                    e.addEventListener("click", function (){
                                        temperature[i + 1].innerHTML =allDayTemps[i] +'&degC';
                                    })
                                })
                                nightTemp.forEach((e,i)=>{
                                    e.addEventListener("click", function(){
                                        console.log(allNightTemps[i]);

                                        temperature[i + 1].innerHTML = allNightTemps[i] +'&degC' // TODO night for today
                                    })
                                })

                            }
                        })
                }
                getWeatherforToday(cityName);
                // TODO get correct icons
                icon.forEach((e,i)=>{
                    icon[i].innerHTML =  `<img src="http://openweathermap.org/img/wn/${data.list[i*8].weather[0]['icon']}@2x.png" width="60" height="60">`;
                })

            }

        });
}



