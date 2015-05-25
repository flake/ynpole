Template.userLeft.events({
	'click #show-all-activity': function(event, template){
		Session.set('activity_show', 'all');
	},

	'click #show-questions': function(event, template){
		Session.set('activity_show', 'q');
	},

	'click #show-reviewed': function(event, template){
		Session.set('activity_show', 'r');
	}
});