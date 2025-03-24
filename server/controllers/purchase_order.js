var Controller = require('../core/controller.js');

/**
 * 购买订单控制器
 */
class Purchase_order extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './purchase_order/',
			// 选择的服务
			service: 'purchase_order',
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
Purchase_order.prototype.add = async function(ctx) {
	var result = await this.service.add(ctx.request.body, this.config);

	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	var max = await $.services["purchase_order"].get_list({}, {
		orderby: "`purchase_order_id` desc"
	});
	max = max[0]['purchase_order_id'];
	var select = await this.service.run("SELECT count(*) count FROM `experimental_consumables` INNER JOIN `purchase_order` ON experimental_consumables.consumable_number=purchase_order.consumable_number WHERE experimental_consumables.quantity_of_consumables < purchase_order.purchase_quantity AND purchase_order.purchase_order_id=".replace("&#60;","<")+max);
	if(select[0]['count'] > 0){
		var sql = "delete from "+"purchase_order"+" WHERE "+"purchase_order_id"+" =" + max;
		select = await this.service.run(sql);
		return {
			error: {message: "数量不足!"},
		};
	}
	await this.service.run("UPDATE `experimental_consumables` INNER JOIN `purchase_order` ON experimental_consumables.consumable_number=purchase_order.consumable_number SET experimental_consumables.quantity_of_consumables= experimental_consumables.quantity_of_consumables - purchase_order.purchase_quantity WHERE purchase_order.purchase_order_id=" + max);

	return {
		result,
	};
}


module.exports = Purchase_order;
