Template.activityItem.helpers({
/*	createdAt: function(){
		return new Date(this.created_at).toString();
	}, */

	post: function(){
		if(this.type == "asked" || this.type == "reviewed")
			return Posts.findOne({_id: this.sourceId});
	},

	user: function(){
		if(this.type == "followed")
			return Meteor.users.findOne(this.sourceId);
	},

	revIcon: function(){
		if(this.type == "reviewed"){
			var rev = findReview(this.sourceId, this.userId);
			
			if(rev == "Y")
				return "fa fa-thumbs-up voted-yes";
			if(rev == "N")
				return "fa fa-thumbs-down voted-no";
			else
				return '';
		}
	},

	isAsked: function(){
		if(this.type == "asked")
			return true;
	},

	isReviewed: function(){
		if(this.type == "reviewed")
			return true;
	},

	isFollowed: function(){
		if(this.type == "followed")
			return true;
	}
})