const connection = new WebSocket('ws://' + window.location.hostname + ":" + window.location.port);

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
    var msg = JSON.parse(event.data);
    //console.log(msg);
    if(msg.type=="initgame"){
        if($("#txt_gameid").val() == msg.gameid1 || $("#txt_gameid").val() == ""){
            $("#txt_youid").val(msg.gameid1);
            $("#txt_enyid").val(msg.gameid2);
        } else{
            $("#txt_enyid").val(msg.gameid1);
            $("#txt_youid").val(msg.gameid2);
        }
        return;
    }
    if(msg.type=="chat"){
        var ul_chat = $("#chat-history");
        var chatline = document.createElement('li');
        chatline.innerText = msg.sender + ": " + msg.chatmessage;
        $(chatline).attr("data-datetime",msg.datetime)
        ul_chat.append(chatline);

        var items = $('li');
        items.sort(function(a, b){
        return +$(a).data('datetime') - +$(b).data('datetime');
});
    }


};


$('#chatform').submit(function(e){
    e.preventDefault();
    var msg = new Object();
    msg.type = "newchat";
    msg.gameid = $('#txt_youid').val();
    msg.newchatmessage = $('#chat-input').val();
    connection.send(JSON.stringify(msg));
    document.querySelector('#chat-input').value = '';
});

$("#chat-input").keypress(function (event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});


