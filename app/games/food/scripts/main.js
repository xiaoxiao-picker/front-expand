(function($) {
	var shareId = 5;
	var session, appId, wx_config;
	var pageData;

	getSession(function(data) {
		session = data.session;
		getPageStatistics(function(data) {
			pageData = data.result;

			getAppId(function(data) {
				appId = data.result;
				getSignature(function(data) {
					wx_config = data.result;
					WXConfig();
				}, 3);
			}, 3);
		}, 3);
		addView();
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

	function addView() {
		$.ajax({
			url: "/api/share/" + shareId + "/view/add?session=" + session,
			type: "post"
		});
	}

	function addShare() {
		$.ajax({
			url: "/api/share/" + shareId + "/share/add?session=" + session,
			type: "post"
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
		// 页面统计数据
	function getPageStatistics(success, times) {
		if (times <= 0) return;
		$.ajax({
			url: '/api/share/' + shareId + '/get?session=' + session,
			dataType: 'json',
			success: success,
			error: function() {
				getPageStatistics(success, --times);
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
					WXListener("旦苑的吃货");
				}
			});
		});

		function WXListener(title) {
			// if (!title) {
			// 	if (nowwrong == 0) title = "玩转旦旦校庆，我在光华楼答题获得了A的成绩！";
			// 	else if (nowwrong <= 2) title = "玩转旦旦校庆，我在光华楼答题获得了A-的成绩！";
			// 	else if (nowwrong <= 4) title = "玩转旦旦校庆，我在光华楼答题获得了B+的成绩！";
			// 	else if (nowwrong <= 6) title = "玩转旦旦校庆，我在光华楼答题获得了B的成绩！";
			// 	else if (nowwrong <= 8) title = "玩转旦旦校庆，我在光华楼答题获得了B-的成绩！";
			// 	else if (nowwrong <= 9) title = "玩转旦旦校庆，我在光华楼答题获得了C+的成绩！";
			// 	else if (nowwrong <= 10) title = "玩转旦旦校庆，我在光华楼答题获得了C的成绩！";
			// 	else if (nowwrong <= 11) title = "玩转旦旦校庆，我在光华楼答题获得了C-的成绩！";
			// 	else if (nowwrong <= 12) title = "玩转旦旦校庆，我在光华楼答题获得了D的成绩！";
			// 	else title = "玩转旦旦校庆，我在光华楼答题获得了F的成绩！";
			// }

			title = "玩转旦旦校庆！我获得了" + totalPoint + "的分数，是第" + (pageData.totalView + 1) + "个在旦苑填饱肚子的复旦人！"

			var share = {
				title: title,
				desc: '来旦苑刷出你的分数，截朋友圈成绩分享画面，发至团团在复旦，(微信公众号fudangongqingtuan)得分前十名将获得精美校庆礼品哦~',
				link: window.location.origin + "/posters/games/food/index.html",
				imgUrl: window.location.origin + '/posters/games/food/pre-background.png',
				success: function(res) {
					addShare();
				}
			};
			wx.onMenuShareTimeline(share);
			wx.onMenuShareAppMessage(share);
			wx.onMenuShareQQ(share);
			wx.onMenuShareWeibo(share);
		}

		window.WXListener = WXListener;
	}
})($);