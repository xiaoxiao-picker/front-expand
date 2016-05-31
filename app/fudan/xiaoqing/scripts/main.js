(function($) {
	var shareId=2;
	var session, appId, wx_config;
	var pageData;

	getSession(function(data) {
		session = data.session;
		getPageStatistics(function(data) {
			pageData = data.result;
			// $("#Views").html("参与人数：" + pageData.totalView);
			// $("#Shares").html("分享人数：" + pageData.totalShare);
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

	function addView(){
		$.ajax({
			url: "/api/share/"+shareId+"/view/add?session="+session,
			type: "post"
		});
	}
	function addShare(){
		$.ajax({
			url: "/api/share/"+shareId+"/share/add?session="+session,
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
			url: '/api/share/'+shareId+'/get?session=' + session,
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
			var share = {
				title: '参加校庆升旗仪式，我是第' + (pageData.totalShare+1) + '位为复旦庆生人，分享祝福母校',
				desc: '一百一十年的复旦，讲不完的故事，道不完的传奇。复旦大学学生会邀请海内外的校友有空回家看看，为母校110岁生日献上祝福。在晨光熹微中，共赏旦复旦的日月华章',
				link: window.location.origin + "/posters/fudan/xiaoqing/index.html",
				imgUrl: window.location.origin +'/posters/fudan/xiaoqing/images/flag.jpg',
				success: function(res) {
					addShare();
				}
			};
			wx.onMenuShareTimeline(share);
			wx.onMenuShareAppMessage(share);
			wx.onMenuShareQQ(share);
			wx.onMenuShareWeibo(share);
		}
	}
})(jQuery);