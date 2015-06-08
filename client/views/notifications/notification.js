Template.notification.helpers({
	notificationPath: function(){
		if(this.verb == "followed")
			return Router.routes.profile.path({_id: this.sourceId});
		else
			return Router.routes.question.path({_id: this.objectId});
	},

	verbTag: function(){
		if(this.verb == "asked")
			return "a question";
		if(this.verb == "reviewed")
			return "your question";
		if(this.verb == "commented")
			return "on your question";
		if(this.verb == "followed")
			return "You";
	}
});

Template.notification.events({
	'click a': function(){
		Notifications.update(this._id, {$set: {read: true}});
	}
});