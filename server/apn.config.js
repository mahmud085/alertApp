var apn = require('apn');
var options = {
    token: {
        key: "",
        keyId: ""
    },
    production: false
};

var apnProvider = new apn.Provider(options);

var note = new apn.Notification();
note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {
    from: "node-apn",
    source: "web",
};
note.body = "Hello, world!";

module.exports = function(data) {
    apnProvider.send(note, deviceToken)
            .then(function(res){
                console.log(res);
            }, function(err) {
                console.log("error: ",err);
            });
    
}