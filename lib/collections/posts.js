Posts = new Meteor.Collection('posts');
/*
var Schema = {};
Schema.Post = new SimpleSchema({
	question:{
		type: String
	},
	tags:{
		type: [String],
		optional: true,
		blackbox: true
	},
	img_fsid: {
		type: String,
		optional: true
	},
	source_id: {
		type: String
	},
	asked_by: {
		type: String
	},
	polarity: {
		type: Number,
		defaultValue: 0
	},
	reviews: {
		type: [Object],
		optional: true
	},
	"reviews.$.user_id": {
		type: String
	},
	"reviews.$.user_name": {
		type: String
	},
	"reviews.$.vote":{
		type: String,
		allowedValues: ['YES', 'NO']
	},
	yes_votes: {
		type: Number,
		defaultValue: 0
	},
	no_votes: {
		type: Number,
		defaultValue: 0
	},
	created_at: {
		type: Date,
		defaultValue: new Date().getTime()
	}
}); */

Meteor.methods({
	post: function(postAttr){
		var user = Meteor.user();

		if(!user)
			throw new Meteor.Error(401, "You need to login to add a question");

		if(!postAttr.question)
			throw new Meteor.Error(422, "Please add a question");

		var post = _.extend(_.pick(postAttr, 'question', 'tags', 'img_fsid'), {
			source_id: user._id,
			asked_by: user.profile.name,
			polarity: 0,
			yes_voters: [],
			no_voters: [],
			yes_votes: 0,
			no_votes: 0,
			created_at: new Date().getTime()
		});

		var postId = Posts.insert(post);

		createActivity({'type':"asked", 'sourceId': postId});
		createPostNotification({objId: postId});

		return postId;
	},

	yesvote: function(postId){
		var user = Meteor.user();
		var inc_no = 0;
		var review = findReview(postId, user._id);

		if(!user)
			throw new Meteor.Error(401, "You need to login to review");

		var post = Posts.findOne(postId);
		if(!post)
			throw new Meteor.Error(422, "Invalid Post");

		if(review === "YES")
			throw new Meteor.Error(422, "Already reviewed 'Yes' to this question");

		if(review === "NO")
			inc_no = -1;

		Posts.update(post._id, {
			$addToSet: {yes_voters: { voter_id: user._id, voter_name: user.profile.name}},
			$inc: {yes_votes: 1, no_votes: inc_no},
			$pull: {no_voters: {voter_id: user._id}}
		});

		Comments.update({userId: user._id, postId: postId, vote: 'YES'}, {$set: {expired: false}}, {multi: true});

		if(inc_no == -1)
			Comments.update({userId: user._id, postId: postId, vote: 'NO'}, {$set: {expired: true}}, {multi: true});

		createActivity({'type': "reviewed", 'sourceId': postId});

		createReviewNotification({userId: post.source_id, objId: postId});
	},

	novote: function(postId){
		var user = Meteor.user();
		var inc_yes = 0;
		var review = findReview(postId, user._id);

		if(!user)
			throw new Meteor.Error(401, "You need to login to review");

		var post = Posts.findOne(postId);
		if(!post)
			throw new Meteor.Error(422, "Invalid Post");

		if(review === "NO")
			throw new Meteor.Error(422, "Already reviewed 'No' to this question");

		if(review === "YES")
			inc_yes = -1;

		Posts.update(post._id, {
			$addToSet: {no_voters: { voter_id: user._id, voter_name: user.profile.name}},
			$inc: {no_votes: 1, yes_votes: inc_yes},
			$pull: {yes_voters: {voter_id: user._id}}
		});

		Comments.update({userId: user._id, postId: postId, vote: 'n'}, {$set: {expired: false}}, {multi: true});

		if(inc_yes == -1)
			Comments.update({userId: user._id, postId: postId, vote: 'y'}, {$set: {expired: true}}, {multi: true});

		createActivity({'type': "reviewed", 'sourceId': postId});

		createReviewNotification({userId: post.source_id, objId: postId});
	}
});