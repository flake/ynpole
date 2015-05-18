Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttr){
		var user = Meteor.user();
		var userId = user._id;
		var post = Posts.findOne(commentAttr.postId);

		if(!user)
			throw new Meteor.Error(401, "You need to login to make comments");

		if(!commentAttr.review)
			throw new Meteor.Error(422, 'Please write some content');

		if(!post)
			throw new Meteor.Error(422, 'You must comment on a post');

		if(!(_.findWhere(post.yes_voters, { "voter_id": userId }) || _.findWhere(post.no_voters, { "voter_id": userId })))
			throw new Meteor.Error(422, "You must vote Yes or No to review");

		comment = _.extend(_.pick(commentAttr, 'postId', 'review', 'vote'), {
			userId: user._id,
			author: user.profile.name,
			created_at: new Date().getTime()
		});

		return Comments.insert(comment);
	}
})