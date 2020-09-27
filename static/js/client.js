const connection = new WebSocket('ws://' + window.location.hostname);

//const connection = new WebSocket();

connection.onopen = function(){
    //connection.send("connected");
    console.log("connected");
}

connection.onclose = function(){
    console.error('disconnected');
    console.log("disconnected");
};

connection.onerror = (error) => {
    console.error('failed to connect', error);
};

connection.onmessage = function (event) {
    console.log('received', event.data);
    let li = document.createElement('li');
    li.innerText = event.data;
    document.querySelector('#chat-history').append(li);

    var msg = JSON.parse(event.data);
    console.log(msg);
    if(msg.type=="initgame"){
        if($("#txt_gameid").val() == msg.gameid1 || $("#txt_gameid").val() == ""){
            $("#txt_youid").val(msg.gameid1);
            $("#txt_enyid").val(msg.gameid2);
        } else{
            $("#txt_enyid").val(msg.gameid2);
            $("#txt_youid").val(msg.gameid1);
        }
    }
};

/*
connection.onmessage = (event) => {
    console.log('received', event.data);
    let li = document.createElement('li');
    li.innerText = event.data;
    document.querySelector('#chat-history').append(li);
};

*/

$('#chatform').submit(function(e){
    e.preventDefault();
    var msg = new Object();
    msg.type = "newchat";
    console.log($("#gameid").val());
    msg.gameid = $('#gameid').val();
    msg.newchatmessage = $('#chat-input').val();
    connection.send(JSON.stringify(msg));
    document.querySelector('#chat-input').value = '';
});


$("#send").click(sendMessage());

$("#chat-input").keypress(function (event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});



/*
function sendMessage() {
    var message = $("#chat-input").val();
    console.log(message);
    connection.send(name + ":" + message)
    $("#chat-input").val("");
}
*/


(function ($) {
    $(function () {
        alert("jquery-test");
    });
})(jQuery);

