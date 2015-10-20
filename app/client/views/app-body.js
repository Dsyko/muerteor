
Template.appHeader.helpers({
	connectionLost: function(){
		return !Meteor.status().connected;
	},
	connectionAutoRetryFailed: function(){
		return (!Meteor.status().connected && (Meteor.status().retryCount > 5 || Meteor.status().status === "failed"));
	},
	skullClasses: function(){
		//console.log('skull classes run');
		var classes = "";
		if(!Meteor.status().connected && Meteor.completedStartup){
			classes += ' skull-close-jaw';
			if(Meteor.status().retryCount > 5 || Meteor.status().status === "failed"){
				classes += ' skull-red-outline';
			}
		}else{
			classes += ' skull-laugh-slow';
		}
		return classes;
	},
	bodyClasses: function(){
		if(!Meteor.isCordova){
			$('body').addClass('show-iphone-wrapper');
		}
	}
});

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