Template.registerHelper('reactiveVarEquals', function(reactiveVar, value) {
	var template = Template.instance();
	return template[reactiveVar].get() === value;
});