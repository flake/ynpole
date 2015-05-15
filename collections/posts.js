Posts = new Meteor.Collection('posts');

/*Posts.allow({
	insert: function(userId, doc){
		return !! userId;
	}
});*/

Meteor.methods({
	post: function(postAttr){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to add a question");

		if(!postAttr.question)
			throw new Meteor.Error(422, "Please add a question");

		var post = _.extend(_.pick(postAttr, 'question', 'topic'), {
			source_id: user._id,
			asked_by: user.profile.name,
			polarity: 0,
			created_at: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
});