SSR.compileTemplate('welcomeTemplate', Assets.getText('welcome.html'));

Template.welcomeTemplate.helpers({
	baseURL: function(){
		return process.env.ROOT_URL;
	}
});

SSR.compileTemplate('inviteTemplate', Assets.getText('invite.html'));

Template.inviteTemplate.helpers({
	profileName: function(){
		var user = Meteor.user();
		return user.profile.name;
	},
	baseURL: function(){
		return process.env.ROOT_URL;
	},

	posts: function(){
		return Posts.find({source_id: Meteor.userId()}, {sort: {created_at: -1}, limit: 5});
	},

	voteyClass: function(){
		var userId = Meteor.userId();
		var vote = getReview(this, userId);

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

	commentsCount: function(){
		return Comments.find({postId: this._id, expired: false}).count();
	},

	image: function(){
		var image = Images.findOne({_id: this.img_fsid});
		var url = image.url;
		return image;
	}
});

getReview = function(post, userId){
	if(_.findWhere(post.yes_voters, { "voter_id": userId }))
		return "YES";
	if(_.findWhere(post.no_voters, { "voter_id": userId }))
		return "NO";

	return false;
}