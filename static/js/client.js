const connection = new WebSocket('ws://' + window.location.hostname + ":" + window.location.port);

let current_health_playerone = 1024;
let current_health_playertwo = 1024;


(function ($) {

    //popullate gameID from query
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has("gameID")){
            $("#txt_gameid").val(urlParams.get("gameID"));
            $("#txt_gameid").removeClass("hidden");
            $("#lbl_txt_gameid").removeClass("hidden");
            $("#txt_pass").removeClass("hidden");
            $("#lbl_txt_pass").removeClass("hidden");
    }


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
                    console.log("no gameID, must be new game")
                    playerone = true;
                    $("#txt_youid").val(msg.gameid1);
                    $("#txt_enyid").val(msg.gameid2);
                }
                //gameid corresponds with gameid1, so you are player 1
                else if($("#txt_gameid").val() == msg.gameid1) {
                    playerone = true;
                    console.log("gameID = gameid1, you are player one")
                    $("#txt_youid").val(msg.gameid1);
                    $("#txt_enyid").val(msg.gameid2);
                }

                //else you must be player 2
                else {
                    console.log("gameID != gameid1, you are player two")
                    playerone = false;
                    $("#txt_enyid").val(msg.gameid1);
                    $("#txt_youid").val(msg.gameid2);
                }

                $("#menunewjoin").addClass("hidden");
                $("#menunew").removeClass("hidden");

                manageTurns(msg);
                manageHealth(msg);

                if (msg.hasOwnProperty("lastele")) {
                    let ele = msg.elevation.valueOf();
                    bullet.muzzlePos(ele);
                }


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

            guns.forEach(gun=>{

                if (gun.gunnr == 0){

                    health_playerone = gun.health;
                    console.log('gun 0', health_playerone);
                    adaptLeftHealthIndicator(health_playerone);

                }
                if (gun.gunnr == 1){
                    health_playertwo = gun.health;
                    console.log('gun 1', health_playertwo);
                    adaptRightHealthIndicator(health_playertwo);

                }
            })

        }


    }

    function adaptLeftHealthIndicator(health){
        let width = Math.round(40*health/1024);
        $("#healthindicator-l").css({'width': width + "vw"});
    }

    function adaptRightHealthIndicator(health){
        let width = Math.round(40*health/1024);
        let x = 55 + (40-width);
        $("#healthindicator-r").css({'x': x + "vw", 'width': width + "vw"});
    }

    function manageTurns(msg) {

        if (msg.type == "initgame"){
            isexploded = true;
        }

        currentgame = msg;
        if (msg.hasOwnProperty("state")) {

            if (msg.state == "W1" && playerone || msg.state == "W2" && !playerone){

                alert("You win!!!", "Game over");
                $("#turnindicator").html("you have won!!");
                setReloadTimeOut(5000);

            }

            if (msg.state == "W1" && !playerone || msg.state == "W2" && playerone){

                alert("You loose!!!", "Game over");
                $("#turnindicator").html("you have lost!!");
                setReloadTimeOut(5000);
            }

            if (msg.state == "T1") {
                if ($("#txt_youid").val() == msg.gameid1) {
                    //console.log('state T1', $("#txt_youid").val());
                    setMyTurn(true);
                    //handleInput();
                    $("#turnindicator").html("Your turn");

                }
                else {
                    //console.log(' T1, noooo');
                    setMyTurn(false);
                    //unbindHandler();
                    $("#turnindicator").html("Enemy's turn");
                }
            }

            else if (msg.state == "T2") {
                if ($("#txt_youid").val() == msg.gameid2) {
                    setMyTurn(true);
                    //handleInput();
                    $("#turnindicator").html("Your turn");

                }
                else {
                    //console.log(' T2, noooo');
                    setMyTurn(false);
                    //unbindHandler();
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
    
    function copyToClipbioard(txt){
          var $temp = $("<input>");
          $("body").append($temp);
          $temp.val(txt).select();
          document.execCommand("copy");
          $temp.remove();
    }
    
        //bind copygameid to Button
    $("#btn_copygameid").click(function () {
        let port = window.location.port;
        if(port!=""){
            port = ":" + port
        }
        let url = window.location.protocol + "//" + window.location.hostname + port + "?gameID=" + $("#txt_youid").val()
        copyToClipbioard(url)
    });
    
    //bind copygameid to Button
    $("#btn_copyenyid").click(function () {
         let port = window.location.port;
         if(port!=""){
            port = ":" + port
        }
        let url = window.location.protocol + "//" + window.location.hostname + port + "?gameID=" + $("#txt_enyid").val()
        copyToClipbioard(url)
    });

    //bind  to Button
    $("#btn_joingame").click(function () {
        console.log("Joingame selected")
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
            $("#alertdiv").fadeIn( 300 ).delay( 2500 ).fadeOut( 300 );
        }

        function setReloadTimeOut(timeout){
            setTimeout(function () {
                reload();
            }, timeout);
        }

        function reload(){
            location.reload();
        }

})(jQuery)

