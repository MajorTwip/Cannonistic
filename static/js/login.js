(function($, conn){

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
    })

})(jQuery, connection)