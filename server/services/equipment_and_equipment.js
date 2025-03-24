var Service = require('../core/service.js');

/**
 * 设备器材服务
 */
class Equipment_and_equipment extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "equipment_and_equipment",
			// 分页大小
			size: 1
		}, config));
	}
}

module.exports = {
	Equipment_and_equipment
};
