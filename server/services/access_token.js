var Service = require('../core/service.js');

/**
 * 临时访问牌
 */
class Access_token extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "access_token",
			// 分页大小
			size: 10
		}, config));
	}
}

module.exports = {
	Access_token
};
