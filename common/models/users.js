module.exports = function(Users) {
    Users.save_deviceToken = function(data, cb) {
        console.log(data.req.body);

        var data2 = data.req.body;
        Users.find({
            where: {"id": data2.userId}
        }, function(err, user) {
            if(!user[0]){
                var error = new Error("Username Exists!");
			    error.status = 400;
			    return cb(error);
            }else {
                
            }

        });
    }

    Users.remoteMethod(
        'save_deviceToken',{
            accepts : {
                arg: 'data',
                type: 'object', 
                http: { source: 'context' } 
            },
            returns : {
                arg : 'message',
                type : 'string',
                root : true
            },
            http : { verb : 'patch'}
        }

    );

};
