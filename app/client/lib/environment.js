//console.log('Meteor.isCordova: ', Meteor.isCordova);
//if(!Meteor.isCordova){
//	$(window).load(function(){
//		$('body').addClass('show-iphone-wrapper');
//	});
//}

Meteor.startup(function(){
	//console.log('Startup run');
	Meteor.completedStartup = true;
});