var Controller = require("../core/controller.js");

/**
 * 管理后台
 */
class Admin extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./admin/",
					// 选择的服务
					service: "admin",
				},
				config
			)
		);
	}
}

// 用户数，访问次数，营业额，消费人数统计，销售量，订单数
Admin.prototype.index = async function(ctx) {
	// 总用户数
	var user_count = await $.services["user"].count();

	// 总文章数
	var article_count = await $.services["article"].count();
	
	// 分类文章数
	var article_type_num = await $.services["article"].count_group({}, {
		groupby: "type"
	});
	
	// 最近7日注册用户
	var register_7day = await $.services["user"].date_comput({}, {
		date_key: "create_time",
		size: 7
	});
	// console.log(register_7day);
	
	// 最近7日订单量
	var order_7day = await $.services["order"].date_comput({}, {
		date_key: "create_time",
		size: 7
	});
	// console.log(order_7day);
	
	// 最近7日营业额
	var revenue_7day = await $.services["order"].date_comput({}, {
		date_key: "create_time",
		method: "sum",
		field: "price_count",
		size: 7
	});
	// console.log(revenue_7day);

	// 最近7日总销量
	var sales_7day = await $.services["order"].date_comput({}, {
		date_key: "create_time",
		method: "sum",
		field: "price_count",
		size: 7
	});

	// 商品分类销量
	var goods_type_sales = await $.services["goods"].sum_group({}, {
		groupby: "type",
		field: "sales"
	});

	// 模型传入
	var model = await this.model(ctx, {
		user_count,
		article_count,
		register_7day,
		order_7day,
		revenue_7day,
		sales_7day,
		goods_type_sales,
		article_type_num
	});

	return await ctx.render(this.config.tpl + "index", model);
};

module.exports = Admin;
