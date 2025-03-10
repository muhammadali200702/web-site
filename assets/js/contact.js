const APIContact = "https://api.39ortomekteb.info/api/contact";
const APIContactCreate = "https://api.39ortomekteb.info/api/contact/create";

let nameInput = document.querySelector('#name');
let messageInput = document.querySelector('#message');
let btn = document.querySelector('#send');
let ul = document.querySelector('.contact_message_wrapper');

function displayMessage(item) {
    const li = document.createElement('li');
    li.classList.add('contact_message');
    li.innerHTML = `
        <div class="contact_hr_wrapper">
            <hr>
            <div class="contact_messages_wrappers">
                <h3 class="contact_message_title">${item.name}</h3>
                <p class="contact_message_subtitle">${item.message}</p>
            </div>
        </div>
    `;
    ul.appendChild(li);
}


fetch(APIContact)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки сообщений');
        }
        return response.json();
    })
    .then((data) => {
        data = data.data;
        if (Array.isArray(data)) {
            data.forEach(displayMessage);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Произошла ошибка при загрузке сообщений.");
    });

btn.addEventListener('click', (event) => {
    event.preventDefault(); 

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert("Заполните все поля!");
        return; 
    }

    fetch(APIContactCreate, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка отправки данных');
        }
        return response.json();
    })
    .then(data => {
        displayMessage(data);
        nameInput.value = ''; 
        messageInput.value = '';
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Произошла ошибка при отправке данных.");
    });
});
