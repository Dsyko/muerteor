var reRunComputationAfterTime = function(recalculateIn){
	if(Tracker.active){
		var computation = Tracker.currentComputation;
		var timer = setTimeout(function(){
			//console.log("Invalidating computation");
			computation.invalidate();
		}, recalculateIn);
		computation.onInvalidate(function(){ //Cleanup timer on invalidation, or if computation is destroyed
			clearTimeout(timer);
		});
	}
};

Template.home.helpers({
	showWelcomeMessage: function(){
		var user = Users.findOne({_id: Meteor.userId()}, {fields: {'profile.hideWelcomeMessage': 1}});
		console.log('showWelcomeMessage: ', !(user && user.profile && user.profile.hideWelcomeMessage === true));
		return !(user && user.profile && user.profile.hideWelcomeMessage === true);
	},
	messages: function(){
		return Messages.find({userId: Meteor.userId()}, {sort: {name: -1}});
	},
	name: function(){
		var message = this;
		return message.name || 'No Name';
	},
	timeLeft: function(){
		reRunComputationAfterTime(1000);
		var message = this;
		var timeTillExpire =  (message.lastClientResetTime + message.duration) - moment().valueOf();
		if(timeTillExpire <= 0 || _.isNaN(timeTillExpire)){
			return 'Expired!';
		}
		var hours = Math.floor(timeTillExpire/ 3600000);
		timeTillExpire = timeTillExpire - (hours * 3600000);
		var minutes = Math.floor(timeTillExpire/ 60000);
		timeTillExpire = timeTillExpire - (minutes * 60000);
		var seconds = Math.floor(timeTillExpire/ 1000);
		if(hours < 10){
			hours = '0' + hours;
		}
		if(minutes < 10){
			minutes = '0' + minutes;
		}
		if(seconds < 10){
			seconds = '0' + seconds;
		}
		return '' + hours +':' + minutes + ':' + seconds;
	}
});


Template.home.events = {
	'click button[data-action="hide-welcome-message"]': function(event, template){
		event.preventDefault();
		Users.update({_id: Meteor.userId()}, {$set: {'profile.hideWelcomeMessage': true}});
	},
	'click button[data-action="new-message"]': function(event, template){
		var messageId = Messages.insert({
			userId: Meteor.userId()
		});
		FlowRouter.go('/new-message/' + messageId);
	},
	'click button[data-action="reset-message-timer"]': function(event, template){
		var message = this;
		Meteor.call('resetMessageTimer', message._id, moment().valueOf());
	},
	'click button[data-action="edit-message"]': function(event, template){
		var message = this;
		FlowRouter.go('/new-message/' +  message._id);
	},
	'click button[data-action="delete-message"]': function(event, template){
		var message = this;
		bootbox.dialog({
			message: "Are you sure you want to delete this message?",
			//title: "Delete Message",
			buttons: {
				success: {
					label: "Cancel",
					className: "btn-default btn-small",
					callback: function() {

					}
				},
				danger: {
					label: "Delete",
					className: "btn-danger btn-small",
					callback: function() {
						Messages.remove({_id: message._id});
					}
				}
			}
		});
	}
};
