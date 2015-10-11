// Provide defaults for Meteor.settings
//
// To configure your own Twitter keys, see:
//   https://github.com/meteor/meteor/wiki/Configuring-Twitter-in-Local-Market
if (typeof Meteor.settings === 'undefined')
  Meteor.settings = {};

_.defaults(Meteor.settings, {
  twitter: { //TODO: REvoke these keys, create new ones and keep them out of the Repository (place them in ENV variables)
    consumerKey: "el5HDcMHTMgnkOaEwBO7802X4",
    secret: "Ty4drkVQOdVh6N7COBy6UHeK0r0YBxHMI6tcrN9flnWHqQMG0L"
  }
});

ServiceConfiguration.configurations.upsert(
  { service: "twitter" },
  {
    $set: {
      consumerKey: Meteor.settings.twitter.consumerKey,
      secret: Meteor.settings.twitter.secret
    }
  }
);
