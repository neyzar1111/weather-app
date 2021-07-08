export function calculateDates(data) {
    let daysDay = [];
    let daysDate = [];
    data.list.forEach(e => {
        let allDays = new Date(e.dt * 1000).getDay();
        let allDates = new Date(e.dt * 1000).getDate();
        daysDay.push(allDays);
        daysDate.push(allDates);
    });
    let tempResDates = new Set(daysDate);
    let tempResDays2 = new Set(daysDay);
    let restDays = Array.from(tempResDays2)
    let dates = Array.from(tempResDates)
    return {restDays, dates};
}

export let  getWeekDaysboxes = (restDaysParam) => {
    let hs = document.querySelectorAll('.hs');
    let days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(let i = 1; i < 5; i++) {
        hs[i].innerHTML = days[restDaysParam[i]];
    }
    hs[0].innerHTML = 'Today';
}