var Service = require('../core/service.js');

/**
 * 评论
 */
class Comment extends Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 操作的表
			table: "comment",
			// 分页大小
			size: 0
		}, config));
	}
}

module.exports = {
	Comment
};
