document.addEventListener('DOMContentLoaded', () => { document
    .getElementById('offlineForm')
    .addEventListener('submit', handleForm );
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

    formData.append('time', document.getElementById('time').innerText);
    formData.append('agent', document.getElementById('agent').innerText);
    formData.append('id', genId());

    for (let key of formData.keys()) {
        console.log(key, formData.get(key));
    }

    let url = 'http://localhost:3000/';
    let req = new Request(url, {
        method: 'POST',
        body: formData
    })

    fetch(req)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch(console.warn);
}