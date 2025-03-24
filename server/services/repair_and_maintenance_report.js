var Service = require('../core/service.js');

/**
 * 报修检修服务
 */
class Repair_and_maintenance_report extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "repair_and_maintenance_report",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Repair_and_maintenance_report
};
