Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notfound',
    loadingTemplate: 'loading'
});

Router.map(function(){
	this.route('appLaunch', {
		path: '/',
		template: 'home',
		onBeforeAction: function(){
			if(!Meteor.user()){
				this.layout('landing');
				this.render('login');
			}else{
				this.next();
			}
		}
	});
	this.route('signup', {
		path: '/signup',
		onBeforeAction: function(){
			if(Meteor.user()){
				this.redirect('/');
			}else{
				this.layout('landing');
				this.next();
			}
		}
	});

	this.route('addQuest', {
		path: '/addQuestion'
	});

	this.route('profile', {
		path: '/:_id',
		data: function(){
			var userId = this.params._id;
			Deps.autorun(function(){
				Meteor.subscribe('userInfo', userId);
			});
			return Meteor.users.findOne(userId);
		}
	});
});

var OnBeforeActions;

OnBeforeActions = {
    loginRequired: function(pause) {
      if (!Meteor.user()) {
      	this.layout('landing');
        this.render('login');
      }else{
      	this.next();
      }
    }
};

Router.before(OnBeforeActions.loginRequired, {
    only: ['addQuest']
});