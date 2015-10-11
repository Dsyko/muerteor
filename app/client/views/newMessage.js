var saveField = function(collection, documentId, field, newValue){
	var setObject = {$set: {}};
	setObject.$set[field] = newValue;
	collection.update({_id: documentId}, setObject);
};
var throttledSave = _.debounce(saveField, 300);

var newMessageSteps = ['name', 'text', 'timer', 'people'];

Template.newMessage.onCreated(function(){
	var template = this;
	template.newMessageState = new ReactiveVar(FlowRouter.getQueryParam('messageStep') || 'name');
});

Template.newMessage.helpers({
	message: function(){
		return Messages.findOne({_id: FlowRouter.getParam('messageId')});
	}
});

Template.newMessage.events = {
	'click button[data-action="next"]': function(event, template){
		event.preventDefault();
		var step = template.newMessageState.get();
		var stepIndex = _.indexOf(newMessageSteps, step);
		if(newMessageSteps.length > stepIndex+1){
			template.newMessageState.set(newMessageSteps[stepIndex+1]);
			FlowRouter.setQueryParams({messageStep: newMessageSteps[stepIndex+1]});
		}
	},
	'click button[data-action="prev"]': function(event, template){
		event.preventDefault();
		var step = template.newMessageState.get();
		var stepIndex = _.indexOf(newMessageSteps, step);
		if(stepIndex > 0){
			template.newMessageState.set(newMessageSteps[stepIndex-1]);
			FlowRouter.setQueryParams({messageStep: newMessageSteps[stepIndex-1]});
		}
	}
};


Template.newMessageEditableName.onRendered(function(){
	var template = this;
	template.$('input').val(template.data.name);
	template.$('input').focus();
});

Template.newMessageEditableName.events = {
	'keyup input': function(event, template){
		event.preventDefault();
		var message = this;
		throttledSave(Messages, message._id, 'name', template.$('input').val());
	}
};


Template.newMessageEditableText.onRendered(function(){
	var template = this;
	template.$('textarea').val(template.data.text);
	template.$('textarea').focus();
});

Template.newMessageEditableText.events = {
	'keyup textarea': function(event, template){
		event.preventDefault();
		var message = this;
		throttledSave(Messages, message._id, 'text', template.$('textarea').val());
	}
};


Template.newMessageEditableTime.onRendered(function(){
	var template = this;
	var duration = template.data.duration || 0;
	var hours = Math.floor(duration/ 3600000);
	duration = duration - (hours * 3600000);
	var minutes = Math.floor(duration/ 60000);
	duration = duration - (minutes * 60000);
	var seconds = Math.floor(duration/ 1000);
	template.$('select.hours').val(hours);
	template.$('select.minutes').val(minutes);
	template.$('select.seconds').val(seconds);
});

Template.newMessageEditableTime.helpers({
	hours: function(){
		return _.range(24);
	},
	minutes: function(){
		return _.range(59);
	},
	seconds: function(){
		return _.range(59);
	}
});

Template.newMessageEditableTime.events = {
	'change select': function(event, template){
		event.preventDefault();
		var message = this;
		var duration = moment.duration({
			seconds: parseInt(template.$('select.seconds').val(), 10),
			minutes: parseInt(template.$('select.minutes').val(), 10),
			hours: parseInt(template.$('select.hours').val(), 10)
		});
		//console.log(duration.valueOf());
		throttledSave(Messages, message._id, 'duration', duration.valueOf());
	}
};