Template.home.helpers({
	showWelcomeMessage: function(){
		var user = Users.findOne({_id: Meteor.userId()}, {fields: {'profile.hideWelcomeMessage': 1}});
		console.log('showWelcomeMessage: ', !(user && user.profile && user.profile.hideWelcomeMessage === true));
		return !(user && user.profile && user.profile.hideWelcomeMessage === true);
	},
	messages: function(){
		return Messages.find({userId: Meteor.userId()}, {sort: {expiration: -1}});
	}
});


Template.home.events = {
	'click button[data-action="hide-welcome-message"]': function(event, template){
		event.preventDefault();
		Users.update({_id: Meteor.userId()}, {$set: {'profile.hideWelcomeMessage': true}});
	},
	'click button[data-action="new-message"]': function(event, template){
		var messageId = Messages.insert({
			userId: Meteor.userId()
		});
		FlowRouter.go('/new-message/' + messageId);
	}
};
