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

	author: function(){
		return Meteor.users.findOne({_id: this.source_id});
	},

	comments: function(){
		return Comments.find({postId: this._id, expired: false}, {sort: {created_at: -1}});
	},

	commentsCount: function(){
		return Comments.find({postId: this._id, expired: false}).count();
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
    $('.post-author').popover({
    	content: Blaze.renderWithData(Template.userCard, Template.postItem.author, $('.popover').get(0))
    });
}