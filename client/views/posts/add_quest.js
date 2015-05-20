Template.addQuest.events({
	'submit form': function(event, template){
		event.preventDefault();

		var newQuestion = template.find('#new-question').value;
		var questTopic = template.find('#quest-topic').value;

		var post = {
			question: newQuestion,
			topic: questTopic
		}

		Meteor.call('post', post, function(error, id){
			if(error)
				throwError(error.reason);
			else{
				template.find('#new-question').value = '';
				template.find('#quest-topic').value = '';
			}
		});
	}
});