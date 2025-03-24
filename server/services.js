const path = require("path");
const fs = require("fs");
var services = {};

// 配置服务路径
var service_dir = path.join(__dirname, "services");

/**
 * 遍历获取文件并回调函数
 * @param {Object} dir
 */
function foreach_file(dir, func) {
	let arr = fs.readdirSync(dir);
	arr.forEach((val, idx) => {
		let ph = fs.statSync(dir + '/' + val);
		if (ph.isDirectory()) {
			// 如果是目录则继续循环
			foreach_file(ph, func);
		} else {
			// 如果是文件则执行回调函数
			func(dir, val);
		}
	});
}


/**
 * 加载模块
 * @param {String} dir 目录
 * @param {String} file 文件名
 */
function loadModule(dir, filename) {
	var file = path.join(dir, filename);
	var dict = require(file);
	
	for (var k in dict) {
		services[k.toLowerCase()] = new dict[k]();
	}
}

foreach_file(service_dir, loadModule);


module.exports = services;
