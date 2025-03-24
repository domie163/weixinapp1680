var Controller = require('../core/controller.js');

/**
 * 下载
 */
class Download extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './download/',
			// 选择的服务
			service: 'upload'
		}, config));
	}
}

/**
 * 下载文件
 */
Download.prototype.index = async (ctx, next) => {
	const path = "static" + ctx.query.src;
	ctx.attachment(path);
	await ctx.send(path);
};

module.exports = Download;
