var Service = require('../core/service.js');

/**
 * 注册用户服务
 */
class Registered_users extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "registered_users",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Registered_users
};
