Template.postItem.helpers({
	voteyClass: function(){
		var userId = Meteor.userId();

		if(_.findWhere(this.yes_voters, { "voter_id": userId }))
			return "voted-yes";
		else
			return "vote-yes";
	},

	votenClass: function(){
		var userId = Meteor.userId();
		var usr = Meteor.users.findOne(userId);

		if(_.findWhere(this.no_voters, { "voter_id": userId }))
			return "voted-no";
		else
			return "vote-no";
	},

	comments: function(){
		return Comments.find({postId: this._id}, {sort: {created_at: -1}});
	},

	commentsCount: function(){
		return Comments.find({postId: this._id}).count();
	}
});

Template.postItem.events({
	'click .vote-yes-btn': function(event, template){
		event.preventDefault();
		Meteor.call('yesvote', this._id);
		template.$('.post-comments').show();
	},

	'click .vote-no-btn': function(event, template){
		event.preventDefault();
		Meteor.call('novote', this._id);
		template.$('.post-comments').show();
	},

	'click .comments-icon': function(event, template){
		template.$('.post-comments').toggle();
	}
});

Template.postItem.rendered = function(){
    $('textarea').autosize();
}