
/*(function($, conn){

    //bind newgame to Button
    $("#btn_newgame").click(function(){
        if(conn.OPEN){
            var msg = new Object();
            msg.gameid="";
            msg.type="establish";
            conn.send(JSON.stringify(msg))
            console.log("requested new game")
        }else{
            console.log("WebSocket seems to be offline");
        }        
    });

    //bind joingame to Button
    $("#btn_joingame").click(function(){
        if(conn.OPEN){
            var msg = new Object();
            msg.gameid=$("#txt_gameid").val();
            msg.type="establish";
            conn.send(JSON.stringify(msg))
            console.log("requested join game")
        }else{
            console.log("WebSocket seems to be offline");
        }        
    });

    //bind joingame to Button
    $("#btn_setnamepass").click(function(){
        if(conn.OPEN){
            var msg = new Object();
            msg.type="setupass";
            msg.gameid=$("#txt_youid").val();
            msg.newname=$("#txt_newname").val();
            $.getScript("js/sha256-min.js");
            msg.newpass=hex_sha256($("#txt_newpass").val());
            conn.send(JSON.stringify(msg))
            console.log("set new name/pass")
        }else{
            console.log("WebSocket seems to be offline");
        }        
    });
    

})(jQuery, connection)*/