var Controller = require("../core/controller.js");

/**
 * 文章类型
 */
class Article_type extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./article_type/",
					// 选择的服务
					service: "article_type",
				},
				config
			)
		);
	}
}

module.exports = Article_type;
