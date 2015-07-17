Activities = new Meteor.Collection('activities');

createActivity = function(activity){
	var user = Meteor.user();

	Activities.upsert({
		userId: user._id,
		userName: user.profile.name,
		type: activity.type,
		sourceId: activity.sourceId
	},
	{
		$set:{ created_at: new Date().getTime() }
	}
	);
}