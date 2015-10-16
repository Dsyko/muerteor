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
		//console.log('showWelcomeMessage: ', !(user && user.profile && user.profile.hideWelcomeMessage === true));
		return !(user && user.profile && user.profile.hideWelcomeMessage === true);
	},
	messagesExist: function(){
		return Messages.find({userId: Meteor.userId(), newMessage: {$ne: true}}).count() > 0;
	},
	alertCount: function(){
		return Messages.find({userId: Meteor.userId(), newMessage: {$ne: true}}).count();
	},
	messages: function(){
		return Messages.find({userId: Meteor.userId(), newMessage: {$ne: true}}, {sort: {createdAt: -1}});
	},
	name: function(){
		var message = this;
		return message.name || 'No Name';
	},
	timeLeft: function(){
		reRunComputationAfterTime(1000);
		var message = this;
		var timeTillExpire = (message.lastClientResetTime + message.duration) - moment().valueOf();
		if(timeTillExpire <= 0){
			return 'Expired!';
		}
		if(_.isNaN(timeTillExpire)){
			return 'Timeout Not Selected!';
		}
		return displayDuration(timeTillExpire);
	}
});


Template.home.events = {
	'click button[data-action="hide-welcome-message"]': function(event, template){
		event.preventDefault();
		Users.update({_id: Meteor.userId()}, {$set: {'profile.hideWelcomeMessage': true}});
	},
	'click button[data-action="new-message"]': function(event, template){
		var messageId = Messages.insert({
			userId: Meteor.userId(),
			createdAt: moment().valueOf(),
			newMessage: true //To prevent screen flickering as message is added before we move to the new message route
		});
		FlowRouter.go('/new-message/' + messageId + '?messageStep=timer');
	},
	'click button[data-action="reset-message-timer"]': function(event, template){
		var message = this;
		Meteor.call('resetMessageTimer', message._id, moment().valueOf());
	},
	'click button[data-action="edit-message"]': function(event, template){
		var message = this;
		FlowRouter.go('/new-message/' +  message._id + '?messageStep=timer');
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
