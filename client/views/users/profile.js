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
	},

	isOwner: function(){
		var user = Meteor.user();
		if(user._id === this._id)
			return true;
		else
			return false;
	}
});

Template.profile.events({
	'click #follow-user': function(event, template){
		alert('follow me!');
	}
})