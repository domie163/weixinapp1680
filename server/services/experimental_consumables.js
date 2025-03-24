var Service = require('../core/service.js');

/**
 * 实验耗材服务
 */
class Experimental_consumables extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "experimental_consumables",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Experimental_consumables
};
