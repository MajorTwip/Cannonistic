let me = {};

let you = {};

let index = 0;

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log(minutes);
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    let strTime = hours + ':' + minutes;
    return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0){
    let control = "";
    let date = formatDate(new Date());


    if (who == $('#txt_youid').val()){

        control = '<li tabindex=' + ++index + ' style="width:100%">' +
            '<div class="msj macro">' +
            '<div class="text text-l">' +
            '<p>'+ who + ': ' +  text +'</p>' +
            '<p><small>'+date+'</small></p>' +
            '</div>' +
            '</div>' +
            '</li>';

    }else{
        control = '<li tabindex=' + ++index + ' style="width:100%">' +
            '<div class="msj-rta macro">' +
            '<div class="text text-r">' +
            '<p>'+ who + ': ' +  text +'</p>' +
            '<p><small>'+date+'</small></p>' +
            '</div>' +
            '<div class="avatar" style="padding:0px 0px 0px 10px !important"></div>' +
            '</li>';
    }

    $("ul").append(control);


    $('li').last().addClass('active-li').focus();

    $('.mytext').focus();

}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keyup", function(e){
    if (e.which == 13){
        let text = $(this).val();
        if (text !== ""){
            let msg = new Object();
            msg.type = "newchat";
            msg.gameid = $('#txt_youid').val();
            msg.newchatmessage = text;
            connection.send(JSON.stringify(msg));
            $(this).val('');
        }
    }
});



//-- Clear Chat
resetChat();
