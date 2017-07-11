var FCM = require('fcm-node');
var serverKey = 'AAAAK_If0-E:APA91bESsxMnIYy584T43sm6-o019e6g1tAKnY-CEBNq7eD_FO50MimS3HfEmQswTne6C65a1O928eoAqH34p_J50ck1C2AJGqQ1FNeV5qxLsDALKV6tXS82SDmjfMhf-Pdbf-Wx9N2T'; //put your server key here 
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