Template.postItem.helpers({
	voteyClass: function(){
		var userId = Meteor.userId();

		if(_.findWhere(this.yes_voters, { "voter_id": userId }))
			return "voted-yes";
		else
			return "vote-yes";
	},

	votenClass: function(){
		var userId = Meteor.userId();
		var usr = Meteor.users.findOne(userId);

		if(_.findWhere(this.no_voters, { "voter_id": userId }))
			return "voted-no";
		else
			return "vote-no";
	},

	comments: function(){
		return Commnets.find({postId: this._id});
	}
});

Template.postItem.events({
	'click .vote-yes-btn': function(e){
		e.preventDefault();
		console.log("post id: "+this._id);
		Meteor.call('yesvote', this._id);
	},

	'click .vote-no-btn': function(e){
		e.preventDefault();
		Meteor.call('novote', this._id);
	}
});

Template.postItem.rendered = function(){
    $('textarea').autosize();
}