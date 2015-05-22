Template.profile.helpers({
	activities: function(){
		return Activities.find({'userId': this._id}, {sort: {created_at: -1}});
	}
});