const fcm = require('../../server/fcm.config');
var loopback = require('loopback');
var app = loopback();

module.exports = function(Employees) {
Employees.newEntry = function(data,cb){
	console.log("Data = ",data.req.body);

	var data2 = {};
	data2.firstName = data.req.body.firstName;
	data2.lastName = data.req.body.lastName;
	data2.email = data.req.body.email;
	data2.username = data.req.body.firstName + data.req.body.lastName;
	data2.password = data2.username;
	data2.secu_num = 00;
	data2.isFirstTime = true;
	data2.type = data.req.body.type ;
	data2.organizationId = data.req.body.organizationId;
	Employees.app.models.users.find({
		where : {
			or : [
				{"username" : data2.username},
				{"email" : data2.email}
			]
		}
	},function(error,user){
		if(!user[0]){
			createUser(data2,cb);
		}
		else if(user[0].username === data2.username)
		{
			var error = new Error("Username Exists!");
			error.status = 400;
			return cb(error);
		}
		else if(user[0].email === data2.email)
		{
			var error = new Error("Email Exists!");
			error.status = 400;
			return cb(error);
		}
		
	});

};
var createUser = function(data2,cb){
	Employees.create({
		firstName : data2.firstName,
		lastName : data2.lastName,
		email : data2.email,
		organizationId : data2.organizationId
	},function(err,res){
		if(err) {
			console.log(err);
			cb(null,"Error creating employees");
		}
		else {
			console.log("Employees Created Successfully!",res);
			Employees.app.models.users.create({
				username : data2.username,
				email : data2.email,
				password : data2.password,
				secu_num : data2.secu_num,
				isFirstTime : data2.isFirstTime,
				type : data2.type,
				employeeId : res.id
			},function(err,res){
				if(err) { 
					console.log("Error creating users! ",err);
					cb(null,"Error creating user! Username or email is already taken!");
				}else {
					console.log("user created = ",res);
					//cb(null,"Successfully");
				}
			});
		}
	});

	var html =
	"Hello "+data2.firstName+",<br><br>Welcome to our alert app!<br><br>"+
	"Your username and password are given below <br><br>"+
	"Username : "+data2.username + 
	"<br>Password : "+data2.password+
	"<br><br>And please also note that your default security number is 0"
	"<br>Please Change your security number after you login to the app.<br><br>Thank You!"; 
	
	loopback.Email.send({
	    to: data2.email,
	    from: {email :'alertapp12@gmail.com',name : "Police Alert"},
	    subject: "Welcome to our apps",
	    text: "text message",
	    html: html
	},
	function(err, result) {
	    if(err) {
	        console.log('Upppss something crash', err);
	        cb(null,"Email sending failed!");
	    }
	    console.log("Successfully sent email to "+data2.email);
	   	 cb(null,"Successfully Created");
	});
}
Employees.send_email = function(data,cb){
	console.log("DAta ",data.req.body);
	var html = data.req.body.content ;
	var email = data.req.body.email; 
	loopback.Email.send({
	    to: email,
	    from: {email :'alertapp12@gmail.com',name : "Police Alert"},
	    subject: "subject",
	    text: "text message",
	    html: html
	},
	function(err, result) {
	    if(err) {
	        console.log('Upppss something crash', err);
	        cb(null,"Email sending failed!");
	    }
	    console.log("Successfully sent email to "+email);
	    cb(null,"Email sent Successfully");
	});
};
Employees.deleteEntry = function(data,cb){
	console.log("DAta ",data.req.body);
	var employeeId = data.req.body.employeeId;
	Employees.remove({ id: employeeId}, function (err, removed) {
        if (err)
            cb(err)
        else
            console.log("removed employee",removed);
    }); 
   	Employees.app.models.users.remove({ employeeId: employeeId}, function (err, removed) {
        if (err)
            cb(err)
        else
            console.log("removed user",removed);
    });
    cb(null,"all deleteEntry successfull");
};
Employees.send_notifcation = function(data, cb) {
	console.log('data: ', data.req.body);
	var deviceId = data.req.body.deviceId;
	fcm.send_fcm(deviceId);
}
Employees.remoteMethod(
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
Employees.remoteMethod(
	'deleteEntry',{
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
Employees.remoteMethod(
	'send_email',{
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

Employees.remoteMethod(
	'send_notification', {
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
)

};
