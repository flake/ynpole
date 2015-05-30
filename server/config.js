ServiceConfiguration.configurations.remove({
	service: "facebook"
});

ServiceConfiguration.configurations.insert({
	service: "facebook",
	appId: "1375718669423207",
	secret: "f50d75922a13885d1195b7957698ae3d"
});

Avatar.options = {
	fallbackType: "default image",
	defaultImageUrl: "img/default-avatar.png"
};

/*
var meldDBCallback = function(src_user_id, dst_user_id){
    Meteor.users.update({user_id: src_user_id}, {$set: {user_id: dst_user_id}}, {multi: true});
};

AccountsMeld.configure({
    askBeforeMeld: true,
    meldDBCallback: meldDBCallback
}); */