var saveField = function(collection, documentId, field, newValue){
	var setObject = {$set: {}};
	setObject.$set[field] = newValue;
	collection.update({_id: documentId}, setObject);
};
var throttledSave = _.debounce(saveField, 300);

var newMessageSteps = [ 'timer', 'text', 'people', 'name'];

Template.newMessage.onCreated(function(){
	if(!_.isString(FlowRouter.getQueryParam('messageStep'))){
		FlowRouter.setQueryParams({messageStep: newMessageSteps[0]});
	}
	Messages.update({_id: FlowRouter.getParam('messageId')}, {$unset: {newMessage: ''}});
});

Template.newMessage.helpers({
	message: function(){
		return Messages.findOne({_id: FlowRouter.getParam('messageId')}, {fields: {newMessage: 0}});
	},
	onFirstStep: function(){
		var step = FlowRouter.getQueryParam('messageStep');
		return _.indexOf(newMessageSteps, step) === 0;
	},
	onLastStep: function(){
		var step = FlowRouter.getQueryParam('messageStep');
		return _.indexOf(newMessageSteps, step) === (newMessageSteps.length -1);
	}
});

Template.newMessage.events = {
	'click button[data-action="next"]': function(event, template){
		event.preventDefault();
		var message = this;
		var step = FlowRouter.getQueryParam('messageStep');
		var stepIndex = _.indexOf(newMessageSteps, step);
		if(newMessageSteps.length > stepIndex+1){
			FlowRouter.setQueryParams({messageStep: newMessageSteps[stepIndex+1]});
		}else{
			FlowRouter.go('/');
			FlowRouter.setQueryParams({messageStep: null});
			Meteor.call('resetMessageTimer', message._id, moment().valueOf());
		}
	},
	'click button[data-action="prev"]': function(event, template){
		event.preventDefault();
		var step = FlowRouter.getQueryParam('messageStep');
		var stepIndex = _.indexOf(newMessageSteps, step);
		if(stepIndex > 0){
			FlowRouter.setQueryParams({messageStep: newMessageSteps[stepIndex-1]});
		}else{
			FlowRouter.go('/');
			FlowRouter.setQueryParams({messageStep: null});
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
	var days = Math.floor(duration/ moment.duration({days: 1}).valueOf());
	duration = duration - (days * moment.duration({days: 1}).valueOf());
	var hours = Math.floor(duration/ moment.duration({hours: 1}).valueOf());
	duration = duration - (hours * moment.duration({hours: 1}).valueOf());
	var minutes = Math.floor(duration/ moment.duration({minutes: 1}).valueOf());
	duration = duration - (minutes * moment.duration({minutes: 1}).valueOf());
	var seconds = Math.floor(duration/ moment.duration({seconds: 1}).valueOf());
	template.$('select.days').val(days);
	template.$('select.hours').val(hours);
	template.$('select.minutes').val(minutes);
	template.$('select.seconds').val(seconds);
});

Template.newMessageEditableTime.helpers({
	days: function(){
		return _.range(30);
	},
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
			hours: parseInt(template.$('select.hours').val(), 10),
			days: parseInt(template.$('select.days').val(), 10)
		});
		//console.log(duration.valueOf());
		throttledSave(Messages, message._id, 'duration', duration.valueOf());
	}
};



//Template.newMessageEditablePeople.events = {
//	'click .emails': function(event, template){
//		//event.preventDefault();
//		var message = template.data;
//		template.$('.emails').editable({
//			toggle: 'manual',
//			mode: 'inline',
//			select2: {
//				tags: true,
//				tokenSeparators: [",", " "]
//			}
//		}).on('save', function(e, params) {
//			console.log('Saved value: ' + params.newValue);
//		}).toggle();
//	}
//};

Template.newMessageEditablePeople.onRendered(function(){
	var template = this;
	var message = template.data;
	template.$('.emails').editable({
		mode: 'inline',
		placeholder: 'Enter emails',
		emptytext: 'Tap to add Emails',
		type: 'email',
		select2: {
			tags: true,
			tokenSeparators: [",", " "]
		}
	}).on('save', function(e, params) {
		//console.log('Saved value: ' + params.newValue);
		throttledSave(Messages, message._id, 'emails', params.newValue.split(', '));
	});


	template.$('.texts').editable({
		mode: 'inline',
		placeholder: 'Numbers to Text',
		emptytext: 'Tap to add numbers to text',
		type: 'tel',
		select2: {
			tags: true,
			tokenSeparators: [",", " "]
		}
	}).on('save', function(e, params) {
		//console.log('Saved value: ' + params.newValue);
		throttledSave(Messages, message._id, 'texts', params.newValue.split(', '));
	});

	template.$('.calls').editable({
		mode: 'inline',
		placeholder: 'Numbers to Call',
		emptytext: 'Tap to add numbers to call',
		type: 'tel',
		select2: {
			tags: true,
			tokenSeparators: [",", " "]
		}
	}).on('save', function(e, params) {
		//console.log('Saved value: ' + params.newValue);
		throttledSave(Messages, message._id, 'calls', params.newValue.split(', '));
	});
});

Template.newMessageEditablePeople.helpers({
	emails: function(){
		var message = this;
		if(message && _.isArray(message.emails) && message.emails.length > 0){
			return message.emails.join(', ');
		}
		return false;
	},
	texts: function(){
		var message = this;
		return (message && message.texts) || [];
	},
	calls: function(){
		var message = this;
		return (message && message.calls) || [];
	}
});