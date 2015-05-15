Template.addQuest.events({
	'submit form': function(event, template){
		event.preventDefault();

		var newQuestion = template.find('#new-question').value;
		var questTopic = template.find('#quest-topic').value;

		var post = {
			source_id: Meteor.userId(),
			question: newQuestion,
			topic: questTopic,
			polarity: '0'
		}

		Posts.insert(post);
		Router.go('/');
	}
});