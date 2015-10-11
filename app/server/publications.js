Meteor.publish('messages', function () {
	check(arguments, [Match.Any]);
	//console.log('Publish function called: messages, by userId: ' + this.userId);
	if(this.userId) {
		return Messages.find({userId: this.userId});
	}
});