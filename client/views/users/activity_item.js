Template.activityItem.helpers({
/*	createdAt: function(){
		return new Date(this.created_at).toString();
	}, */

	post: function(){
		return Posts.findOne({_id: this.sourceId});
	},

	typeText: function(){
		if(this.type == "reviewed"){
			var rev = findReview(this.sourceId, this.userId);
			
			if(rev == "Y")
				return "fa fa-thumbs-up voted-yes";
			if(rev == "N")
				return "fa fa-thumbs-down voted-no";
			else
				return '';
		}
	}
})