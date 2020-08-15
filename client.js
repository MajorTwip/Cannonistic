const connection = new WebSocket('ws://localhost:8088');

connection.onopen = () => {
    console.log('connected');
};

connection.onclose = () => {
    console.error('disconnected');
};

connection.onerror = (error) => {
    console.error('failed to connect', error);
};

connection.onmessage = (event) => {
    console.log('received', event.data);
    let li = document.createElement('li');
    li.innerText = event.data;
    document.querySelector('#chat').append(li);
};

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let message = document.querySelector('#message').value;
    connection.send(name + ":" + message);
    document.querySelector('#message').value = '';
});