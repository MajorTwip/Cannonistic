var fs = require('fs');
var jschema = JSON.parse(fs.readFileSync("./doc/WS_schema.json", 'utf8'));


function handlemsg(msg) {
    console.log("Got Msg: " + msg);
    var msgJSON;
    try {
        msgJSON = JSON.parse(msg);
    } catch (e) {
        if (e) {
            return console.warn(e);
        }
    }

    //JSON-Schema-Validator
    var Ajv = require('ajv');
    var ajv = new Ajv();
    var valid = ajv.validate(jschema,msgJSON);
    if (!valid){
        return console.warn(ajv.errors);
    }
    
    console.log("OK: "+ JSON.stringify(msgJSON));
};

module.exports = {
    handlemsg : handlemsg
}