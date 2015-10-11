function routeRequiresLogin(context) {
	if(!Meteor.userId()){
		console.log('User not logeed in!');
	}else{
		console.log('User logged in ;D');
	}
}

function trackRouteEntry(context) {

}

function trackRouteClose(context) {
	//Mixpanel.track("move-from-home", context.queryParams);
}


FlowRouter.route('/', {
	// calls just before the action
	triggersEnter: [trackRouteEntry, routeRequiresLogin],
	action: function() {
		BlazeLayout.render('appBody', { main: "home" });
	},
	// calls when when we decide to move to another route
	// but calls before the next route started
	triggersExit: [trackRouteClose]
});