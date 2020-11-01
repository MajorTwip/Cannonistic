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
            console.log('init');
            //if($("#txt_gameid").val() == msg.gameid1 || $("#txt_gameid").val() == ""){
            if($("#txt_gameid").val() == ""){
                $("#txt_youid").val(msg.gameid1);
                $("#txt_enyid").val(msg.gameid2);
            } else{
                $("#txt_enyid").val(msg.gameid1);
                $("#txt_youid").val(msg.gameid2);
            }

            manageTurns(msg);

            return;

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

            manageTurns(msg);

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



    if (msg.hasOwnProperty("trajectory")){
        let trace = msg.trajectory.valueOf();
        bullet.bulletPath = trace;
    }

};


function manageTurns(msg){
    if (msg.hasOwnProperty("state")){

        if (msg.state == "T1") {
            if ($("#txt_youid").val() == msg.gameid1){
                //console.log('state T1', $("#txt_youid").val());
                setMyTurn(true);
                handleInput();
                playerone = true;
            }
            else{
                //console.log(' T1, noooo');
                setMyTurn(false);
                unbindHandler();
                playerone = false;
            }
        }

        else if (msg.state == "T2"){
            if ($("#txt_youid").val() == msg.gameid2){
                setMyTurn(true);
                handleInput();
                playertwo = true;
            }
            else {
                //console.log(' T2, noooo');
                setMyTurn(false);
                unbindHandler();
                playertwo = false;
            }
        }
    }


}

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


