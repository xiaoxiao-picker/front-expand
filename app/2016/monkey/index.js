define(function(require, exports, module) {
	var template = require('./template.js');
	var Service = require('./../../scripts/service');
	var browser = require('./../../scripts/browser');

	var namespace = "xxoo.monkey";

	var strs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var monkeys = [{
		name: '猕小猴',
		avatar: 'shiwu/mixiaohou.jpg',
		desc: '主要特征：尾巴短，手脚长，做事速度超迅速。'
	}, {
		name: '金丝猴',
		avatar: 'shiwu/jinsihou.jpg',
		desc: '主要特征：毛发旺盛，鼻子上翘，猴子中的美猴王。'
	}, {
		name: '袖珍石猴',
		avatar: 'shiwu/xiuzhenshihou.jpg',
		desc: '主要特征：袖珍石猴号称猴子界中的射手座。'
	}, {
		name: '小指猴',
		avatar: 'shiwu/xiaozhihou.jpg',
		desc: '主要特征：小指猴四肢不发达，头脑也简单。'
	}, {
		name: '跳跳猴',
		avatar: 'shiwu/tiaotiaohou.jpg',
		desc: '主要特征：跳跳猴眼大无神，是非洲中的矮富帅。'
	}, {
		name: '享受猴',
		avatar: 'shiwu/xiangshouhou.jpg',
		desc: '主要特征：喜欢集体泡温泉，懂得享受猴生。'
	}, {
		name: '宝宝猴',
		avatar: 'shiwu/baobaohou.jpg',
		desc: '主要特征：宝宝猴眼神呆萌，天真无暇，一切事物都是美好的。'
	}, {
		name: '长毛猴',
		avatar: 'shiwu/changmaohou.jpg',
		desc: '主要特征：毛发旺盛，眼神呆滞，俗称猴界绿巨人。'
	}, {
		name: '长毛怪',
		avatar: 'shiwu/changmaoguaihou.jpg',
		desc: '主要特征：长毛怪行动缓慢，毛发旺盛，超级有力量的猴界钻石王老五。'
	}, {
		name: '大眼睛猴',
		avatar: 'shiwu/dayanjinghou.jpg',
		desc: '主要特征：眼睛深邃，可以看透世间红尘一切凡物。'
	}, {
		name: '笑笑猴',
		avatar: 'shiwu/xiaoxiaohou.jpg',
		desc: '主要特征：笑笑猴从来不知道烦恼是何物，永远用露齿8颗牙面对所有的事物。'
	}, {
		name: '嫌弃猴',
		avatar: 'cartoon/xianqi.jpg',
		desc: '万猴之王，挑食，品味独特。'
	}, {
		name: '贪吃猴',
		avatar: 'cartoon/tanchi.jpg',
		desc: '主要特征：蛀牙多，顽皮，全世界最正宗的吃货。'
	}, {
		name: '羞羞猴',
		avatar: 'cartoon/xiuxiu.jpg',
		desc: '主要特征：爱吃大香蕉，也很容易脸红。'
	}, {
		name: '军医猴',
		avatar: 'cartoon/junyi.jpg',
		desc: '主要特征：虽然很老，但热爱生活。'
	}, {
		name: '偷窥猴',
		avatar: 'cartoon/toukui.jpg',
		desc: '色色的猴子，但是经常有福利噢。'
	}, {
		name: '自恋猴',
		avatar: 'cartoon/zilian.jpg',
		desc: '主要特征：不穿衣服在森林里游走。'
	}, {
		name: '连体婴猴',
		avatar: 'cartoon/liantiying.jpg',
		desc: '一对亲密无间的亲兄妹。'
	}, {
		name: '任性猴',
		avatar: 'cartoon/renxing.jpg',
		desc: '非常有钱的猴子。'
	}, {
		name: '得意忘形猴',
		avatar: 'cartoon/deyiwangxing.jpg',
		desc: '自从护送完师傅去西天取经，这泼猴越来愈任性了。'
	}, {
		name: '手枪猴',
		avatar: 'cartoon/shouqiang.jpg',
		desc: '主要特征：打！打！打！'
	}, {
		name: '贵妇猴',
		avatar: 'cartoon/guifu.jpg',
		desc: '猴圈里最滋润的一只猴子。'
	}, {
		name: '网瘾猴',
		avatar: 'cartoon/wangyin.jpg',
		desc: '有网瘾的猴子，手机一没电就着急。'
	}, {
		name: '运动猴',
		avatar: 'cartoon/yundong.jpg',
		desc: '我运动！我快乐！运动快乐！健康成长！'
	}, {
		name: '绅士猴',
		avatar: 'cartoon/shenshi.jpg',
		desc: 'lady first ! lady first!!!'
	}, {
		name: '怪兽猴',
		avatar: 'cartoon/guaishou.jpg',
		desc: '虽然他长得像奥特曼，但是 我们确定他是怪兽。'
	}, {
		name: '肥皂猴',
		avatar: 'cartoon/feizao.jpg',
		desc: '他以为在监狱里能干羞羞的事情了。'
	}, {
		name: '夜猫猴',
		avatar: 'cartoon/yemao.jpg',
		desc: '昼伏夜出，夜猫一族的代表！'
	}, {
		name: '压岁猴',
		avatar: 'cartoon/yasui.jpg',
		desc: '如何才能拿到更多的压岁钱？'
	}, {
		name: '老炮儿猴',
		avatar: 'cartoon/laopaoer.jpg',
		desc: '这事儿我得和你掰扯掰扯。'
	}, {
		name: '忍者猴',
		avatar: 'cartoon/renzhe.jpg',
		desc: '变出大香蕉！'
	}, {
		name: '海贼猴',
		avatar: 'cartoon/haizie.jpg',
		desc: '我要当上海贼王的男人。'
	}, {
		name: '柯南猴',
		avatar: 'cartoon/kenan.jpg',
		desc: '福尔摩斯算什么！看我柯南！'
	}, {
		name: '外星猴',
		avatar: 'cartoon/waixing.jpg',
		desc: '来自呆萌星球。'
	}, {
		name: '刚果拉布拉多猴',
		avatar: 'cartoon/gangguolabuladuo.jpg',
		desc: '我可是我们族里最后一只猴子。'
	}, {
		name: '警察猴',
		avatar: 'cartoon/jingcha.jpg',
		desc: '隐藏在黑暗中的秘密啊。'
	}, {
		name: '山寨悟空',
		avatar: 'the/shanzhaiwukong.jpg',
		desc: '主要特征：形如悟空，实则山寨。乃广大猴儿争相模仿的对象。'
	}, {
		name: '星悟空',
		avatar: 'the/xingwukong.jpg',
		desc: '主要特征：第x代悟空继承人，眼神放空，脑洞清奇。'
	}, {
		name: '孙悟空',
		avatar: 'the/sunwukong.jpg',
		desc: '主要特征：两眼放光，身型矫健，乃猴中之王。'
	}, {
		name: '大嘴猴',
		avatar: 'the/dazuihou.jpg',
		desc: '主要特征：嘴大眼呆，得了一种嘴巴永远闭不上的病，特长卖萌。'
	}, {
		name: '悠嘻猴',
		avatar: 'the/youxihou.jpg',
		desc: '主要特征：头大身小，可萝莉，可御姐，是聊天时表情工具的好搭档。'
	}, {
		name: '大圣',
		avatar: 'the/dasheng.jpg',
		desc: '主要特征：脱胎换骨后的美猴王，不一样的王者归来。'
	}];

	var winHeight = $(window).height(); // $(window).width() * 627 / 375
	var winWidth = $(window).width();
	var pageOrigin = location.protocol + '//' + location.host;

	// application session(全局变量)
	var ApplicationSession;
	var monkey; // xxoo后生出来的猴子
	window.Application = {
		auth: function() {
			window.location.reload();
		},
		getSession: function() {
			return ApplicationSession;
		}
	};


	// 初始化页面
	(function init() {
		var firstName = search('firstName');
		var secondName = search('secondName');
		firstName = firstName ? decodeURIComponent(firstName) : '';
		secondName = secondName ? decodeURIComponent(secondName) : '';

		// 优先渲染页面
		if (firstName && secondName) {
			// 将名字进行MD5加密，并取最后两位字符串进行匹配猴子
			var md5Str = md5(firstName + secondName);
			var lastTwoStr = md5Str.substr(md5Str.length - 2, 2).toUpperCase();
			monkey = makeMonkeyAfterXXOO(lastTwoStr);

			renderMonkey(firstName, secondName, monkey);
		} else {
			renderXXOO();
		}

		(function resize() {
			$(window).on("resize." + namespace, function() {
				winHeight = $(window).height();
				winWidth = $(window).width();
				$(".full-page").height(winHeight);
			})
		})();

		// 会话初始化以及分享内容的数据可异步执行
		initSession(share);

		function share() {
			var shareData = monkey ? {
				title: firstName + ' 和 ' + secondName + '生猴子啦，他们生出的竟然是' + monkey.name + '。',
				imgUrl: pageOrigin + '/posters/2016/monkey/images/' + monkey.avatar,
				desc: monkey.desc,
				link: pageOrigin + '/posters/2016/monkey/index.html?share=true&firstName=' + encodeURIComponent(firstName) + "&secondName=" + encodeURIComponent(secondName)
			} : {
				title: '亲爱的，我想给你生猴子，但先预测一下生出的是什么猴好么。',
				imgUrl: pageOrigin + '/posters/2016/monkey/images/clickme.png',
				desc: '亲爱的，我想给你生猴子，但先预测一下生出的是什么猴好么。'
			}

			if (browser.wx) {
				initShare(shareData);
			}
		}
	})();


	function initSession(callback) {
		// 如果cookie中有session则优先验证该session，session中可能包含用户信息，以便以后提取
		// 如果没有session则创建session
		var session = store.get('userSession');
		if (session) {
			Service.authSession(session).done(function(result) {
				ApplicationSession = session;
				execute(callback);
			}).fail(function(error) {
				// 此处该是session过期（也可能是接口本身的问题，但是此问题应该规避）
				createSession(callback);
			});
		} else {
			createSession(callback);
		}

		function createSession(callback) {
			Service.createSession().done(function(data) {
				ApplicationSession = data.result;
				store.set('userSession', ApplicationSession);
				execute(callback);
			}).fail(function(error) {
				// 创建session的接口按理说不应该会报错，一旦真的发生了，提示管理员通知校校处理
				alert('服务器内部错误，请联系管理员');
			});
		}
	}



	function renderXXOO() {
		$('#container').html(template('app/2016/monkey/templates/xxoo', {
			winWidth: winWidth,
			winHeight: winHeight
		}));

		setTimeout(function() {
			$(document.body).animate({
				scrollTop: 0
			});
		}, 10)


		$("#btnClickmeToXO").on('click.' + namespace, function() {
			// 取消下雪
			window.SNOWLOOP && clearInterval(window.SNOWLOOP);

			$(".page-2").css({
				display: 'block',
				zIndex: 100,
				top: winHeight
			}).animate({
				top: 0
			}, 400, function() {
				$(".page-1").hide();
				$(".avatar-box >span").addClass("y");
			});
		});

		$("#btnXXOO").on("click." + namespace, function() {
			var name1 = $.trim($("#name1").val());
			var name2 = $.trim($("#name2").val());

			// 确保两个名字都已输入 
			if (!(name1 && name2)) return;

			window.location.href = "?firstName=" + encodeURIComponent(name1) + "&secondName=" + encodeURIComponent(name2);
		});

		require.async('./snow.js');
	}


	function renderMonkey(firstName, secondName, monkey) {
		$('#container').html(template('app/2016/monkey/templates/monkey', {
			winWidth: winWidth,
			winHeight: winHeight,
			firstName: firstName,
			secondName: secondName,
			monkey: monkey,
			share: search('share') == 'true'
		}));

		$("#btnShare").on("click." + namespace, function() {
			$(".share-box").show().one("click." + namespace, function() {
				$(this).hide();
			});
		});
	}



	// 初始化微信分享数据
	function initShare(shareData) {
		var url = window.location.origin + window.location.pathname + window.location.search;

		$.when(Service.getPublicAppId(), Service.JSSDKSignature(url)).done(function(data1, data2) {
			var appId = data1.result;
			require.async("wxsdk", function(wx) {
				wx.config({
					appId: appId,
					timestamp: data2.result.timestamp,
					nonceStr: data2.result.nonceStr,
					signature: data2.result.signature,
					jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
				});
				wx.ready(function() {
					wx.onMenuShareAppMessage(shareData);
					wx.onMenuShareTimeline(shareData);
				});
				wx.error(function(error) {
					console && console.log && console.log(error);
				});
			});
		}).fail(function(error) {
			// 错误处理
		});
	}


	// 根据两位字符串获取猴子
	function makeMonkeyAfterXXOO(str) {
		var firstCode = str.substr(0, 1);
		var secondCode = str.substr(1, 1);

		var firstIndex = strs.indexOf(firstCode);
		var secondIndex = strs.indexOf(secondCode);

		var resultIndex = firstIndex * secondIndex;

		return monkeys[resultIndex % monkeys.length];
	}


	// 获取URL参数
	function search(key) {
		var url = window.location.href.replace(new RegExp(/(\/)+/g), "/");
		if (!key) return "";
		var tmpReg = new RegExp("[\\?\\&]" + key + "=([\\w\\d\\%\\.\\-\u4e00-\u9fa5]*)[|&]*");
		var result = url.replace(new RegExp(/(\/)+/g), "/").match(tmpReg);
		return result ? result[1] : "";
	}



	// 执行函数
	function execute(fnc) {
		fnc && $.isFunction(fnc) && fnc();
	}
});