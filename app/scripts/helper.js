define(function(require, exports, module) {
	function matchSearch(url, key) {
		if (!key) return "";
		var tmpReg = new RegExp("[\\?\\&]" + key + "=([\\w\\d\\%\\.\\-\u4e00-\u9fa5]*)[|&]*");
		var result = url.replace(new RegExp(/(\/)+/g), "/").match(tmpReg);
		return result ? result[1] : "";
	}
	exports.param = {
		search: function(key) {
			var search = window.location.href.replace(new RegExp(/(\/)+/g), "/");
			return matchSearch(search, key);
		}
	};
});