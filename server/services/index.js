var Service = require('../core/service.js');

/**
 * 用户类
 */
class Index extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "user_account",
			// 分页大小
			size: 10
		}, config));
	}
}

module.exports = {
	Index
};
