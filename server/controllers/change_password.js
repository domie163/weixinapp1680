const md5 = require("md5");
var Controller = require("../core/controller.js");

/**
 * 修改密码
 */
class Change_password extends Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 传参给父类构造函数
		super(
			Object.assign({
					// 选择的模板那路径模板
					tpl: "./change_password/",
					// 选择的服务
					service: "user",
				},
				config
			)
		);
	}
}

/**
 * 修改密码API
 * @param {Object} ctx http请求上下文
 */
Change_password.prototype.api = async function(ctx) {
	var user = $.services.user;
	var body = ctx.request.body;
	var token = ctx.headers["x-auth-token"];
	var access_token = await $.services["access_token"].get_obj({
		token
	});
	var info = JSON.parse(access_token.info);
	var username = info.username;
	var o_password = md5(body.o_password);
	var change_password = md5(body.password);
	var obj = await user.get_obj({
		username
	});

	if (obj) {
		if (o_password == obj.password) {
			var bl_for = await user.set({
				username
			}, {
				password: change_password
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
					message: "密码错误",
				},
			};
		}
	} else {
		return {
			error: {
				code: 70000,
				message: "账户不存在",
			},
		};
	}
};
module.exports = Change_password;
