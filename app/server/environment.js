ServiceConfiguration.configurations.upsert(
	{ service: "twitter" },
	{
		$set: {
			consumerKey: Meteor.settings && Meteor.settings.twitter && Meteor.settings.twitter.consumerKey,
			secret:Meteor.settings && Meteor.settings.twitter &&  Meteor.settings.twitter.secret
		}
	}
);

TWILIO_PHONE_NUMBER = Meteor.settings && Meteor.settings.twilio && Meteor.settings.twilio.number;