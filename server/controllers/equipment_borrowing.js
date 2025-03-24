var Controller = require('../core/controller.js');

/**
 * 设备借用控制器
 */
class Equipment_borrowing extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './equipment_borrowing/',
			// 选择的服务
			service: 'equipment_borrowing',
			// 互动
			interact: [undefined],
		}, config));
	}
}
/**
 * 重写增加方法
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Equipment_borrowing.prototype.add = async function(ctx) {
	var result = await this.service.add(ctx.request.body, this.config);

	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}

	return {
		result,
	};
}


module.exports = Equipment_borrowing;
