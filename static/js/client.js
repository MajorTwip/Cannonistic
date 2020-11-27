const connection = new WebSocket('ws://' + window.location.hostname + ":" + window.location.port);

let current_health_playerone = 1024;
let current_health_playertwo = 1024;


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
        //let msg = JSON.parse(event.data);
        msg = JSON.parse(event.data);
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
                    alert(msg.message)
                }
                break;
        }


        if (msg.hasOwnProperty("trajectory")) {
            let trace = msg.trajectory.valueOf();
            bullet.bulletPath = trace;
        }

    };

    function manageHealth(msg) {

        let health_playerone = 0;
        let health_playertwo = 0;

        if (msg.hasOwnProperty("guns")) {

            let guns = msg.guns;
            let guncount = 0;

            guns.forEach(gun=>{

                console.log(gun.health);

                if (guncount == 0){

                    health_playerone = gun.health;
                    console.log('gun 0', health_playerone);
                    guncount += 1;
                }
                if (guncount == 1){
                    health_playertwo = gun.health;
                    console.log('gun 1', health_playertwo);

                }

            })


            if (playerone) {
                console.log('turn',myTurn);
                if (myTurn) {
                    adaptLeftHealthIndicator(health_playerone);

                } else {
                    adaptRightHealthIndicator(health_playertwo);
                }
            }

            if (!playerone) {
                if (myTurn) {
                    adaptRightHealthIndicator(health_playerone);
                } else {
                    adaptLeftHealthIndicator(health_playertwo);
                }
            }

        }
    }

    function adaptLeftHealthIndicator(health){
        let health_l = document.getElementById('healthindicator-l');
        let width = Math.round(40*health/1204);
        $("#healthindicator-l").css({'width': width + "vw"});
    }

    function adaptRightHealthIndicator(health){
        let health_r = document.getElementById('healthindicator-r');
        let width = Math.round(40*health/1204);
        let x = 55 + (40-width);
        $("#healthindicator-r").css({'x': x + "vw", 'width': width + "vw"});
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
            $("#txt_pass").removeClass("hidden");
            $("#lbl_txt_pass").removeClass("hidden");
            return;
        }
        if (connection.OPEN) {
            var msg = new Object();
            msg.gameid = $("#txt_gameid").val();
            $.getScript("js/sha256-min.js");
            msg.pass = hex_sha256($("#txt_pass").val());
            msg.type = "establish";
            connection.send(JSON.stringify(msg))
            console.log("requested join game")
        } else {
            alert("WebSocket seems to be offline");
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
            alert("Please wait","set new name/pass")
        } else {
            alert("WebSocket seems to be offline");
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

        function alert(msg,title){
            if(title==undefined){
                title="Alert"
            }
            console.log(title + " : " + msg)
            $("#alerttitle").text(title);
            $("#alerttext").text(msg);
            $("#alertdiv").fadeIn( 300 ).delay( 1500 ).fadeOut( 300 );
        }

})(jQuery)

