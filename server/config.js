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