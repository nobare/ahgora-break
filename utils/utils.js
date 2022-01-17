const getCurrentTime = () => {
    const dateOBJ = new Date();
    // Serialize clock time
    const time = {
        hours:dateOBJ.getHours(),
        minutes:dateOBJ.getMinutes(),
    }
    // Prepend a 0 on the hours to make double digits
    if(time.hours < 10){
        time.hours = '0' + time.hours
    }
    // Prepend a 0 on the Minutes to make double digits
    if(time.minutes < 10){
        time.minutes = '0' + time.minutes
    }
    // Format the click time as a string "hh:mm"
    console.log(dateOBJ.getMonth())
    return {
        time: `${ time.hours }:${ time.minutes }`,
        date: `${ dateOBJ.getDate() }/${ dateOBJ.getMonth() + 1 }/${ dateOBJ.getFullYear() }`
    }
}

const updateAgent = () => {
    const agent = document.getElementById('agent');
    chrome.storage.sync.get(['Agente'], (data) => {
        return agent.innerText = data.Agente
    });
}

const closeWindow = () => {
    setTimeout(() => {
        window.close();
    }, 500);
}

const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const currentDay = getCurrentTime();
timeElement.innerText = currentDay.time;
dateElement.innerText = currentDay.date;

setInterval(() => {
    timeElement.innerText = currentDay.time;
}, 1000);


document.getElementById('expediente').addEventListener('click', closeWindow);
document.addEventListener('DOMContentLoaded', updateAgent);