(function($) {
	var shareId = 4;
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
					WXListener("决胜！光华之巅");
				}
			});
		});

		function WXListener(title) {
			if (!title) {
				if (nowwrong == 0) title = "玩转旦旦校庆，我在光华楼答题获得了A的成绩！";
				else if (nowwrong <= 2) title = "玩转旦旦校庆，我在光华楼答题获得了A-的成绩！";
				else if (nowwrong <= 4) title = "玩转旦旦校庆，我在光华楼答题获得了B+的成绩！";
				else if (nowwrong <= 6) title = "玩转旦旦校庆，我在光华楼答题获得了B的成绩！";
				else if (nowwrong <= 8) title = "玩转旦旦校庆，我在光华楼答题获得了B-的成绩！";
				else if (nowwrong <= 9) title = "玩转旦旦校庆，我在光华楼答题获得了C+的成绩！";
				else if (nowwrong <= 10) title = "玩转旦旦校庆，我在光华楼答题获得了C的成绩！";
				else if (nowwrong <= 11) title = "玩转旦旦校庆，我在光华楼答题获得了C-的成绩！";
				else if (nowwrong <= 12) title = "玩转旦旦校庆，我在光华楼答题获得了D的成绩！";
				else title = "玩转旦旦校庆，我在光华楼答题获得了F的成绩！";
			}

			var share = {
				title: title,
				desc: '复旦光华楼，得名于“日月光华，旦复旦兮”。总高142米，地上30层，地下2层，被誉为“中国高校第一楼”。其楼之高，其风之猛，都是我旦学子引以为傲之处。校友们纷纷表示，校庆日必做之事，就是登上光华楼顶，俯瞰魔都。',
				link: window.location.origin + "/posters/games/question/index.html",
				imgUrl: window.location.origin + '/posters/games/question/images/bg.jpg?v=1',
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