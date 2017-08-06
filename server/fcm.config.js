var FCM = require('fcm-push');
var serverKey = 'AAAAt-I3664:APA91bHzVvL70h9zBZe56PzDz_6Q9t3CIBa_rGOJVOnHNK3udAIODQJbwna-emjT-S8nG27ejS7VkDviNExHTM03dkmbH5eL-IQpPelY-Kbs6pIHDP96udeDm2tZGO79nNbFux102SGF';
var fcm = new FCM(serverKey);
 
var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
    to: '', 
        
    notification: {
        title: 'Title of your push notification', 
        body: 'Body of your push notification' 
    },
        
    // data: {  //you can send only notification or only data(or include both) 
    //     my_key: 'my value',
    //     my_another_key: 'my another value'
    // }
};

module.exports = function(data) {
    console.log("fcm data: "+ data);
    message.to = data;    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!",err);
            return err;
        } else {
            console.log("Successfully sent with response: ", response);
            return response;
        }
    });
}
