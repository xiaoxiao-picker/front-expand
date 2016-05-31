define(function(require, exports, module) {
	var Helper = require("helper");
	var globalResponseHandler = require('ajax');
	var browser = require("browser");

	var UserAuth = require('UserAuth');
	var Service = require('service');

	var shareId = 3;
	var organizationId = Helper.param.search("oid");
	var lotteryId = Helper.param.search("lid");
	var awardId = Helper.param.search("aid");
	var URL = window.location.origin + window.location.pathname + window.location.search;
	var AwardInfo;


	function getAwardInfo() {
		return globalResponseHandler({
			url: 'lottery/' + lotteryId + '/award/' + awardId + '/get'
		}, {
			description: "获取中奖结果详情"
		});
	}

	function checkAward() {
		return globalResponseHandler({
			url: 'lottery/' + lotteryId + '/award/' + awardId + '/check'
		}, {
			description: "检查是否为本人中奖奖品"
		});
	}

	function getPublicAppId() {
		Service.getPublicAppId();
	}

	function WXConfig(config) {
		wx.config({
			debug: false,
			appId: config.publicAppId,
			timestamp: config.timestamp,
			nonceStr: config.nonceStr,
			signature: config.signature,
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
					'checkJsApi'
				],
				success: function(res) {
					var share = {
						title: AwardInfo.isWinner ? "我抽到了" + AwardInfo.name + "，快去试试你的手气吧！" : "奖品链接 - " + AwardInfo.name,
						desc: AwardInfo.description,
						link: window.location.origin + '/posters/lottery/award.html?oid=' + organizationId + '&lid=' + lotteryId + '&aid=' + awardId,
						imgUrl: AwardInfo.portraitUrl || AwardInfo.portraitLotteryUrl
					};
					wx.onMenuShareTimeline(share);
					wx.onMenuShareAppMessage(share);
					wx.onMenuShareQQ(share);
					wx.onMenuShareWeibo(share);
				}
			});
		});
	}



	UserAuth(function() {
		$.when(getAwardInfo(), checkAward()).done(function(data1, data2) {
			AwardInfo = data1.result;
			AwardInfo.isWinner = data2.result;
			$("#frontLoading").hide();

			if (!AwardInfo.isWinner) {
				return window.location.href = window.location.origin + '/index.html#organization/' + organizationId + '/lottery/' + lotteryId + '/draw';
			} else {
				// return window.location.href = AwardInfo.lotteryTicketUrl;
			}

			var iframe = document.getElementById("iframe");
			iframe.src = AwardInfo.lotteryTicketUrl;


			if (!browser.wx) {
				$.when(Service.getPublicAppId(), Service.JSSDKSignature(URL)).done(function(data1, data2) {
					WXConfig({
						appId: data1.result,
						timestamp: data2.result.timestamp,
						nonceStr: data2.result.nonceStr,
						signature: data2.result.signature
					});
				}).fail(function(error) {
					alert(error);
				});
			}

		}).fail(function(error) {
			alert(error);
		});

	});
});