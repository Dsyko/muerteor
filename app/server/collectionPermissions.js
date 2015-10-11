
Messages.deny({
	insert: function (userId, doc) {
		return !userId;
	},
	update: function (userId, doc, fields, modifier) {
		return !userId;
	},
	remove: function (userId, doc) {
		return !userId;
	}
});

Messages.allow({
	insert: function (userId, doc) {
		return Meteor.userId() === doc.userId;
	},
	update: function (userId, doc, fields, modifier) {
		return Meteor.userId() === doc.userId;
	},
	remove: function (userId, doc) {
		return Meteor.userId() === doc.userId;
	}
});