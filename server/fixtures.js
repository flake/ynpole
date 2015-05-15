if (Posts.find().count() == 0){
	Posts.insert({
		question: 'Does it look good?',
		source_id: 'asdf001',
		polarity: '8'
	});

	Posts.insert({
		question: 'Is it helpful?',
		source_id: 'asdf002',
		polarity: '7'
	});

	Posts.insert({
		question: 'I believe this is gonna rock, what say you?',
		source_id: 'asdf003',
		polarity: '9'
	});
}