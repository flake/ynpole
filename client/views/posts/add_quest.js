Template.addQuest.events({
	'submit form': function(event, template){
		event.preventDefault();

		//Uploader.startUpload.call(Template.instance(), event);

		var newQuestion = template.find('#new-question').value;
		var questTopic = template.find('#quest-topic').value;
		var imgId = Session.get('srv_img');
		//alert("image: "+imgName);

		var post = {
			question: newQuestion,
			topic: questTopic,
			img_fsid: imgId
		}

		Meteor.call('post', post, function(error, id){
			if(error)
				throwError(error.reason);
			else{
				Session.set('srv_img', '');
				Session.set('img_src', '');
				template.find('#new-question').value = '';
				template.find('#quest-topic').value = '';
			}
		});
	},

	'click .fa-camera': function(event, template){
		$("#qupload").click();
	},

	'change #qupload': function(event, template){
		readURL(event.currentTarget);
		
		var file = event.target.files[0];
		Images.insert(file, function(err, fileObj){
			if(err)
				console.log("merr " + err);
			else
				Session.set('srv_img', fileObj._id);
		});
	}
});

Template.addQuest.helpers({
	imgSrc: function(){
		return Session.get('img_src');
	},

/*	qData: function(){
		return { directoryName: 'posts', prefix: Meteor.userId() }
	},

	qCallback: function(){
		return {
			finished: function(index, fileInfo, context){
				Session.set('srv_img', fileInfo.name);
				alert("session set");
			}
		}
	}*/
});

Template.addQuest.created = function(){
	//Uploader.init(this);
};

Template.addQuest.rendered = function(){
    $('textarea').autosize();
   // Uploader.render.call(this);
};