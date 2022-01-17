document.addEventListener('DOMContentLoaded', () => { document
    .getElementById('onlineForm')
    .addEventListener('submit', handleForm );
});

const handleForm = async (event) => {
    event.preventDefault();

    let offlineForm = event.target;
    let formData = new FormData(offlineForm);

    formData.append('time', document.getElementById('time').innerText);
    formData.append('agent', document.getElementById('agent').innerText);
    formData.append('id', localStorage.getItem('pauseId'));

    const formDataToJSON = (formData) => {
        let obj = {};
        for (let key of formData.keys()) {
          obj[key] = formData.get(key);
        }
        return obj;
    }

    const data = await formDataToJSON(formData);

    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let req = new Request(`http://localhost:8080/pause`, {
        headers: header,
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    fetch(req)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setTimeout(() => {
                window.close();
            }, 500);
        })
        .catch(console.warn);
}