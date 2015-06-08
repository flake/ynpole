Notifications = new Meteor.Collection('notifications');

Notifications.allow({
	update: ownsDocument
});

createPostNotification = function(notify){
	var user = Meteor.user();

	var followers = Follows.find({following_id: user._id});

	// *** TODO *** job worker
	followers.forEach(function(follower){
		Notifications.insert({
			userId: follower.follower_id,
			sourceId: user._id,
			sourceName: user.profile.name,
			verb: "asked",
			objectId: notify.objId,
			read: false,
			created_at: new Date().getTime()
		});
	});
},

createReviewNotification = function(notify){
	var user = Meteor.user();

	if(notify.userId !== user._id){
		Notifications.insert({
			userId: notify.userId,
			sourceId: user._id,
			sourceName: user.profile.name,
			verb: "reviewed",
			objectId: notify.objId,
			read: false,
			created_at: new Date().getTime()
		});
	}
},

createCommentNotification = function(notify){
	var user = Meteor.user();

	if(notify.userId !== user._id){
		Notifications.insert({
			userId: notify.userId,
			sourceId: user._id,
			sourceName: user.profile.name,
			verb: "commented",
			objectId: notify.objId,
			read: false,
			created_at: new Date().getTime()
		});
	}
},

createFollowNotification = function(notify){
	var user = Meteor.user();

	Notifications.insert({
		userId: notify.userId,
		sourceId: user._id,
		sourceName: user.profile.name,
		verb: "followed",
		objectId: '',
		read: false,
		created_at: new Date().getTime()
	});
}