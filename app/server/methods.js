Meteor.methods({
	resetMessageTimer: function(messageId, clientTime) {
		//console.log('messageId: ', messageId);
		//console.log('clientTime: ', clientTime);
		check(messageId, String);
		check(clientTime, Number);
		if(Meteor.userId()) {
			this.unblock();
			var message = Messages.findOne({_id: messageId}, {fields: {userId: 1, duration: 1}});
			if(message && message.userId === Meteor.userId() && _.isNumber(message.duration) && message.duration > 0){
				Messages.update({_id: messageId}, {$set: {
					lastClientResetTime: clientTime,
					lastServerResetTime: moment().valueOf(),
					messageSent: false,
					sendNextMessageAt: moment().valueOf() + message.duration
				}});
				processMessages();
			}else{
				throw new Meteor.Error(500, "User does not own message");
			}
		}
	}
});