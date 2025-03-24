var Service = require('../core/service.js');

/**
 * 实验室服务
 */
class Laboratory extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "laboratory",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Laboratory
};
