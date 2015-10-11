Template.appHeader.events = {
	'click a[data-action="logout"]': function(event, template){
		event.preventDefault();
		Meteor.logout();
	}
};