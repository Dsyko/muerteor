var timeoutHandle;
var twilio = Meteor.npmRequire('twilio');
var twilioClient = twilio(Meteor.settings.twilio.account, Meteor.settings.twilio.token);
var Fiber = Meteor.npmRequire('fibers');


var sendMessage = function(message){
	var user = Users.findOne({_id: message.userId}, {fields: {'profile.name': 1}});
	_.each(message.emails, function(emailAddress){

		Email.send({
			to: emailAddress,
			from: 'david@muerteor.com',
			subject: 'Message from Muertor user ' + user && user.profile && user.profile.name,
			text: message.text,
			html: Handlebars.templates.emailTemplate({message: message.text})
		});
	});

	_.each(message.texts, function(phoneNumber){
		//Send SMS
		twilioClient.sendMessage({

			to:'+1' + phoneNumber, // Any number Twilio can deliver to
			from: TWILIO_PHONE_NUMBER, // A number you bought from Twilio and can use for outbound communication
			body: message.text // body of the SMS message

		}, function(err, responseData) { //this function is executed when a response is received from Twilio

			if (!err) { // "err" is an error received during the request, if any

				// "responseData" is a JavaScript object containing data received from Twilio.
				// A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
				// http://www.twilio.com/docs/api/rest/sending-sms#example-1
				console.log(responseData.from); // outputs "+14506667788"
				console.log(responseData.body); // outputs "word to your mother."
			}
		});

	});

	_.each(message.calls, function(phoneNumber){
		//Initiate Call
		client.makeCall({

			to:'+1' + phoneNumber, // Any number Twilio can call
			from: TWILIO_PHONE_NUMBER, // A number you bought from Twilio and can use for outbound communication
			url: Meteor.absoluteUrl('_twiml/' + message._id) // A URL that produces an XML document (TwiML) which contains instructions for the call

		}, function(err, responseData) {

			//executed when the call has been initiated.
			console.log(responseData.from); // outputs "+14506667788"

		});
	});
	Messages.update({_id: message._id}, {$set: {messageSent: true, lastMessageSentAt: moment().valueOf()}});
};

processMessages = function(){
	Meteor.clearTimeout(timeoutHandle);
	var reRunProcessAfter = 60000; //Lets just be safe and re-run every 60 seconds...
	var nextMessageToProcess = Messages.findOne({messageSent: false, sendNextMessageAt: {$gt: moment().valueOf()}}, {sort:{sendNextMessageAt: -1 }});
	if(nextMessageToProcess){
		reRunProcessAfter = nextMessageToProcess.sendNextMessageAt - moment().valueOf() + 200;
	}
	console.log('re-running processMessages in: ', reRunProcessAfter);

	//Process all old messages
	Messages.find({messageSent: false, sendNextMessageAt: {$lte: moment().valueOf()}}).forEach(sendMessage);
	//Setup call for future messages
	timeoutHandle = Meteor.setTimeout(processMessages, reRunProcessAfter);

};

Meteor.startup(function () {
	processMessages();
});



//We need some server side routing so we can process requests from twilio (for TWIML files to send voice)



// Listen to incoming API http requests
WebApp.connectHandlers.use(function(request, result, next) {
	// Need to create a Fiber since we're using synchronous http calls and nothing
	// else is wrapping this in a fiber automatically
	Fiber(function () {
		try {
			if(!request || !request.url){
				next();
				return;
			}
			var splitPath = request.url.split('/');
			if (splitPath[1] !== '_twiml'){
				//Not an Twiml request, return null and the middleware handler will pass request processing to next connectHandler
				next();
				return;
			}else{
				if(request.method === 'POST') {

				}
				var messageId = splitPath[2];
				var message = Messages.findOne({_id: messageId}, {fields: {text: 1}});
				if(message && _.isString(message.text)){
					var twiml = new twilio.TwimlResponse();
					twiml.say(message.text);
					result.writeHead(200, {'Content-Type': 'text/xml'});
					result.end(twiml.toString());
					return;
				}
			}
			next();
			return;
		}catch(err){
			console.log("Error in middleware: " + JSON.stringify(err));
		}
	}).run();
});