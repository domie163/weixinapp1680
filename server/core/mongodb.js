const mongodb = require('mongodb');

/**
 * 控制器父类
 */
class Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		this.config = Object.assign({
			// 表名
			table: "",
			// 页码
			page: 1,
			// 分页大小
			size: 30
		}, config);
	}

	/**
	 * 首页
	 * @param {Object} ctx
	 */
	index(ctx) {

	}

	/**
	 * 列表页面
	 * @param {Object} ctx
	 */
	list(ctx) {

	}

	/**
	 * 详情页面
	 * @param {Object} ctx
	 */
	view(ctx) {

	}

	/**
	 * 增
	 * @param {Object} ctx
	 */
	add(ctx) {

	}

	/**
	 * 删
	 * @param {Object} ctx
	 */
	del(ctx) {

	}

	/**
	 * 改
	 * @param {Object} ctx
	 */
	set(ctx) {

	}

	/**
	 * 查多条
	 * @param {Object} ctx
	 */
	get_list(ctx) {

	}

	/**
	 * 查一条
	 * @param {Object} ctx
	 */
	get_obj(ctx) {

	}
}


module.exports = Service;
