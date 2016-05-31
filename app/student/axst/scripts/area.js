define(function(require, exports, module) {
	var Helper = require("helper");
	$(document).on("click", ".area-container a", function() {
		Helper.alert("该报名已结束！");
	});
	var areas = [{
		title: '浦东新区',
		id: 375
	}, {
		title: '徐汇区',
		id: 376
	}, {
		title: '长宁区',
		id: 377
	}, {
		title: '普陀区',
		id: 378
	}, {
		title: '闸北区',
		id: 379
	}, {
		title: '虹口区',
		id: 380
	}, {
		title: '杨浦区',
		id: 381
	}, {
		title: '黄浦区',
		id: 382
	}, {
		title: '静安区',
		id: 383
	}, {
		title: '闵行区',
		id: 384
	}, {
		title: '宝山区',
		id: 385
	}, {
		title: '嘉定区',
		id: 386
	}, {
		title: '金山区',
		id: 387
	}, {
		title: '松江区',
		id: 388
	}, {
		title: '青浦区',
		id: 389
	}, {
		title: '奉贤区',
		id: 390
	}, {
		title: '崇明县',
		id: 391
	}];

	$(document).ready(function() {

		var _html = "";
		$.each(areas, function(idx, area) {
			_html += '<div class="area-box"><a href="javascript:void(0);"><span>' + area.title + '</span><img class="arrow-img" src="./images/arrow.png" alt=""></a></div>';
			// _html += '<div class="area-box"><a href="/index.html#organization/2221/events&category=' + area.id + '&title=爱心暑托班志愿者报名"><span>' + area.title + '</span><img class="arrow-img" src="./images/arrow.png" alt=""></a></div>';
		});

		$(_html).appendTo('body .area-container');

	});
});