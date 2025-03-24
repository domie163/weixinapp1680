var Controller = require("../core/controller.js");

/**
 * 媒体
 */
class Media extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./media/",
					// 选择的服务
					service: "upload",
					// 
					get: ["video", "image", "audio"]
				},
				config
			)
		);
	}
}

/**
 * 视频预览
 * @param {Object} ctx http上下文
 */
Media.prototype.video = async function(ctx) {
	var model = await this.model(ctx, {});
	return await ctx.render(this.config.tpl + "video", model);
};

/**
 * 图片预览
 * @param {Object} ctx http上下文
 */
Media.prototype.image = async function(ctx) {
	var model = await this.model(ctx, {});
	return await ctx.render(this.config.tpl + "image", model);
};

/**
 * 音频预览
 * @param {Object} ctx http上下文
 */
Media.prototype.audio = async function(ctx) {
	var model = await this.model(ctx, {});
	return await ctx.render(this.config.tpl + "audio", model);
};

module.exports = Media;
