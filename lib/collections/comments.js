Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttr){
		var user = Meteor.user();
		var userId = user._id;
		var post = Posts.findOne(commentAttr.postId);
		var vote = findReview(commentAttr.postId, userId);

		if(!user)
			throw new Meteor.Error(401, "You need to login to make comments");

		if(!commentAttr.review)
			throw new Meteor.Error(422, 'Please write some content');

		if(!post)
			throw new Meteor.Error(422, 'You must comment on a post');

		if(!vote)
			throw new Meteor.Error(422, "You must vote Yes or No to review");

		comment = _.extend(_.pick(commentAttr, 'postId', 'review'), {
			userId: user._id,
			author: user.profile.name,
			vote: vote,
			expired: false,
			created_at: new Date().getTime()
		});

		comment._id = Comments.insert(comment);
		
		createActivity({'type': "commented", 'sourceId': post._id});

		createCommentNotification({userId: post.source_id, objId: post._id});

		return comment._id;
	}
})