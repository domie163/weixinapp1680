var Controller = require('../core/controller.js');

/**
 * 用户组
 */
class User_group extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './user_group/',
			// 选择的服务
			service: 'user_group'
		}, config));
	}
}

module.exports = User_group;
