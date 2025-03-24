var Controller = require("../core/controller.js");

/**
 * 点击
 */
class Hits extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./hits/",
					// 选择的服务
					service: "hits",
				},
				config
			)
		);
	}
}

module.exports = Hits;
