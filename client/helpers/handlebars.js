UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('DD MMM YYYY, hh:mm');
});

UI.registerHelper('followersCount', function(followingId, options){
	if(followingId)
		return Follows.find({'following_id': followingId}).count();
});

UI.registerHelper('followingCount', function(followerId, options){
	if(followerId)
		return Follows.find({'follower_id': followerId}).count();
});

UI.registerHelper('isOwner', function(userId, options){
	var user = Meteor.user();
	if(user._id === userId)
		return true;
	else
		return false;
});

UI.registerHelper('followBtn', function(userId, options){
	var user = Meteor.user();
	if(Follows.find({'following_id': userId, 'follower_id': user._id}).count())
		return 'Unfollow';
	else
		return 'Follow';
})