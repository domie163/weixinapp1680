var Service = require('../core/service.js');

/**
 * 记录日志服务
 */
class Record_log extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "record_log",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Record_log
};
