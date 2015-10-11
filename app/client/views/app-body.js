Template.appHeader.events = {
	'click a[data-action="logout"]': function(event, template){
		event.preventDefault();
		Meteor.logout();
	},
	'click div[data-action="return-home"]': function(event, template){
		event.preventDefault();
		FlowRouter.go('/');
	}
};