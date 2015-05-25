Template.profile.helpers({
	activities: function(){
		var act = Session.get('activity_show');
		if(act == "all"){
			Template.profile.activityTitle = "Activity";
			return Activities.find({'userId': this._id}, {sort: {created_at: -1}});
		}
		if(act == "q"){
			Template.profile.activityTitle = "Questions";
			return Activities.find({'userId': this._id, 'type': "asked"}, {sort: {created_at: -1}});
		}
		if(act == "r"){
			Template.profile.activityTitle = "Reviewed";
			return Activities.find({'userId': this._id, 'type': "reviewed"}, {sort: {created_at: -1}});
		}
	}
});