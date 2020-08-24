
const connection = new WebSocket('ws://localhost:8088');

connection.onopen = () => connection.send("connected");

connection.onclose = () => {
    console.error('disconnected');
};

connection.onerror = (error) => {
    console.error('failed to connect', error);
};

connection.onmessage = function (event) {
    console.log('received', event.data);
    let li = document.createElement('li');
    li.innerText = event.data;
    document.querySelector('#chat-history').append(li);
};

/*
connection.onmessage = (event) => {
    console.log('received', event.data);
    let li = document.createElement('li');
    li.innerText = event.data;
    document.querySelector('#chat-history').append(li);
};

*/

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let message = document.querySelector('#chat-input').value;
    connection.send(name + ":" + message);
    document.querySelector('#chat-input').value = '';
});

/*
$("#send").click(sendMessage());

$("#chat-input").keypress(function (event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});




function sendMessage() {
    var message = $("#chat-input").val();
    console.log(message);
    connection.send(name + ":" + message)
    $("#chat-input").val("");
}
*/

/*
(function ($) {
    $(function () {
        alert("jquery-test");
    });
})(jQuery);
*/
