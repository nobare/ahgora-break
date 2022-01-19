document.addEventListener('DOMContentLoaded', () => { document
    .getElementById('onlineForm')
    .addEventListener('submit', handleForm );
});

const handleForm = (event) => {
    event.preventDefault();

    let offlineForm = event.target;
    let formData = new FormData(offlineForm);

    formData.append('time', document.getElementById('time').innerText);
    formData.append('id', localStorage.getItem('pauseId'));

    const formDataToJSON = (formData) => {
        let obj = {};
        for (let key of formData.keys()) {
          obj[key] = formData.get(key);
        }
        return obj;
    }

    const pause = formDataToJSON(formData);

    fetch(`https://ahgora-api.herokuapp.com/pause/${pause.id}`, {
        method: 'PATCH',
        body: JSON.stringify(pause),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        window.close();
    })
    .catch(console.warn);
}