Template.commentItem.helpers({
/*	createdAt: function(){
		return new Date(this.created_at).toString();
	}, */

	votedIcon: function(){
		var vote = this.vote;
		if(vote == 'y')
			return "fa-thumbs-up voted-yes";

		if(vote == 'n')
			return "fa-thumbs-down voted-no";
		else
			return "";
	}
});