Activities = new Meteor.Collection('activities');

createActivity = function(activity){
	var user = Meteor.user();

	Activities.insert({
		userId: user._id,
		userName: user.profile.name,
		type: activity.type,
		sourceId: activity.sourceId,
		created_at: new Date().getTime()
	});
}