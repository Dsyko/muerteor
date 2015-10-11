Template.newMessage.onCreated(function(){
	var template = this;
	template.newMessageState = new ReactiveVar('name');
});

Template.newMessage.helpers({
	message: function(){
		return Messages.findOne({_id: FlowRouter.getParam('messageId')});
	}
});