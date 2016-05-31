define(function(require, exports, module) {
	var Service = require("service");
	var session = store.get("userSession");

	function jumpToLogin() {
		var redirectUrl = redirectUrl || encodeURIComponent(window.location.href);
		window.location.href = "/login.html?redirect=" + redirectUrl;
	}

	module.exports = function(callback) {
		if (!session) {
			return jumpToLogin();
		}

		Service.authSession(session).done(function(data) {
			if (!data.result) {
				return jumpToLogin();
			}
			var user = data.result;
			window.Application = {
				getSession: function() {
					return session;
				}
			};
			callback.call(this, user);
		}).fail(function(error) {
			alert(error);
		}).always();
	}
});