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
    return time.hours + ':' + time.minutes
}

const timeElement = document.getElementById('time');
const time = getCurrentTime();
timeElement.innerText = time; 

setInterval(() => {
    const time = getCurrentTime();
    timeElement.innerText = time;
}, 1000);

const updateAgent = () => {
    const agent = document.getElementById('agent');
    chrome.storage.sync.get(['Agente'], (data) => {
        return agent.innerText = data.Agente
  });
}

document.addEventListener('DOMContentLoaded', updateAgent);