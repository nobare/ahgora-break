document.addEventListener('DOMContentLoaded', () => { document
    .getElementById('onlineForm')
    .addEventListener('submit', handleForm );
});

const handleForm = (event) => {
    event.preventDefault();

    let offlineForm = event.target;
    let formData = new FormData(offlineForm);

    const getId = () => {
        const pauseId = localStorage.getItem('pauseId')
        document.getElementById('time').innerText = pauseId; 
        return pauseId;
    };

    formData.append('time', document.getElementById('time').innerText);
    formData.append('agent', document.getElementById('agent').innerText);
    formData.append('id', getId());

    for (let key of formData.keys()) {
        console.log(key, formData.get(key));
    }

    let url = 'http://localhost:3000/pause:id';
    let req = new Request(url, {
        method: 'PUT',
        body: formData
    })

    fetch(req)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.warn);
}