document.addEventListener('DOMContentLoaded', () => { document
    .getElementById('offlineForm')
    .addEventListener('submit', handleForm);
});

const handleForm = (event) => {
    event.preventDefault();

    let offlineForm = event.target;
    let formData = new FormData(offlineForm);

    const genId = () => {
        const id = Math.random().toString(36).slice(2)
        localStorage.setItem('pauseId', id)
        return id;
    };

    const selected = document.getElementById('reason');
    formData.append('time', document.getElementById('time').innerText);
    formData.append('agent', document.getElementById('agent').innerText);
    formData.append('reason', selected.options[selected.selectedIndex].text);
    formData.append('date', document.getElementById('date').innerText);
    formData.append('id', genId());

    const formDataToJSON = (formData) => {
        let obj = {};
        for (let key of formData.keys()) {
          obj[key] = formData.get(key);
        }
        return obj;
    }

    const pause = formDataToJSON(formData);
    
    fetch('https://ahgora-api.herokuapp.com/pause', {
        method: 'POST',
        body: JSON.stringify(pause),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.close();
    })
    .catch(console.warn); 
}