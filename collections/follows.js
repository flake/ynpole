Follows = new Meteor.Collection('follows');

Meteor.methods({
	follow: function(followAttr){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to follow a user");

		if(!followAttr.following_id)
			throw new Meteor.Error(422, "Invalid following user");

		var follow = _.extend(_.pick(followAttr, 'following_id', 'following_name'), {
			follower_id: user._id,
			follower_name: user.profile.name,
			created_at: new Date().getTime()
		});

		var followId = Follows.insert(follow);

		createActivity({'type':"followed", 'sourceId': followAttr.following_id});

		createFollowNotification({userId: followAttr.following_id});

		return followId;
	},

	unfollow: function(followAttr){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to unfollow a user");

		if(!followAttr.following_id)
			throw new Meteor.Error(422, "Invalid following user");

		Follows.remove({follower_id: user._id, following_id: followAttr.following_id});
	}
});