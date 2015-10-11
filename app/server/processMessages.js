var timeoutHandle;
var twilio = Meteor.npmRequire('twilio');

var sendMessage = function(message){
	var user = Users.findOne({_id: message.userId}, {fields: {'profile.name': 1}});
	_.each(message.emails, function(emailAddress){

		Email.send({
			to: emailAddress,
			from: '',
			subject: 'Message from Muertor user ' + user && user.profile && user.profile.name,
			text: message.text,
			html: Handlebars.templates.emailTemplate({message: message.text})
		});
	});

	_.each(message.texts, function(phoneNumber){
		//Send SMS
	});

	_.each(message.calls, function(phoneNumber){
		//Initiate Call
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