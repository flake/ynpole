Template.commentNew.events({
	'keypress textarea.pcom-input-text': function(event, template){
		if(event.which === 13){
			event.preventDefault();
			var userId = Meteor.userId();
			var post = template.data
			var vote = null;

			if(_.findWhere(post.yes_voters, { "voter_id": userId }))
				vote = 'y';

			if(_.findWhere(post.no_voters, { "voter_id": userId }))
				vote = 'n';

			var comVal = template.find('.pcom-input-text').value;
			var comment = {
				review: comVal,
				postId: post._id,
				vote: vote
			};

			if(!comVal || !vote)
				return

			Meteor.call('comment', comment, function(error, commentId){
				if(error)
					throwError(error.reason);
				else
					template.find('.pcom-input-text').value = '';
			});
		}
	}
});

Template.commentNew.helpers({
	pcomDisabled: function(){
		var userId = Meteor.userId();

		if(getReview(this, userId))
			return { 'className': '', 'placeHolder': 'Write a comment...' };
		else
			return { 'className': 'pcom-disabled', 'placeHolder': 'Please review to write a comment.' };
	}
});