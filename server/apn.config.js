var apn = require('apn');

var tokens = ["9f6970f2152cd385789261f4904f2aa437b132edbebb00edb56d9404adb861af"];

var service = new apn.Provider({
    cert: "certificates/cert.pem",
    key: "certificates/key.pem",
});

var note = new apn.Notification({
	alert:  "Breaking News: I just sent my first Push Notification",
});

module.export = function() {
    service.send(note, tokens).then( result => {
        console.log("sent:", result.sent.length);
        console.log("failed:", result.failed.length);
        console.log(result.failed);
    });
}

// For one-shot notification tasks you may wish to shutdown the connection
// after everything is sent, but only call shutdown if you need your 
// application to terminate.
service.shutdown();