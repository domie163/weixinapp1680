var fs = require("fs");
var path = require("path");
const xlsx = require("node-xlsx");
var _dir = "./static/upload/";
var _path = "/upload/";

/**
 * 控制器父类
 */
class Controller {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		var cg = {
			// 选择的模板那路径模板
			tpl: "./index/",
			// 选择的服务
			service: "user",
			// 注册get请求路由
			get: ["list", "view", "table", "details"],
			// 注册post请求路由
			post: [],
			// 注册get api路由
			get_api: ["del", "get_list", "get_obj", "count", "count_group", "sum", "sum_group", "avg", "avg_group","list_group","bar_group"],
			// 注册post api路由
			post_api: ["add", "set", "import_db", "export_db", "upload"]
		};

		if (config) {
			if (config.get) {
				config.get = config.get.concat(cg.get);
			} else {
				config.get = cg.get;
			}
			if (config.post) {
				config.post = config.post.concat(cg.post);
			} else {
				config.post = cg.post;
			}
			if (config.get_api) {
				config.get_api = config.get_api.concat(cg.get_api);
			} else {
				config.get_api = cg.get_api;
			}
			if (config.post_api) {
				config.get_api = config.post_api.concat(cg.post_api);
			} else {
				config.post_api = cg.post_api;
			}
		}

		// 配置参数
		this.config = config;

		// 添加服务
		this.service = $.services[this.config.service];
	}
}

/**
 * 公共模型
 * @param {Object} ctx http请求上下文
 * @param {Object} model 模型
 * @return {Object} 返回模型
 */
Controller.prototype.model = async function(ctx, model) {
	var m = Object.assign({}, model);
	var req = ctx.request;
	m.query = req.query;
	m.body = req.body;
	m.headers = req.headers;

	// 获取导航
	var service = $.services["nav"];
	m.nav_top = await service.get_list({
		location: "top",
	});
	m.nav_side = await service.get_list({
		location: "side",
	});
	m.nav_foot = await service.get_list({
		location: "foot",
	});

	// 获取轮播图
	service = $.services["slides"];
	m.list_slides = await service.get_list({});

	// 获取公告
	m.list_notice = await $.services["notice"].get_list({}, {
		orderby: "`update_time` desc"
	});


	// 转换时间
	m.toTime = function(str, format = "yyyy-MM-dd hh:ss") {
		return str.toStr(format);
	};

	// 序列化
	m.JSON = JSON;

	// 获取数组成员
	m.getObj = function(arr, key, value) {
		var obj = null;
		for (var i = 0; i < arr.length; i++) {
			var o = arr[i];
			if (o[key] == value) {
				obj = o;
				break;
			}
		}
		return obj;
	};

	// 获取拓展名
	m.extension = function(str) {
		if (str) {
			var arr = str.split('.');
			return arr[arr.length - 1];
		} else {
			return "";
		}
	};

	// 交互模型接口
	var {
		interact
	} = this.config;
	if (interact) {
		m = await this.model_interact(ctx, m);
	}


	return m;
};

/**
 * 交互模型
 * @param {Object} ctx http请求上下文
 * @param {Object} model 模型
 */
Controller.prototype.model_interact = async function(ctx, model) {
	if (model.list) {
		this.interact_list(ctx, model.list);
	}
	if (model.obj) {
		this.interact_obj(ctx, model.obj);
	}
}

/**
 * 交互列表
 * @param {Object} ctx http请求上下文
 * @param {Object} o 对象
 * @return {Object} 返回添加属性后的对象
 */
Controller.prototype.interact_obj = async function(ctx, o) {
	var interact = this.config.interact;
	var source_table = this.config.service;
	var source_field = source_table + "_id";

	// 评论
	if (interact.indexOf("comment") != -1) {
		var service = $.services["comment"];
		var source_id = o[source_field];
		o.comment_list = await service.get_list({
			source_table,
			source_field,
			source_id
		});
	}
	// 评分
	if (interact.indexOf("score") != -1) {
		var service = $.services["score"];
		var source_id = o[source_field];
		o.score_list = await service.get_list({
			source_table,
			source_field,
			source_id
		});
	}
	// 收藏
	if (interact.indexOf("collect") != -1) {
		var service = $.services["collect"];
		var source_id = o[source_field];
		o.collect_list = await service.get_list({
			source_table,
			source_field,
			source_id
		});
	}
	// 点赞
	if (interact.indexOf("praise") != -1) {
		var service = $.services["praise"];
		var source_id = o[source_field];
		o.praise_list = await service.get_list({
			source_table,
			source_field,
			source_id
		});
	}
}

/**
 * 交互列表
 * @param {Object} ctx http请求上下文
 * @param {Array} list 列表
 * @return {Array} 返回添加属性后的列表
 */
Controller.prototype.interact_list = async function(ctx, list) {
	var interact = this.config.interact;
	var source_table = this.config.service;
	var source_field = source_table + "_id";

	// 评论数
	if (interact.indexOf("comment") != -1) {
		var service = $.services["comment"];
		for (var i = 0; i < list.length; i++) {
			var o = list[i];
			var source_id = o[source_field];
			o.comment_len = await service.count({
				source_table,
				source_field,
				source_id
			});
		}
	}
	// 评均分
	if (interact.indexOf("score") != -1) {
		var service = $.services["score"];
		for (var i = 0; i < list.length; i++) {
			var o = list[i];
			var source_id = o[source_field];
			o.score_len = await service.avg({
				source_table,
				source_field,
				source_id
			}, {
				field: "score_num"
			});
		}
	}
	// 收藏人数
	if (interact.indexOf("collect") != -1) {
		var service = $.services["collect"];
		for (var i = 0; i < list.length; i++) {
			var o = list[i];
			var source_id = o[source_field];
			o.collect_len = await service.count({
				source_table,
				source_field,
				source_id
			});
		}
	}
	// 点赞人数
	if (interact.indexOf("praise") != -1) {
		var service = $.services["praise"];
		for (var i = 0; i < list.length; i++) {
			var o = list[i];
			var source_id = o[source_field];
			o.praise_len = await service.count({
				source_table,
				source_field,
				source_id
			});
		}
	}
	return list;
};

/**
 * 公共参数校验
 * @param {Object} ctx http上下文
 */
Controller.prototype.check_param = function(ctx) {
	return true;
};


/**
 * 首页
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Controller.prototype.index = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		page,
		size,
		sqlwhere
	} = query;
	delete query.field;
	delete query.page;
	delete query.size;
	delete query.sqlwhere;
	var list = await this.service.get_list(
		query,
		Object.assign({}, this.config, {
			field,
			page,
			size,
			sqlwhere
		})
	);
	var model = await this.model(ctx, {
		list,
	});
	return await ctx.render(this.config.tpl + "index", model);
};

/**
 * 列表页面
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Controller.prototype.list = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		page,
		size,
		sqlwhere
	} = query;
	delete query.field;
	delete query.page;
	delete query.size;
	delete query.sqlwhere;
	var list = await this.service.get_list(
		query,
		Object.assign({}, this.config, {
			field,
			page,
			size,
			sqlwhere
		})
	);
	var model = await this.model(ctx, {
		list,
	});
	return await ctx.render(this.config.tpl + "list", model);
};

/**
 * 表格页面
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Controller.prototype.table = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		page,
		size,
		sqlwhere
	} = query;
	delete query.field;
	delete query.page;
	delete query.size;
	delete query.sqlwhere
	var list = await this.service.get_list(
		query,
		Object.assign({}, this.config, {
			field,
			page,
			size,
			sqlwhere
		})
	);
	var model = await this.model(ctx, {
		list,
	});
	return await ctx.render(this.config.tpl + "table", model);
};

/**
 * 详情页面
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Controller.prototype.details = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		sqlwhere
	} = query;
	delete query.field;
	delete query.sqlwhere;

	// 获取目标对象
	var obj = await this.service.get_obj(
		query,
		Object.assign({}, this.config, {
			field,
			sqlwhere
		})
	);
	var model = await this.model(ctx, {
		obj,
	});

	// 判断是否有点击量要求
	if (this.config.interact && this.config.interact.indexOf("hits") != -1) {
		// 点击量+1
		this.service.set(obj, {
			hits: obj.hits + 1,
		});
	}

	return await ctx.render(this.config.tpl + "view", model);
};

/**
 * 编辑页面
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Controller.prototype.view = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		sqlwhere
	} = query;
	delete query.field;
	delete query.sqlwhere;
	var obj = await this.service.get_obj(
		query,
		Object.assign({}, this.config, {
			field,
			sqlwhere
		})
	);
	var model = await this.model(ctx, {
		obj,
	});
	return await ctx.render(this.config.tpl + "view", model);
};

/**
 * 增
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.add = async function(ctx) {
	var result = await this.service.add(ctx.request.body, this.config);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 删
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.del = async function(ctx) {
	if (!Object.keys(ctx.query).length) {
		return {
			code: 30000,
			message: "删除条件不能为空！",
		};
	}
	var result = await this.service.del(ctx.request.query, this.config);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 改
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.set = async function(ctx) {
	var query = ctx.request.query;
	delete query.page;
	delete query.size;
    delete query.orderby;
    delete query.sqlwhere;
	var result = await this.service.set(query, ctx.request.body, this.config);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 查多条
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.get_list = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		page,
		size,
		orderby,
		groupby,
		sqlwhere
	} = query;
	delete query.field;
	delete query.page;
	delete query.size;
	delete query.orderby;
	delete query.like;
	delete query.groupby;
	delete query.sqlwhere;
	var list = await this.service.get_list(
		query,
		Object.assign({}, this.config, {
			field,
			page,
			size,
			orderby,
			groupby,
			sqlwhere
		})
	);
	var count = await this.service.count(query,Object.assign({}, this.config, {
		field,
		page,
		size,
		orderby,
		groupby,
		sqlwhere
	}))
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	// 交互模型接口
	if (this.config.interact) {
		m = await this.interact_list(ctx, list);
	}
	return {
		result: {
			list,
			count
		}
	};
};

/**
 * 饼图统计
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.list_group = async function(ctx) {
	var query = ctx.request.query;
	var {
		groupby,
		sqlwhere
	} = query;
	if (!groupby) {
		return {
			error: 30000,
			message: "groupby的值不能为空！",
		};
	}
	delete query.groupby;
	delete query.sqlwhere;
	var result = await this.service.count_group(
		query,
		Object.assign({
				groupby,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	for(var i = 0;i < result.length;i ++){
		result[i][1] = result[i][groupby];
		result[i][0] = result[i]["count"];
	}
	return {
		result: {list: result},
	};
};

/**
 * 柱状图统计
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.bar_group = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		groupby,
		sqlwhere
	} = query;
	if (!field) {
		return {
			error: 30000,
			message: "field的值不能为空！",
		};
	}
	if (!groupby) {
		return {
			error: 30000,
			message: "groupby的值不能为空！",
		};
	}
	delete query.field;
	delete query.groupby;
	delete query.sqlwhere;
	var result = await this.service.bar_group(
		query,
		Object.assign({
				field,
				groupby,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	for(var i = 0;i < result.length;i ++){
		var values = [];
		for(var o in result[i]){
			values.push(result[i][o]);
		}
		result[i] = values;
	}
	return {
		result: {list: result},
	};
};

/**
 * 查一条
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.get_obj = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		sqlwhere
	} = query;
	delete query.field;
	delete query.sqlwhere;
	var result = await this.service.get_obj(
		query,
		Object.assign({}, this.config, {
			field,
			sqlwhere
		})
	);
	if (this.service.error) {
		return {
			error: this.service.error
		};
	}
	if (this.config.interact) {
		m = await this.interact_list(ctx, result);
	}
	return {
		result: {obj: result},
	};
};

/**
 * 总计条数
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.count = async function(ctx) {
	var result = await this.service.count(ctx.request.query, this.config);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 分组总计条数
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.count_group = async function(ctx) {
	var query = ctx.request.query;
	var {
		groupby,
		sqlwhere
	} = query;
	if (!groupby) {
		return {
			error: 30000,
			message: "groupby的值不能为空！",
		};
	}
	delete query.groupby;
	delete query.sqlwhere;
	var result = await this.service.count_group(
		query,
		Object.assign({
				groupby,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 分组求和
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.sum_group = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		groupby,
		sqlwhere
	} = query;
	if (!field) {
		return {
			error: 30000,
			message: "field的值不能为空！",
		};
	}
	if (!groupby) {
		return {
			error: 30000,
			message: "groupby的值不能为空！",
		};
	}
	delete query.field;
	delete query.groupby;
	delete query.sqlwhere;
	var result = await this.service.sum_group(
		query,
		Object.assign({
				field,
				groupby,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 求和
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.sum = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		sqlwhere
	} = query;
	if (!field) {
		return {
			error: 30000,
			message: "field的值不能为空！",
		};
	}
	delete query.field;
	delete query.sqlwhere;
	var result = await this.service.sum(
		query,
		Object.assign({
				field,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 分组求和
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.sum_group = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		groupby,
		sqlwhere
	} = query;
	if (!field) {
		return {
			error: 30000,
			message: "field的值不能为空！",
		};
	}
	if (!groupby) {
		return {
			error: 30000,
			message: "groupby的值不能为空！",
		};
	}
	delete query.field;
	delete query.groupby;
	delete query.sqlwhere;
	var result = await this.service.sum_group(
		query,
		Object.assign({
				field,
				groupby,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 求平均数
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.avg = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		sqlwhere
	} = query;
	if (!field) {
		return {
			error: 30000,
			message: "field的值不能为空！",
		};
	}
	delete query.field;
	delete query.sqlwhere;
	var result = await this.service.avg(
		query,
		Object.assign({
				field,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 分组平均数
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.avg_group = async function(ctx) {
	var query = ctx.request.query;
	var {
		field,
		groupby,
		sqlwhere
	} = query;
	if (!field) {
		return {
			error: 30000,
			message: "field的值不能为空！",
		};
	}
	if (!groupby) {
		return {
			error: 30000,
			message: "groupby的值不能为空！",
		};
	}
	delete query.field;
	delete query.groupby;
	delete query.sqlwhere;
	var result = await this.service.avg_group(
		query,
		Object.assign({
				field,
				groupby,
				sqlwhere
			},
			this.config
		)
	);
	if (this.service.error) {
		return {
			error: this.service.error,
		};
	}
	return {
		result,
	};
};

/**
 * 导入数据
 * @param {Object} ctx 传入指令
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.import_db = async function(ctx) {
	var message = {
		id: 1,
		jsonrpc: "2.0",
	};

	// 获取指令查询条件和保存路径
	var req = ctx.request;
	var query = req.query;

	// 获取读取路径
	var path = query.path;
	delete query.path;
	// console.log("path: ", path);

	// 获取表名
	var table = this.config.service;

	// 创建读取文件流
	var data = xlsx.parse(path);
	// console.log("data: ", data);

	// 获取第一页表
	var list_table = data[0].data;
	// console.log("表数组", list_table);

	// 获取表的字段名
	var keys = list_table[0];
	key = '("' + keys.join('","') + '")';
	// console.log("名", key);

	// 获取表的字段值
	var vals = "";
	for (var i = 1; i < list_table.length; i++) {
		var arr = list_table[i];
		vals += ",(";
		var val = "";
		for (var i2 = 0; i2 < arr.length; i2++) {
			var str = arr[i2];
			if (/\D+/.test(str)) {
				val += ",'" + str + "'";
			} else {
				val += "," + str;
			}
		}
		vals += val.replace(",", "") + ")";
	}
	vals = vals.replace(",", "");

	var sql = "INSERT INTO `" + table + "` ( " + keys + " ) VALUES " + vals;
	var service = $.services[table];
	var bl = service.add(table, keys, vals);
};

/**
 * 导出数据
 * @param {Object} ctx
 * @return {Object} 返回json-rpc格式结果
 */
Controller.prototype.export_db = async function(ctx) {
	// console.log("export_db");
	var message = {
		id: 1,
		jsonrpc: "2.0",
	};

	// 获取指令查询条件和保存路径
	var req = ctx.request;
	var query = req.query;

	// 获取表名
	var table = this.config.service;

	// 获取保存路径
	var path = query.path || "d://";
	delete query.path;

	var name = query.name || table;
	delete query.name

	// 通过服务获得数据
	var service = $.services[table];
	var list = await service.get_list(Object.assign({}, query));

	// 判断数据是否为数组并且存在
	if (Array.isArray(list) && list.length > 0) {
		// 判断数据是否为对象并且存在
		if (list[0] && typeof list[0] == "object") {
			var str = "";

			// 循环字段
			for (key in list[0]) {
				str += `,"` + key + `"`;
			}
			str = str.replace(",", "");

			// 循环对象
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				n = "";

				// 循环字段值
				for (key in list[i]) {
					n += `,"` + o[key] + `"`;
				}
				str += "\n" + n.replace(",", "");
			}

			// 执行写入文件流
			var err = fs.writeFileSync(path + name + ".csv", str);

			// 判断执行结果
			if (err) {
				message.error = {
					code: "-32000",
					message: "写入错误",
					data: "写入数据时失败",
				};
			} else {
				// 返回json-rpc格式成功
				message.result = {
					bl: true,
					message: "保存成功",
				};
			}
		}
	}
	return message;
};

/**
 * web API
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
Controller.prototype.api = async function(ctx) {
	return "hello world!"
}

/**
 * 上传
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
Controller.prototype.upload = async function(ctx) {
	// console.log("upload");
	var req = ctx.request;
	var query = req.query;
	// console.log("files",req.files.file)
	var url = "";
	if (req.files && req.files.file) {
		var f = req.files.file;
		// console.log(f.path);

		// 创建可读流
		const render = fs.createReadStream(f.path);

		// 创建写入流
		var name = f.name;
		var dir = f.dir || "";
		var file = _dir + dir + name;
		try {
			if (fs.existsSync(file)) {
				var arr = name.split(".");
				name = arr[0];
				var extension = arr[arr.length - 1];
				var num = 10000;
				for (var i = 0; i < num; i++) {
					var na = name + "_" + (i + 1) + "." + extension;
					file = path.join(_dir, na);
					if (!fs.existsSync(file)) {
						name = na;
						break;
					}
				}
			}

			// 写入文件流
			const upStream = fs.createWriteStream(file);
			render.pipe(upStream);
			url = _path + name;
		} catch (e) {
			console.log("上传失败：", e);
		}
		return {
			result: {
				url
			}
		};
	} else {
		return {
			code: 10000,
			message: "上传的文件（file）不能为空！",
		};
	}
};

module.exports = Controller;
