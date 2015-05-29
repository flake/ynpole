UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MM/DD/YYYY, hh:mm');
});

UI.registerHelper('followersCount', function(followingId, options){
	if(followingId)
		return Follows.find({'following_id': followingId}).count();
});

UI.registerHelper('followingCount', function(followerId, options){
	if(followerId)
		return Follows.find({'follower_id': followerId}).count();
});