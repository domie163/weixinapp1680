const path = require("path");
const fs = require("fs");
const Router = require("koa-router");
var router = new Router(); // 实例化路由
const alias = ['/login','/register','/forget_password','/change_password']
// 配置控制器路径
var controller_dir = path.join(__dirname, "controllers");

/**
 * 遍历获取文件并回调函数
 * @param {Object} dir
 */
function foreach_file(dir, func) {
	let arr = fs.readdirSync(dir);
	arr.forEach((val, idx) => {
		let ph = fs.statSync(dir + "/" + val);
		if (ph.isDirectory()) {
			let rph = path.join(dir + "/" + val);
			// 如果是目录则继续循环
			foreach_file(rph, func);
		} else {
			// 如果是文件则执行回调函数
			func(dir, val);
		}
	});
}

/**
 * 新建路由函数
 * @param {Object} controller 控制器
 * @param {String} action 动作方法名
 */
function route(controller, action) {
	return async function(ctx, next) {
		var body = await controller[action](ctx);
		if (body) {
			ctx.body = body;
			next();
		} else {
			await next();
		}
	}
}

/**
 * 注册路由
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
function loadRoute(controller, route_path) {
	var {
		get,
		post,
		get_api,
		post_api
	} = controller.config;
	if (controller["index"]) {
		router.get(route_path, route(controller, "index"));
		router.get(route_path + "/", route(controller, "index"));
		router.post(route_path, route(controller, "index"));
		router.post(route_path + "/", route(controller, "index"));
	}
	if (controller["api"]) {
		if(alias.includes(route_path)){
			router.get("/api/user" + route_path, route(controller, "api"));
			router.get("/api/user" + route_path + "/", route(controller, "api"));
			router.post("/api/user" + route_path, route(controller, "api"));
			router.post("/api/user" + route_path + "/", route(controller, "api"));
		}else{
			router.get("/api" + route_path, route(controller, "api"));
			router.get("/api" + route_path + "/", route(controller, "api"));
			router.post("/api" + route_path, route(controller, "api"));
			router.post("/api" + route_path + "/", route(controller, "api"));
		}

	}
	for (var i = 0; i < get.length; i++) {
		var action = get[i];
		router.get(route_path + "/" + action, route(controller, action));
	}
	for (var i = 0; i < post.length; i++) {
		var action = post[i];
		router.post(route_path + "/" + action, route(controller, action));
	}
	for (var i = 0; i < get_api.length; i++) {
		var action = get_api[i];
		router.get("/api" + route_path + "/" + action, route(controller, action));
	}
	for (var i = 0; i < post_api.length; i++) {
		var action = post_api[i];
		router.post("/api" + route_path + "/" + action, route(controller, action));
	}
}

/**
 * 加载模块
 * @param {String} dir 目录
 * @param {String} file 文件名
 */
function loadModule(dir, filename) {
	var file = path.join(dir, filename);
	var route_path = file.replace(controller_dir, "").replace(/\\/g, "/").replace(".js", "");
	var cs = require(file);
	var controller = new cs();
	if (filename === "index.js") {
		loadRoute(controller, "");
	} else {
		loadRoute(controller, route_path);
	}
}

foreach_file(controller_dir, loadModule);

module.exports = router;
