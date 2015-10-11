Template.entry.onCreated(function(){
	var template = this;
	template.entryState = new ReactiveVar('chooseLoginOrRegister');

	template.autorun(function(){
		if(Meteor.userId()){
			FlowRouter.go('/');
		}
	});
});

Template.entry.events = {
	'click a[data-action="restart-entry"]': function(event, template){
		event.preventDefault();
		template.entryState.set('chooseLoginOrRegister');
	},
	'click button[data-action="signup"]': function(event, template){
		event.preventDefault();
		template.entryState.set('chooseSignupMethod');
	},
	'click button[data-action="login"]': function(event, template){
		event.preventDefault();
		template.entryState.set('chooseLoginMethod');
	},
	'click button[data-action="signup-with-twitter"]': function(event, template){
		event.preventDefault();
		template.entryState.set('loginTwitter');
	},
	'click button[data-action="signup-with-email"]': function(event, template){
		event.preventDefault();
		template.entryState.set('signUpEmail');
	},
	'click button[data-action="login-with-twitter"]': function(event, template){
		event.preventDefault();
		template.entryState.set('loginTwitter');
	},
	'click button[data-action="login-with-email"]': function(event, template){
		event.preventDefault();
		template.entryState.set('loginEmail');
	},
	'click button[data-action="launch-twitter-login"]': function(event, template){
		event.preventDefault();
		Meteor.loginWithTwitter({loginStyle: 'redirect'});
	}
};