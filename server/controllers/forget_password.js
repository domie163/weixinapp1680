const md5 = require("md5");
var Controller = require("../core/controller.js");

/**
 * 找回密码
 */
class Forget_password extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./forget_password/",
					// 选择的服务
					service: "user",
				},
				config
			)
		);
	}
}

/**
 * 找回密码API
 * @param {Object} ctx http请求上下文
 */
Forget_password.prototype.api = async function(ctx) {
	var user = $.services.user;
	var body = ctx.request.body;
	var username = body.username;
	var email = body.email ? body.email : "";
	var obj = await user.get_obj({
		username,
		email
	});
	if (obj) {
		var password = md5(body.password);
		var bl_for = await user.set({
			username
		}, {
			password
		});
		if (bl_for) {
			return {
				result: "修改成功"
			};
		} else {
			return {
				error: {
					code: 70000,
					message: "修改失败",
				},
			};
		}
	} else {
		return {
			error: {
				code: 70000,
				message: "账户不存在或邮箱错误",
			}
		};
	}
};

module.exports = Forget_password;
