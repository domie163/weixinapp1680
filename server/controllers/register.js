const md5 = require("md5");
var Controller = require("../core/controller.js");

/**
 * 登录
 */
class Register extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./register/",
					// 选择的服务
					service: "user",
				},
				config
			)
		);
	}
}

/**
 * 注册页
 * @param {Object} ctx http请求上下文
 */
Register.prototype.index = async function(ctx) {
	var group_list = await $.services["user_group"].get_list({}, Object.assign({}, this.config));
	return await ctx.render(this.config.tpl + "index.html", {
		group_list
	});
};

/**
 * 注册API
 * @param {Object} ctx http请求上下文
 */
Register.prototype.api = async function(ctx) {
	var user = $.services.user;
	var body = ctx.request.body;
	var username = body.username;
	var obj = await user.get_obj({
		username
	});
	if (obj) {
		return {
			error: {
				code: 70000,
				message: "账户名已存在",
			},
		};
	} else {
		var password = md5(body.password);
		var nickname = body.nickname;
		var user_group = body.user_group;
		var email = body.email;
		var email_state= body.hasOwnProperty('email_state') ? body.email_state : 0;
		var phone = body.phone;
		var phone_state= body.hasOwnProperty('phone_state') ? body.phone_state : 0;
		var avatar = body.avatar;
		var bl_reg = await user.add({
			username,
			password,
			nickname,
			user_group,
			email,
			email_state,
			phone,
			phone_state,
			avatar
		});
		if (bl_reg) {
			return {
				result: "注册成功"
			};
		} else {
			return {
				error: {
					code: 70000,
					message: "注册失败",
				},
			};
		}
	}
};

module.exports = Register;
