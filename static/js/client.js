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
    let msg = JSON.parse(event.data);
    console.log('json', msg);

    switch (msg.type){
        case "initgame":
            if($("#txt_gameid").val() == msg.gameid1 || $("#txt_gameid").val() == ""){
                $("#txt_youid").val(msg.gameid1);
                $("#txt_enyid").val(msg.gameid2);
            } else{
                $("#txt_enyid").val(msg.gameid1);
                $("#txt_youid").val(msg.gameid2);
            }
            return;

        case ("join"):
            console.log('joined');
            break;

        case "chat":
            var ul_chat = $("#chat-history");
            var chatline = document.createElement('li');
            chatline.innerText = msg.sender + ": " + msg.chatmessage;
            $(chatline).attr("data-datetime",msg.datetime)
            ul_chat.append(chatline);

            var items = $('li');
            items.sort(function(a, b){
                return +$(a).data('datetime') - +$(b).data('datetime');
            });
            break;

        case "turn":
            if (msg.hasOwnProperty("nextplayer")){
                setMyTurn = false;
                if (msg.nextplayer == ""){
                    console.log("your turn");
                    setMyTurn(true);
                    handleInput();
                }
            }
            if (msg.hasOwnProperty("trajectory")){
                let trace = msg.trajectory.valueOf();
                bullet.bulletPath = trace;
            }
        break;

        case "error":
            if (msg.hasOwnProperty("message")) {
                if (msg.message == "Not your turn") {
                    console.log("Not your turn");
                    setMyTurn(false);
                    unbindHandler();
                }
            }
            break;
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


