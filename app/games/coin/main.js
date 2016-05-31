(function($) {
	var shareId = 3;
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
					WXListener();
				}
			});
		});

		function WXListener() {
			var title;
			if (nowscore >= 95) title = "玩转旦旦校庆，我在本超扫码获得了A的成绩！";
			else if (nowscore >= 90) title = "玩转旦旦校庆，我在本超扫码获得了A-的成绩！";
			else if (nowscore >= 85) title = "玩转旦旦校庆，我在本超扫码获得了B+的成绩！";
			else if (nowscore >= 80) title = "玩转旦旦校庆，我在本超扫码获得了B的成绩！";
			else if (nowscore >= 75) title = "玩转旦旦校庆，我在本超扫码获得了B-的成绩！";
			else if (nowscore >= 70) title = "玩转旦旦校庆，我在本超扫码获得了C+的成绩！";
			else if (nowscore >= 65) title = "玩转旦旦校庆，我在本超扫码获得了C的成绩！";
			else if (nowscore >= 60) title = "玩转旦旦校庆，我在本超扫码获得了C-的成绩！";
			else if (nowscore >= 55) title = "玩转旦旦校庆，我在本超扫码获得了D+的成绩！";
			else if (nowscore >= 50) title = "玩转旦旦校庆，我在本超扫码获得了D的成绩！";
			else title = "玩转旦旦校庆，我在本超扫码获得了F的成绩！";
			var share = {
				title: title,
				desc: '来本超刷出你的绩点，在朋友圈秀出你的称号。截朋友圈成绩分享画面，发送至团团在复旦（微信号fudangongqingtuan），获“A”的前十位将获得精美校名礼品，其余成绩也将随机抽取赠与校名礼品哦！',
				link: window.location.origin + "/posters/games/coin/index.html",
				imgUrl: window.location.origin + '/posters/games/coin/collectcoin/bg.jpg?v=1',
				success: function(res) {
					addShare();
				}
			};
			wx.onMenuShareTimeline(share);
			wx.onMenuShareAppMessage(share);
			wx.onMenuShareQQ(share);
			wx.onMenuShareWeibo(share);
			console && console.log && console.log(title);
		}

		window.WXListener = WXListener;
	}
})(jQuery);