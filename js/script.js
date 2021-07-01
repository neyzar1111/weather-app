

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
                let daysDay = [];
                let daysDate = [];
                datas.map((e,i)=>{
                    let allDays = new Date(e.dt * 1000).getDay();
                    let allDates = new Date(e.dt * 1000).getDate();
                    daysDay.push(allDays);
                    daysDate.push(allDates);
                })
                let tempResDates = new Set(daysDate);
                let tempResDays2 = new Set (daysDay);
                let restDays = Array.from(tempResDays2)
                let dates = Array.from(tempResDates)
                console.log(restDays);
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


                let today = new Date().getDate();
                console.log(today);

                let day0Temp = [];
                let day0WindSpeed = [];
                let day0TempMax = [];
                let day0TempMin = [];
                let day0Humidity = [];

                let day1Temp = [];
                let day1WindSpeed = [];
                let day1TempMax = [];
                let day1TempMin = [];
                let day1Humidity = [];

                let day2Temp = [];
                let day2WindSpeed = [];
                let day2TempMax = [];
                let day2TempMin = [];
                let day2Humidity = [];

                let day3Temp = [];
                let day3WindSpeed = [];
                let day3TempMax = [];
                let day3TempMin = [];
                let day3Humidity = [];

                let day4Temp = [];
                let day4WindSpeed = [];
                let day4TempMax = [];
                let day4TempMin = [];
                let day4Humidity = [];

                console.log(day0WindSpeed)
                let average = (arr)=>{
                    return arr.reduce((a,b)=> a+b,0)/arr.length;
                }
                console.log(data.list[8].wind.speed)
                console.log(restDays);
                let restDaysAll = datas.map((e,i)=>{
                    let allDays = new Date(e.dt * 1000).getDate();
                    if(allDays ===dates[0]){
                        day0Temp.push(e.main.temp);
                        day0WindSpeed.push(e.wind.speed);
                        day0TempMax.push(e.main.temp_max);
                        day0TempMin.push(e.main.temp_min);
                        day0Humidity.push(e.main.humidity);
                    }
                    if( allDays === dates[1]){
                        day1Temp.push(e.main.temp);
                        day1WindSpeed.push(e.wind.speed);
                        day1TempMax.push(e.main.temp_max);
                        day1TempMin.push(e.main.temp_min);
                        day1Humidity.push(e.main.humidity);
                    } else if(allDays === dates[2]){
                        day2Temp.push(e.main.temp);
                        day2Humidity.push(e.main.humidity);
                        day2WindSpeed.push(e.speed);
                        day2TempMax.push(e.main.temp_max);
                        day2TempMin.push(e.main.temp_min);
                    }else if(allDays === dates[3]){
                        day3Temp.push(e.main.temp);
                        day3WindSpeed.push(e.wind.speed);
                        day3Humidity.push(e.main.humidity);
                        day3TempMax.push(e.main.temp_max);
                        day3TempMin.push(e.main.temp_min);
                    }else if(allDays === dates[4]){
                        day4Temp.push(e.main.temp);
                        day4WindSpeed.push(e.wind.speed);
                        day4Humidity.push(e.main.humidity);
                        day4TempMax.push(e.main.temp_max);
                        day4TempMin.push(e.main.temp_min);
                    }
                })

                temperature[0].innerHTML = Math.round(average(day0Temp)) +'&degC';
                humidity[0].innerHTML = 'Humidity: ' + Math.round(average(day0Humidity)) +'%';
                windSpeed[0].innerHTML =  `Wind speed: ${Math.round(average(day0WindSpeed))}`;
                tempMax[0].innerHTML = 'Temp max expected: ' + Math.ceil(Math.max(...day0TempMin))  +'&degC';
                tempMin[0].innerHTML = 'Temp min expected:'+ Math.floor(Math.min(...day0TempMin))  +'&degC';

                temperature[1].innerHTML = Math.round(average(day1Temp)) + '&degC';
                humidity[1].innerHTML = 'Humidity: ' + Math.round(average(day1Humidity));
                windSpeed[1].innerHTM = 'Wind speed ' + Math.round(average(day1WindSpeed));
                tempMax[1].innerHTML = 'Temp max: ' + Math.ceil(Math.max(...day1TempMin))  +'&degC';
                tempMin[1].innerHTML = 'Temp min:'+ Math.floor(Math.min(...day1TempMin))  +'&degC';

                temperature[2].innerHTML = Math.round(average(day2Temp)) +'&degC';
                humidity[2].innerHTML = 'Humidity: '  + Math.round(average(day2Humidity)) +'%';
                windSpeed[2].innerHTM = 'Wind speed ' + Math.round(average(day2WindSpeed));
                tempMax[2].innerHTML = 'Temp max: ' + Math.ceil(Math.max(...day2TempMin))  +'&degC';
                tempMin[2].innerHTML = 'Temp min:'+ Math.floor(Math.min(...day2TempMin))  +'&degC';

                temperature[3].innerHTML = Math.round(average(day3Temp)) +'&degC';
                humidity[3].innerHTML = 'Humidity: ' +  Math.round(average(day3Humidity)) +'%';
                windSpeed[3].innerHTM = 'Wind speed '+  Math.round(average(day3WindSpeed));
                tempMax[3].innerHTML = 'Temp max: ' +  Math.ceil(Math.max(...day3TempMin))  +'&degC';
                tempMin[3].innerHTML = 'Temp min:'+ Math.floor(Math.min(...day3TempMin))  +'&degC';

                temperature[4].innerHTML = Math.round(average(day4Temp)) +'&degC';
                humidity[4].innerHTML = 'Humidity: '  + Math.round(average(day4Humidity)) +'%';
                windSpeed[4].innerHTML = 'Wind speed ' + Math.round(average(day4WindSpeed));
                tempMax[4].innerHTML = 'Temp max: ' + Math.ceil(Math.max(...day4TempMin))  +'&degC';
                tempMin[4].innerHTML = 'Temp min:'+ Math.floor(Math.min(...day4TempMin))  +'&degC';


                icon.forEach((e,i)=>{
                    icon[i].innerHTML =  `<img src="http://openweathermap.org/img/wn/${data.list[i*8].weather[0]['icon']}@2x.png" width="60" height="60">`;
                })

            }

        });
}



