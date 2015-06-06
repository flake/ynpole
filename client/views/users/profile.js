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

	isPost: function(){
		var act = Session.get('activity_show');

		if(act == 'all' || act == 'q' || act == 'r')
			return true;
		if(act == 'fr' || act == 'fg')
			return false;
	},

	followUsers: function(){
		var act = Session.get('activity_show');
		var userIds = [];

		if(act == 'fr'){
			var followers = Follows.find({'following_id': this._id}, {sort: {created_at: -1}});
			userIds = followers.map(function(doc){ return doc.follower_id });
		}
		if(act == 'fg'){
			var following = Follows.find({'follower_id': this._id}, {sort: {created_at: -1}});
			userIds = following.map(function(doc){ return doc.following_id });
		}

		return Meteor.users.find({_id: {$in: userIds}});
	},

/*	isOwner: function(){
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
	}, */

	profileBars: function(){
		var user = Meteor.user();

		if(user._id != this._id)
			return {};

		var title = "Add title";
		var about = "Write about yourself...";

		if(user.profile.title && user.profile.title != '')
			title = user.profile.title;

		if(user.profile.about && user.profile.about != '')
			about = user.profile.about;

		return { title: title, about: about };
	},

	editTitle: function(){
		if(Session.get('edit_title'))
			return true;
		else
			return false;
	},

	editAbout: function(){
		if(Session.get('edit_about'))
			return true;
		else
			return false;
	}
});

Template.profile.events({
	'click #Follow-profile': function(event, template){
		follow = { following_id: template.data._id, following_name: template.data.profile.name };

		Meteor.call('follow', follow, function(error, followId){
			if(error)
				throwError(error.reason);
		});
	},

	'click #Unfollow-profile': function(event, template){
		follow = { following_id: template.data._id };

		Meteor.call('unfollow', follow, function(error){
			if(error)
				throwError(error.reason);
		})
	},

	'click #editable-title': function(event, template){
		var usr = Meteor.user();
		if(usr._id === template.data._id)
			Session.set('edit_title', true);
	},

	'click #editable-about': function(event, template){
		var usr = Meteor.user();
		if(usr._id === template.data._id)
			Session.set('edit_about', true);
	},

	'keypress input#add-title': function(event, template){
		if(event.which === 27){
			event.preventDefault();
			Session.set('edit_title', false);
			return;
		}
		if(event.which === 13){
			event.preventDefault();
			var titleVal = template.find('#add-title').value;

			if(titleVal)
				updateUser({'profile.title': titleVal});

			Session.set('edit_title', false);
		}
	},

	'blur input#add-title': function(event, template){
		Session.set('edit_title', false);
	},

	'keypress textarea#add-about': function(event, template){
		if(event.which === 13){
			event.preventDefault();

			var aboutVal = template.find('#add-about').value;

			if(aboutVal)
				updateUser({'profile.about': aboutVal});

			Session.set('edit_about', false);
		}
	},

	'blur textarea#add-about': function(event, template){
		Session.set('edit_about', false);
	},
});

Template.profile.rendered = function(){
    $('textarea').autosize();
}