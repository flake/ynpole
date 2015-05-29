Template.profile.helpers({
	activities: function(){
		var act = Session.get('activity_show');
		if(act == "all")
			return Activities.find({'userId': this._id}, {sort: {created_at: -1}});
		if(act == "q")
			return Activities.find({'userId': this._id, 'type': "asked"}, {sort: {created_at: -1}});
		if(act == "r")
			return Activities.find({'userId': this._id, 'type': "reviewed"}, {sort: {created_at: -1}});
	},

	activityTitle: function(){
		var act = Session.get('activity_show');

		if(act == "all")
			return "Activity";
		if(act == "q")
			return "Questions";
		if(act == "r")
			return "Reviewed";
		if(act == "fr")
			return "Followers";
		if(act == "fg")
			return "Following";
	},

	isOwner: function(){
		var user = Meteor.user();
		if(user._id === this._id)
			return true;
		else
			return false;
	},

	followBtn: function(){
		var user = Meteor.user();
		if(Follows.find({'following_id': this._id, 'follower_id': user._id}).count())
			return {id: 'unfollow-user', value: 'Unfollow'};
		else
			return {id: 'follow-user', value: 'Follow'};
	}
});

Template.profile.events({
	'click #follow-user': function(event, template){
		follow = { following_id: template.data._id };

		Meteor.call('follow', follow, function(error, followId){
			if(error)
				throwError(error.reason);
		});
	},

	'click #unfollow-user': function(event, template){
		follow = { following_id: template.data._id };

		Meteor.call('unfollow', follow, function(error){
			if(error)
				throwError(error.reason);
		})
	}
})