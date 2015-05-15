var postsData = [
	{
		question: 'Does it look good?',
		source_id: 'asdf001',
		polarity: '8'
	},
	{
		question: 'Is it helpful?',
		source_id: 'asdf002',
		polarity: '7'
	},
	{
		question: 'I believe this is gonna rock, what say you?',
		source_id: 'asdf003',
		polarity: '9'
	}
];

Template.postsList.helpers({
	posts: function(){
		return Posts.find();
	}
});