Template.userCard.events({
	'click .Follow-user': function(event, template){
		follow = { following_id: template.data._id, following_name: template.data.profile.name };

		Meteor.call('follow', follow, function(error, followId){
			if(error)
				throwError(error.reason);
		});
	},

	'click .Unfollow-user': function(event, template){
		follow = { following_id: template.data._id };

		Meteor.call('unfollow', follow, function(error){
			if(error)
				throwError(error.reason);
		});
	}
});