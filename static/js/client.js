const connection = new WebSocket('ws://' + window.location.hostname + ":" + window.location.port);

let health_playerone;
let health_playertwo;

(function ($) {

    //const connection = new WebSocket('ws://' + window.location.hostname + ":" + window.location.port);

    //const connection = new WebSocket();

    connection.onopen = function () {
        //connection.send("connected");
        console.log("connected");
    }

    connection.onclose = function () {
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
        manageTrajectory(msg);
        switch (msg.type) {

            case "initgame":
                console.log('init');

                //gameid is empty, so this is a new game and you are player 1
                if ($("#txt_gameid").val() == "") {
                    $("#txt_youid").val(msg.gameid1);
                    $("#txt_enyid").val(msg.gameid2);
                }
                //gameid corresponds with gameid1, so you are player 1
                else if($("#txt_gameid").val() == msg.gameid1) {
                    $("#txt_youid").val(msg.gameid1);
                    $("#txt_enyid").val(msg.gameid2);
                }

                //else you must be player 2
                else {
                    $("#txt_enyid").val(msg.gameid1);
                    $("#txt_youid").val(msg.gameid2);
                }

                $("#menunewjoin").addClass("hidden");
                $("#menunew").removeClass("hidden");

                manageTurns(msg);
                //manageTrajectory(msg);

                break;

            case "chat":
                if (msg.hasOwnProperty("chatmessage")) {

                    let sender = msg.sender;
                    let chatmessage = msg.chatmessage;
                    insertChat(sender, chatmessage, 0);

                }
                break;

            case "turn":

                manageTurns(msg);
                manageHealth(msg);

                if (msg.hasOwnProperty("lastele")) {
                    let ele = msg.elevation.valueOf();
                    bullet.muzzlePos(ele);
                }
                //manageTrajectory(msg);

                /*
                if (msg.hasOwnProperty("trajectory")) {
                    let trace = msg.trajectory.valueOf();
                    bullet.bulletPath = trace;
                }*/
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


        if (msg.hasOwnProperty("trajectory")) {
            let trace = msg.trajectory.valueOf();
            bullet.bulletPath = trace;
        }

    };

    function manageHealth(msg) {

        if (msg.hasOwnProperty("guns")) {
            let guns = currentgame.guns;
            guns.forEach(gun=>{
                if (gunnr == 0){
                    console.log('gun 0');
                    //health_playerone = msg.guns.;
                }

                if (gunnr == 1){
                    console.log('gun 1');
                    //health_playertwo = health;
                }

            })
            // healthplayer -
            let damage = 8; // Wert muss noch festgelegt werden

            if (playerone) {
                console.log('turn',myTurn);
                if (myTurn) {
                    adaptLeftHealthIndicator(damage);

                } else {
                    adaptRightHealthIndicator(damage);
                }
            }

            if (!playerone) {
                if (myTurn) {
                    adaptRightHealthIndicator(damage);
                } else {
                    adaptLeftHealthIndicator(damage);
                }
            }

        }
    }

    function adaptLeftHealthIndicator(damage){
        let health_l = document.getElementById('healthindicator-l');
        let current_with = getComputedStyle(health_l).width;
        let str = current_with;
        let tmp = str.substring(0, str.length - 2);
        let wi = Math.round(parseFloat(tmp)) * 100 / innerWidth;
        console.log('current-wi-l:', wi, 'innerwidth', innerWidth);
        $("#healthindicator-l").css({'width': wi - damage + "vw"});
    }

    function adaptRightHealthIndicator(damage){
        let health_r = document.getElementById('healthindicator-r');
        let current_x = getComputedStyle(health_r).x;
        let current_w = getComputedStyle(health_r).width;
        let strx = current_x;
        let strw = current_w;
        let tmpx = strx.substring(0, strx.length - 2);
        console.log('tmpx', tmpx);
        let tmpw = strw.substring(0, strw.length - 2);
        let x = Math.round(parseFloat(tmpx)) * 100 / innerWidth;
        let w = Math.round(parseFloat(tmpw)) * 100 / innerWidth;
        console.log('currentx-r:', current_x, 'x-r:', x, 'current-w-r', w, 'innerwidth', innerWidth);
        $("#healthindicator-r").css({'x': x + damage + "vw", 'width': w - damage + "vw"});
    }

    function sendMSG(msg){
        connection.send(msg);
    }

    function manageTurns(msg) {

        currentgame = msg;
        if (msg.hasOwnProperty("state")) {

            if (msg.state == "T1") {
                if ($("#txt_youid").val() == msg.gameid1) {
                    //console.log('state T1', $("#txt_youid").val());
                    setMyTurn(true);
                    handleInput();
                    $("#turnindicator").html("Your turn");

                }
                else {
                    //console.log(' T1, noooo');
                    setMyTurn(false);
                    unbindHandler();
                    $("#turnindicator").html("Enemy's turn");
                }
            }

            else if (msg.state == "T2") {
                if ($("#txt_youid").val() == msg.gameid2) {
                    setMyTurn(true);
                    handleInput();
                    $("#turnindicator").html("Your turn");

                }
                else {
                    //console.log(' T2, noooo');
                    setMyTurn(false);
                    unbindHandler();
                    $("#turnindicator").html("Enemy's turn");

                }
            }
        }
    }

    function manageTrajectory(msg){
        if (msg.hasOwnProperty("trajectory")) {
            let trace = msg.trajectory.valueOf();
            bullet.bulletPath = trace;
        }
    }

    //bind newgame to Button
    $("#btn_newgame").click(function () {
        playerone = true;

        if (connection.OPEN) {
            var msg = new Object();
            msg.gameid = "";
            msg.type = "establish";
            connection.send(JSON.stringify(msg))
            console.log("requested new game")
        } else {
            console.log("WebSocket seems to be offline");
        }
    });

    //bind  to Button
    $("#btn_joingame").click(function () {
        console.log("Joingame selected")
        playerone = false;
        if($("#txt_gameid").val()==""){
            $("#txt_gameid").removeClass("hidden");
            $("#lbl_txt_gameid").removeClass("hidden");
            return;
        }
        if (connection.OPEN) {
            var msg = new Object();
            msg.gameid = $("#txt_gameid").val();
            msg.type = "establish";
            connection.send(JSON.stringify(msg))
            console.log("requested join game")
        } else {
            console.log("WebSocket seems to be offline");
        }
    });

    //bind  to Button
    $("#btn_setnamepass").click(function () {
        if (connection.OPEN) {
            var msg = new Object();
            msg.type = "setupass";
            msg.gameid = $("#txt_youid").val();
            msg.newname = $("#txt_newname").val();
            $.getScript("js/sha256-min.js");
            msg.newpass = hex_sha256($("#txt_newpass").val());
            connection.send(JSON.stringify(msg))
            console.log("set new name/pass")
            $("#menudiv").addClass("hidden");
            $("#canvas").removeClass("hidden");
        } else {
            console.log("WebSocket seems to be offline");
        }
    });

        //bind  to Play Button
        $("#btn_play").click(function () {
                $("#menudiv").hide();
                $("#canvas").show();
                $(".frame").show();
                $("#turn").show();
                $("#health").show();
                if (playerone){
                    $("#power-l").show();
                }else{
                    $("#power-r").show();
                }

                $(".svg").show();

        });
/*
    $('#chatform').submit(function (e) {
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
*/




})(jQuery)