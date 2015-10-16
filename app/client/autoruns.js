//Tracker.autorun(function(){
//	if(!Meteor.userId() || Meteor.loggingIn()){
//		FlowRouter.go('/entry');
//	}
//});

Tracker.autorun(function(){
	if(Meteor.userId()){
		Meteor.subscribe('messages');
	}
});