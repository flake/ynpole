Template.layout.events({
	'mouseenter .pop-user': function(event, template){
		$('.pop-user-card').empty();
		var pos = $(event.currentTarget).position();
		var top = pos.top-82;
		var left = pos.left+60;

		if(top < 10)
			top = top+135;

		var userId = $(event.currentTarget).attr("uid");
		Blaze.renderWithData(Template.userCard, Meteor.users.findOne({_id: userId}), $('.pop-user-card')[0]);
		$('.pop-user-card').css({'top':top,'left':left, 'position':'absolute'});
		$('.pop-user-card').show();
	},

	'mouseleave .pop-user': function(event, template){
		$('.pop-user-card').hide();
	},

	'click .pop-user': function(event, template){
		$('.pop-user-card').hide();
	},

	'mouseenter .pop-user-card': function(event, template){
		$('.pop-user-card').show();
	},

	'mouseleave .pop-user-card': function(event, template){
		$('.pop-user-card').hide();
	}
});