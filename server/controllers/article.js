var Controller = require("../core/controller.js");

/**
 * 文章
 */
class Article extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign(
				{
					// 选择的模板那路径模板
					tpl: "./article/",
					// 选择的服务
					service: "article",
					// 互动
					interact: ["praise", "comment", "hits", "score", "collect"],
				},
				config
			)
		);
	}
}

/**
 * 列表页面
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Article.prototype.list = async function (ctx) {
	var query = ctx.request.query;
	var {
		field, page, size, orderby
	} = query;
	delete query.field;
	delete query.page;
	delete query.size;
	delete query.orderby;
	// 文章列表
	var list = await this.service.get_list(
		query,
		Object.assign({
		}, this.config, {
			field,
			page,
			size,
			orderby,
		})
	);
	
	// 获取点击量列表
	var hot_list = await this.service.get_list({},
		Object.assign({}, this.config, {
			field: "article_id,description,hits,create_time,author,title,img,url",
			page: 1,
			size: 10,
			orderby: "hits desc",
		})
	);

	// 获取分类
	var article_type = await $.services.article_type.get_list(
		{
		},
		Object.assign({
		}, this.config, {
			page: 1,
			size: 5,
		})
	);
	
	// 放入模型中
	var model = await this.model(ctx, {
		list,
		hot_list,
		article_type,
	});


	return await ctx.render(this.config.tpl + "list", model);
};

/**
 * 展示页面
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Article.prototype.view = async function (ctx) {
	var query = ctx.request.query;
	var {
		field
	} = query;
	delete query.field;
	
	// 获取目标对象
	var obj = await this.service.get_obj(
		query,
		Object.assign({
		}, this.config, {
			field,
		})
	);
	
	// 点击量排序列表
	var hot_list = await this.service.get_list({},
		Object.assign({}, this.config, {
			field: "article_id,description,hits,create_time,author,title,img,url",
			page: 1,
			size: 10,
			orderby: "hits desc",
		})
	);
	// 获取分类
	var article_type = await $.services.article_type.get_list(
		{
		},
		Object.assign({
		}, this.config, {
			page: 1,
			size: 5,
		})
	);

	// 获取上一条集合
	var prev_list = await this.service.prev("article_id", obj.article_id);
	var prev = prev_list.length ? prev_list[0] : {};
	
	// 获取下一条集合
	var next_list = await this.service.next("article_id", obj.article_id);
	var next = next_list.length ? next_list[0] : {};
	
	var model = await this.model(ctx, {
		obj,
		hot_list,
		article_type,
		prev,
		next,
	});

	// 判断是否有点击量要求
	if (this.config.interact && this.config.interact.indexOf("hits") != -1) {
		// 点击数+1
		this.service.set(obj, {
			hits: obj.hits + 1,
		});
	}

	return await ctx.render(this.config.tpl + "view", model);
};

module.exports = Article;
