var FCM = require('fcm-node');
var serverKey = 'AAAATZFYR7c:APA91bEAhNvg-gCk7cwpC9hilaWgGX33MHpbC8hpu1HM_v_5gc11jFFRSYsneOAGk2hPYQRdg0rGi733myVgPopqVS7O-2R_-6taF_gVWSrS2QBlB-KOiO6hw7VJ04aeXVQdzKVNr1ij'
var fcm = new FCM(serverKey);
 
var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
    to: '', 
        
    notification: {
        title: 'Title of your push notification', 
        body: 'Body of your push notification' 
    },
        
    data: {  //you can send only notification or only data(or include both) 
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

var send_fcm = function(data) {
    message.to = data;    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

module.exports = send_fcm;