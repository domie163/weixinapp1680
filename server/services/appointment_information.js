var Service = require('../core/service.js');

/**
 * 预约信息服务
 */
class Appointment_information extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "appointment_information",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Appointment_information
};
