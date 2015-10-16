Template.registerHelper('reactiveVarEquals', function(reactiveVar, value) {
	var template = Template.instance();
	return template[reactiveVar].get() === value;
});

Template.registerHelper('getQueryParam', function(queryParam) {
	return FlowRouter.getQueryParam(queryParam);
});

Template.registerHelper('queryParamEquals', function(queryParam, value) {
	return FlowRouter.getQueryParam(queryParam) === value;
});

Template.registerHelper('userIsLoggedIn', function() {
	return _.isString(Meteor.userId()) && _.isObject(Users.findOne({_id: Meteor.userId()}, {fields: {'_id': 1}}));
});

Template.registerHelper('equal', function(first, second) {
	return first == second;
});

Template.registerHelper('isCordova', function() {
	return Meteor.isCordova;
});