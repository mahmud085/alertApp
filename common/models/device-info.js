'use strict';

module.exports = function(Deviceinfo) {

    Deviceinfo.newEntry = function(data, cb) {
        let deviceInfo = data.req.body;
        Deviceinfo.find({
            where : {
                "deviceToken": deviceInfo.deviceToken
            }
        }, function(err, res){
            if(err){
                console.log(err);
                cb(null, {"Error": err});
            }else {
                if (!res[0]) createDeviceInfo(deviceInfo, cb);
                else {
                    console.log("this device already exist");
                    cb(null, "Device Exist")
                }
            }

        });
    }

    var createDeviceInfo = function(data, cb) {
        Deviceinfo.create(data, function(err, res) {
            if (err) {
                console.log(err);
                cb(null, {"Error": err});
            }else {
                console.log(res);
                cb(null, {"Success": res});
            }
        })
    }

    Deviceinfo.remoteMethod(
        'newEntry',{
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
            http : { verb : 'post'}
        }

    );
};
