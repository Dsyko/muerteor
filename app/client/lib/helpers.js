Template.registerHelper('reactiveVarEquals', function(reactiveVar, value) {
	var template = Template.instance();
	return template[reactiveVar].get() === value;
});

Template.registerHelper('userIsLoggedIn', function() {
	return _.isString(Meteor.userId()) && _.isObject(Users.findOne({_id: Meteor.userId()}, {fields: {'_id': 1}}));
});