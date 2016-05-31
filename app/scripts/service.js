define(function(require, exports, module) {
	var ajax = require("ajax");

	exports.createSession = function() {
		return ajax({
			url: 'session/create'
		}, {
			description: "创建会话"
		});
	};

	exports.authSession = function(session) {
		return ajax({
			url: 'session/get-user',
			data: {
				session: session
			}
		}, {
			description: "验证会话"
		});
	};


	exports.getPublicAppId = function() {
		return ajax({
			url: 'application/public-app-id'
		}, {
			description: "获取微信唯一标识"
		});
	};

	// 获取微信JS-SDK签名
	exports.JSSDKSignature = function(url) {
		return ajax({
			url: 'application/js-api-signature',
			data: {
				url: url
			}
		}, {
			description: "获取微信签名"
		});
	};
});