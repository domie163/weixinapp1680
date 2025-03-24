const path = require("path");
const Koa = require("koa");
const cors = require("koa2-cors");
const render = require("koa-art-template");
const serve = require("koa-static");
const session = require("koa-session");
const koaBody = require('koa-body');
const send = require("koa-send");
var core = require("./core");
$.services = require("./services");
var router = require("./router");
var fs = require("fs");

var {
	port,
	host
} = $.config.web;
const sessionConfig = {
	key: "koa:sess", //cookie key (default is koa:sess)
	maxAge: 1800000, // 过期时间(毫秒) maxAge in ms (default is 1 days)
	overwrite: true, //是否可以overwrite    (默认default true)
	httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
	signed: true, //签名默认true
	rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
	renew: false, //(boolean) renew session when session is nearly expired,
};

const app = new Koa();
app.use(cors());
app.keys = ["sess"];
app.use(session(sessionConfig, app));
app.use(serve("static"));

app.use(koaBody({
	multipart: true,
	// formidable: {
	//     maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
	// }
}));

/**
 * 发送文件
 */
app.use(async(ctx, next) => {
	ctx.send = async function(src){
		await send(ctx, src);
	}
	await next();
});

// 渲染
render(app, {
	root: path.join(__dirname, "templates"),
	extname: ".html",
	debug: process.env.NODE_ENV !== "production",
});

/* 补全用户信息 */
app.use(async (ctx, next) => {
	var user = ctx.session.user;
	if (!user) {
		var headers = ctx.request.headers;
		if (headers["x-auth-token"]) {
			var token = headers["x-auth-token"];
			var access_token = await $.services["access_token"].get_obj({
				token
			});

			if (access_token) {
				var end_time = Date.parse(access_token.create_time) + access_token.maxage * 3600 * 1000;
				var date = Date.parse(new Date());
				if (end_time >= date) {
					ctx.session.user = JSON.parse(access_token.info);
				} else {
					$.services["access_token"].del({
						token
					});
				}
			}
		}
	}
	await next();
});
app.use(router.routes());

app.listen(port, host, () => {
	console.log(`http://${host}:${port}`);
});
