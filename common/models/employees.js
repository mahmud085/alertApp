var loopback = require('loopback');
var app = loopback();

module.exports = function(Employees) {
Employees.newEntry = function(data,cb){
	console.log("Data = ",data.req.body);

	var username = data.req.body.firstName + data.req.body.lastName;
	var email = data.req.body.email;
	var password = username;
	var secu_num = 123;
	var isFirstTime = true;
	Employees.app.models.users.create({
		username : username,
		email : email,
		password : password,
		secu_num : secu_num,
		isFirstTime : isFirstTime
	},function(err,res){
		if(err) { 
			console.log("Error creating users!");
			cb(null,"Error creating user! Username or email is already taken!");
		}else {
			console.log("user created = ",res);
			//cb(null,"Successfully");
		}
	});

	Employees.create({
		firstName : data.req.body.firstName,
		lastName : data.req.body.lastName,
		email : data.req.body.email
	},function(err,res){
		if(err) console.log(err);
		else {
			console.log("Employees Created Successfully!");
		}
	});



	var html ="Hello "+data.req.body.firstName+"<br><br>Welcome to our alert app!<br><br>Your username and password are given below <br><br>"+
	"Username : "+username + "<br>Password : "+password+"<br><br>Please Change your username and password from the app.<br><br>Thank You!" 
	"<br>Password" ; 
	loopback.Email.send({
	    to: email,
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
	    console.log("Successfully sent email to "+email);
	});

cb(null,"Successfully Created");

};
Employees.send_email = function(data,cb){
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

};
