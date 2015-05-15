if (Posts.find().count() == 0){
	Posts.insert({
		question: 'Does it look good?',
		topic: 'design'
	});

	Posts.insert({
		question: 'Is it helpful?',
		topic: 'service'
	});

	Posts.insert({
		question: 'I believe this is gonna rock, what say you?',
		topic: 'opinion'
	});
}