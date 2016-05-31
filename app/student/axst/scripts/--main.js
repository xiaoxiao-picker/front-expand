(function($) {
	var session, appId, wx_config;

	getSession(function(data) {
		session = data.session;

		getAppId(function(data) {
			appId = data.result;
			getSignature(function(data) {
				wx_config = data.result;
				WXConfig();
			}, 3);
		}, 3);
	}, 3);


	function getSession(success, times) {
		if (times <= 0) return;
		$.ajax({
			url: '/api/session/create',
			dataType: 'json',
			success: success,
			error: function() {
				getSession(success, --times);
			}
		});
	}


	function getAppId(success, times) {
		if (times <= 0) return;
		$.ajax({
			url: '/api/application/wechat/app_id?session=' + session,
			dataType: 'json',
			success: success,
			error: function() {
				getSignature(success, --times);
			}
		});
	}

	function getSignature(success, times) {
		if (times <= 0) return;
		$.ajax({
			url: '/api/application/wechat/js/signature/get?session=' + session + '&url=' + encodeURIComponent(window.location.origin + window.location.pathname + window.location.search),
			dataType: 'json',
			success: success,
			error: function() {
				getSignature(success, --times);
			}
		});
	}


	function WXConfig() {
		wx.config({
			debug: false,
			appId: appId,
			timestamp: wx_config.timestamp,
			nonceStr: wx_config.nonceStr,
			signature: wx_config.signature,
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem'
			]
		});

		wx.ready(function() {
			wx.checkJsApi({
				jsApiList: [
					'getNetworkType'
				],
				success: function(res) {
					WXListener();
				}
			});
		});

		function WXListener() {
			var share = {
				title: '上海市2015年爱心暑托班－高中生志愿者报名',
				desc: '上海市2015年爱心暑托班－高中生志愿者报名',
				link: window.location.origin + "/posters/student/axst/index.html",
				imgUrl: window.location.origin + '/posters/student/axst/images/welcome.jpg'
			};
			wx.onMenuShareTimeline(share);
			wx.onMenuShareAppMessage(share);
			wx.onMenuShareQQ(share);
			wx.onMenuShareWeibo(share);
		}
	}
})(jQuery);