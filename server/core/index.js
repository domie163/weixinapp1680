var config = require('../config.js');

if (!global.$) {
	global.$ = {};
}
$.config = config;

Date.prototype.toStr = function (format) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds(),
	};
	if (/(y+)/.test(format)) {
		var x = RegExp.$1;
		format = format.replace(x, (this.getFullYear() + "").substr(4 - x.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			var x = RegExp.$1;
			format = format.replace(x, x.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

module.exports = {

};
