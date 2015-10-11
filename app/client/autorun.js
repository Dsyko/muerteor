Tracker.autorun(function(){
	if(!Meteor.userId()){
		FlowRouter.go('/entry');
	}
});