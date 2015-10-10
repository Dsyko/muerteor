function trackRouteEntry(context) {
	// context is the output of `FlowRouter.current()`
	//Mixpanel.track("visit-to-home", context.queryParams);
}

function trackRouteClose(context) {
	//Mixpanel.track("move-from-home", context.queryParams);
}


FlowRouter.route('/', {
	// calls just before the action
	triggersEnter: [trackRouteEntry],
	action: function() {
		BlazeLayout.render('appBody', { main: "home" });
	},
	// calls when when we decide to move to another route
	// but calls before the next route started
	triggersExit: [trackRouteClose]
});