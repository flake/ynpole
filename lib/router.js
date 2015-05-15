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
		template: 'signup',
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
		path: '/addQuestion',
		template: 'addQuest'
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