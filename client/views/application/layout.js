Template.layout.events({
	'mouseenter .pop-user': function(event, template){
		$('.pop-content').empty();
		var pos = $(event.currentTarget).position();
		var left = pos.left +222; //event.pageX -45
		var top = pos.top -72; //event.pageY -120

		if(top < 10)
			top = top+135;

		var userId = $(event.currentTarget).attr("uid");
		if(userId){
			Blaze.renderWithData(Template.userCard, Meteor.users.findOne({_id: userId}), $('.pop-content')[0]);
			$('.pop-user-card').css({'top':top,'left':left, 'position':'absolute'});
			$('.pop-user-card').show();
		}
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
	},

	'click .question-plus': function(event, template){
		$('.modal-dialog').empty();
		Blaze.renderWithData(Template.bsmodal, {title: "Add a question for review", modalTemplate: "addQuest", noFooter: true}, $('.modal-dialog')[0]);
		$('#verifyModal').modal('show');
	}
});

Template.layout.created = function(){
	$('.pop-user-card').hide();
}

Template.layout.rendered = function(){
	Session.set('DocumentTitle', 'Ynpole - Decision Review App');
}