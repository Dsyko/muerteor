Tracker.autorun(function(){
	if(!Meteor.userId()){
		FlowRouter.go('/entry');
	}
});

Tracker.autorun(function(){
	if(Meteor.userId()){
		Meteor.subscribe('messages');
	}
});