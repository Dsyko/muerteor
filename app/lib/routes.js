function routeRequiresLogin(context) {
	//if(!Meteor.userId()){
	//	//console.log('User not logged in! Redirecting');
	//	FlowRouter.go('/entry');
	//}else{
	//	//console.log('User logged in ;D');
	//}
}

function trackRouteEntry(context) {

}

function trackRouteClose(context) {
	//Mixpanel.track("move-from-home", context.queryParams);
}


//FlowRouter.route('/entry', {
//	// calls just before the action
//	triggersEnter: [trackRouteEntry],
//	action: function() {
//		//console.log('entry route action!');
//		BlazeLayout.render('appBody', { main: "entry" });
//	},
//	// calls when when we decide to move to another route
//	// but calls before the next route started
//	triggersExit: [trackRouteClose]
//});

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

FlowRouter.route('/new-message/:messageId', {
	// calls just before the action
	triggersEnter: [trackRouteEntry, routeRequiresLogin],
	action: function(params) {
		BlazeLayout.render('appBody', { main: "newMessage" });
	},
	// calls when when we decide to move to another route
	// but calls before the next route started
	triggersExit: [trackRouteClose]
});