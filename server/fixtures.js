if (Posts.find().count() == 0){
	var now = new Date().getTime();

	var samId = Meteor.users.insert({
		profile: {name: 'Uncle Sam'}
	});

	var ramId = Meteor.users.insert({
		profile: {name: 'Rambo Ramesh'}
	});

	var sam = Meteor.users.findOne(samId);
	var ram = Meteor.users.findOne(ramId);

	var questId = Posts.insert({
		question: 'Is voting review assertive?',
		topic: 'public',
		source_id: sam._id,
		asked_by: sam.profile.name,
		polarity: 0,
		yes_voters: [],
		no_voters: [],
		yes_votes: 0,
		no_votes: 0,
		created_at: now - 3 * 3600 * 1000
	});

	Comments.insert({
		postId: questId,
		userId: ram._id,
		author: ram.profile.name,
		review: 'this clears the confusion and makes assertive',
		vote: 'y',
		created_at: now - 2 * 3600 * 1000
	});

	Comments.insert({
		postId: questId,
		userId: sam._id,
		author: sam.profile.name,
		review: 'not much!',
		vote: 'n',
		created_at: now - 1 * 3600 * 1000
	});

	Posts.insert({
		question: 'Does it look good?',
		topic: 'design',
		source_id: ram._id,
		asked_by: ram.profile.name,
		polarity: 0,
		yes_voters: [],
		no_voters: [],
		yes_votes: 0,
		no_votes: 0,
		created_at: now - 5 * 3600 * 1000
	});

	Posts.insert({
		question: 'Is it helpful?',
		topic: 'service',
		source_id: sam._id,
		asked_by: sam.profile.name,
		polarity: 0,
		yes_voters: [],
		no_voters: [],
		yes_votes: 0,
		no_votes: 0,
		created_at: now - 6 * 3600 * 1000
	});

	Posts.insert({
		question: 'I believe this is gonna rock, what say you?',
		topic: 'opinion',
		source_id: ram._id,
		asked_by: ram.profile.name,
		polarity: 0,
		yes_voters: [],
		no_voters: [],
		yes_votes: 0,
		no_votes: 0,
		created_at: now - 7 * 3600 * 1000
	});
}