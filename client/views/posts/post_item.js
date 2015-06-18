Template.postItem.helpers({
	voteyClass: function(){
		var userId = Meteor.userId();
		var vote = getVote(this, userId);

		if(vote && vote === "NO")
			return "voted";

		return "";
	},

	votenClass: function(){
		var userId = Meteor.userId();
		var vote = getReview(this, userId);

		if(vote && vote === "YES")
			return "voted";

		return "";
	},

	author: function(){
		return Meteor.users.findOne({_id: this.source_id});
	},

	comments: function(){
		return Comments.find({postId: this._id, expired: false}, {sort: {created_at: -1}});
	},

	commentsCount: function(){
		return Comments.find({postId: this._id, expired: false}).count();
	},

	image: function(){
		var image = Images.findOne({_id: this.img_fsid});
		return image;
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
	},

	'click .post-view': function(event, template){
		Router.go('question', {_id: this._id});
	}

/*	'mouseenter .post-author': function(event, template){
		bootbox.dialog({
			message: "<div id='popNode'></div>",
			onEscape: function(){}
		});

		Blaze.renderWithData(Template.userCard, Meteor.users.findOne({_id: this.source_id}), $('#popNode')[0]);
	} */
});

Template.postItem.rendered = function(){
    $('textarea').autosize();
}