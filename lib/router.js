Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notfound',
    loadingTemplate: 'loading'
});

Router.map(function(){
	this.route('appLaunch', {
		path: '/',
		template: 'home',
		yieldTemplates: {
			'appLeft': {to: 'leftTemplate'}
		},
		data: function(){
			return { posts: Posts.find({}, {sort: {created_at: -1}}) }
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
		yieldTemplates: {
			userLeft: {to: 'leftTemplate'}
		},
		waitOn: function(){
			var userId = this.params._id;
			Deps.autorun(function(){
				Meteor.subscribe('userInfo', userId);
			});
		},
		data: function(){
			var userId = this.params._id;

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
    except: ['signup']
});