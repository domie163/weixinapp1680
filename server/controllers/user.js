var Controller = require('../core/controller.js');
const md5 = require("md5");

/**
 * 用户
 */
class User extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(Object.assign({
			// 选择的模板那路径模板
			tpl: './user/',
			// 选择的服务
			service: 'user',
			// 注册get API路由
			get_api: ["state", "quit"]
		}, config));
	}
}

/**
 * 获取用户登录状态
 * @param {Object} ctx http请求上下文
 */
User.prototype.state = async function(ctx) {
	var token = ctx.headers["x-auth-token"];
	// 根据登录态获取用户ID
	var access_token =  await $.services.access_token.get_obj({token});
	if(access_token && access_token.user_id ){
		var user = await this.service.get_obj({"user_id":access_token.user_id});
		if (user) {
			user.token = token;
			return {
				result: {obj: user}
			}
		} else {
			return {
				error: {
					code: 50000,
					message: "账户未登录！"
				}
			}
		}
	}else {
		return {
			error: {
				code: 50000,
				message: "账户未登录！"
			}
		}
	}
};

/**
 * 退出登录
 * @param {Object} ctx http请求上下文
 */
User.prototype.quit = async function(ctx) {
	var user = ctx.session.user;
	if (user) {
		ctx.session.user = null;
		var token = ctx.headers["x-auth-token"];
		if (token) {
			var service = $.services["access_token"];
			await service.del({
				token
			});
		}
		return {
			result: {
				bl: true,
				tip: "已退出"
			}
		}
	} else {
		return {
			error: {
				code: 50000,
				tip: "账户未登录！"
			}
		}
	}
};

/**
 * 添加用户
 */
User.prototype.add = async function(ctx) {
	ctx.request.body.password = md5(ctx.request.body.password);
	var result = await this.service.add(ctx.request.body, this.config);

	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}

	return {
		result,
	};
}

module.exports = User;
