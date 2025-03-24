const mysql = require("mysql");

// 创建mysql请求池
$.mysql = mysql.createPool($.config.mysql);

/**
 * 定义Mysql帮助类
 * @param {String} sql SQL语句
 * @param {Array} values 值数组
 * @return {Object} 返回执行结果
 */
$.mysql.run = function(sql, values) {
	if ($.config.mysql.log) {
		console.info("sql: " + sql);
	}
	return new Promise((resolve, reject) => {
		this.getConnection(function(err, connection) {
			if (err) {
				if ($.config.mysql.log) {
					console.error("数据库连接失败！");
				}
				reject(err);
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						if ($.config.mysql.log) {
							console.error(err.SqlMessage);
						}
						reject(err);
					} else {
						resolve(rows);
					}
					connection.release();
				});
			}
		});
	});
};

function trim(str, char, type) {
	if (char) {
		if (type == "left") {
			return str.replace(new RegExp("^\\" + char + "+", "g"), "");
		} else if (type == "right") {
			return str.replace(new RegExp("\\" + char + "+$", "g"), "");
		}
		return str.replace(new RegExp("^\\" + char + "+|\\" + char + "+$", "g"), "");
	}
	return str.replace(/^\s+|\s+$/g, "");
}

/**
 * 转sql wehre语句
 * @param {Object} query 查询条件
 * @param {Boolean} like 模糊匹配
 * @return {String} 返回sql语句
 */
$.mysql.toWhere = function(obj, like = true,sqlwhere) {
	var where = "";
	if (like) {
		for (var k in obj) {
			var val = obj[k];
			if(this.escapeId(k).indexOf('_min') != -1){
				var new_field = this.escapeId(k).replace('_min','');
				where += " and " + new_field + ">=" + this.escape(val);
			}else if(this.escapeId(k).indexOf('_max') != -1){
				var new_field = this.escapeId(k).replace('_max','');
				where += " and " + new_field + "<=" + this.escape(val);
			}else{
				if (typeof val === "string") {
					where += " and `" + k + "` LIKE '%" + trim(this.escape(val), "'") + "%'";
				} else {
					where += " and `" + k + "`=" + val;
				}
			}
		}
	} else {
		for (var k in obj) {
			if(this.escapeId(k).indexOf('_min') != -1){
				var new_field = this.escapeId(k).replace('_min','');
				where += " and " + new_field + ">=" + this.escape(obj[k]);
			}else if(this.escapeId(k).indexOf('_max') != -1){
				var new_field = this.escapeId(k).replace('_max','');
				where += " and " + new_field + "<=" + this.escape(obj[k]);
			}else{
				where += " and " + this.escapeId(k) + "=" + this.escape(obj[k]);
			}
		}
	}
	if (sqlwhere) {
		where += " and " + sqlwhere;
	}
	return where.replace(" and ", "");
};

/**
 * 转sql set语句
 * @param {Object} body 修改的键值
 * @return {String} 返回sql语句
 */
$.mysql.toSet = function(body) {
	var set = "";
	for (var k in body) {
		var value = body[k];
		set += ", `" + k + "`=" + this.escape(value);
	}
	return set.replace(", ", "");
};

/**
 * 转添加sql语句
 * @param {Object} body 添加的键值
 * @param {Object} config 配置
 * @return {String} sql语句
 */
$.mysql.toAddSql = function(body, config) {
	var {
		table
	} = config;
	var key = "";
	var val = "";
	for (var k in body) {
		key += "," + this.escapeId(k);
		val += "," + this.escape(body[k]);
	}
	var sql = "INSERT INTO `{0}` ({1}) VALUES ({2});";
	return sql.replace("{0}", table).replace("{1}", key.replace(",", "")).replace("{2}", val.replace(",", ""));
};

/**
 * 转删除sql语句
 * @param {Object} query 查询条件
 * @param {Object} config 配置
 * @return {String} sql语句
 */
$.mysql.toDelSql = function(query, config) {
	var {
		table
	} = config;
	var where = this.toWhere(query, false);
	var sql = "DELETE FROM `{0}` WHERE {1};";
	return sql.replace("{0}", table).replace("{1}", where);
};

/**
 * 转修改sql语句
 * @param {Object} query 查询条件
 * @param {Object} body 修改的键值
 * @param {Object} config 配置
 * @return {String} sql语句
 */
$.mysql.toSetSql = function(query, body, config) {
	var {
		table
	} = config;
	var where = this.toWhere(query, false);
	var set = this.toSet(body);
	var sql = "UPDATE `{0}` SET {1} WHERE {2};";
	return sql.replace("{0}", table).replace("{1}", set).replace("{2}", where);
};

/**
 * 转查询sql语句
 * @param {Object} query 查询条件
 * @param {Object} body 修改的键值
 * @param {Object} config 配置
 * @return {String} sql语句
 */
$.mysql.toGetSql = function(query, config) {
	var {
		table,
		orderby,
		field,
		page,
		size,
		like,
		groupby,
		sqlwhere
	} = config;
	var sql = "SELECT {1} FROM `{0}`";
	if (!field) {
		field = "*";
	}
	var where = this.toWhere(query, like,sqlwhere);
	if (where) {
		sql += " WHERE " + where;
	}
	if (groupby) {
		sql += " GROUP BY " + groupby.replace(/;/, "");
	}
	if (orderby) {
		sql += " ORDER BY " + orderby.replace(/;/, "");
	}
	sql = sql.replace("{0}", table).replace("{1}", field);
	if (size && page) {
		var start = size * (page - 1);
		sql += " limit " + start + "," + size;
	}
	return sql;
};

/**
 * 查询符合结果总数
 * @param {String} where 查询条件
 * @param {Object} config 配置
 * @return {Promise|Number} 返回结果总数
 */
$.mysql.toCountSql = function(query, config) {
	var {
		table,
		groupby,
		sqlwhere
	} = config;
	var sql = "SELECT count(*) count FROM `" + table + "`";
	var where = this.toWhere(query,true,sqlwhere);
	if (where) {
		sql += " WHERE " + where;
	}
	if (groupby) {
		sql = sql.replace("count(", groupby + ",count(");
		delete query.groupby;
		sql += " GROUP BY " + groupby;
	}
	return sql;
};

/**
 * 查询结果总数合计
 * @param {String} where 查询条件
 * @param {Object} config 配置
 * @return {Promise|Number} 返回结果总数
 */
$.mysql.toSumSql = function(query, config) {
	var {
		table,
		field,
		groupby,
		sqlwhere
	} = config;
	var sql = "SELECT sum(" + this.escapeId(field) + ") sum FROM `" + table + "`";
	var where = this.toWhere(query,true,sqlwhere);
	if (where) {
		sql += " WHERE " + where;
	}
	if (groupby) {
		sql = sql.replace("sum(", groupby + ",sum(");
		sql += " GROUP BY " + this.escapeId(groupby);
		delete query.groupby;
	}
	return sql;
};

/**
 * 查询结果平均数
 * @param {String} where 查询条件
 * @param {Object} config 配置
 * @return {String} sql语句
 */
$.mysql.toAvgSql = function(query, config) {
	var {
		table,
		field,
		groupby,
		sqlwhere
	} = config;
	delete query.groupby;

	var sql = "SELECT avg(" + this.escapeId(field) + ") avg FROM `" + table + "`";

	var where = this.toWhere(query,true,sqlwhere);
	if (where) {
		sql += " WHERE " + where;
	}
	if (groupby) {
		sql = sql.replace("avg(", groupby + ",avg(");
		delete query.groupby;
		sql += " GROUP BY " + this.escapeId(groupby);
	}
	return sql;
};


/**
 * 计算
 * @param {String} where 查询条件
 * @param {Object} config 配置
 * @return {String} sql语句
 */
$.mysql.toDateComput = function(query, config) {
	var {
		date_key,
		method,
		field,
		size,
		format,
		table,
		sqlwhere
	} = Object.assign({
		date_key: "create_time",
		method: "count",
		field: "*",
		size: 0,
		format: "%Y-%m-%d"
	}, config);

	var sql =
		"SELECT DATE_FORMAT(`" +
		date_key +
		"`, '" + format + "') `date`, " +
		method +
		"(" +
		field +
		") " +
		method +
		" FROM `" + table + "`";

	var where = this.toWhere(query,true,sqlwhere);
	if (where) {
		sql += " WHERE " + where;
	}
	sql += " GROUP BY `date` ORDER BY `date` desc";

	if (size) {
		sql += " limit 0," + size;
	}
	return sql;
}

/**
 * 控制器父类
 */
class Service {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		// 配置参数
		this.config = Object.assign({
				// 表名
				table: "",
				// 页码
				page: 1,
				// 分页大小
				size: 30,
			},
			config
		);
	}
}

/**
 * 执行sql服务
 * @param {String} sql SQL语句
 * @param {Object} values 对应值
 * @param {Object} 返回执行结果
 */
Service.prototype.run = async function(sql, values) {
	var ret;
	try {
		this.error = null;
		ret = await $.mysql.run(sql, values);
	} catch (err) {
		this.error = {
			code: err.errno,
			message: err.sqlMessage,
			sql: err.sql,
		};
	}
	if (sql.indexOf("SELECT") !== -1) {
		if (!ret) {
			ret = [];
		}
	} else if (ret) {
		if (ret.affectedRows === 0) {
			ret = -1;
		} else {
			ret = ret.affectedRows;
		}
	}
	return ret;
};

/**
 * 增
 * @param {Object} query 查询条件
 * @return {Number} 成功返回正数，失败返回0，没有改变返回负数
 */
Service.prototype.add = async function(body, config, config) {
	var sql = $.mysql.toAddSql(body, Object.assign({}, this.config, config || {}));
	var ret = await this.run(sql);
	return ret;
};

/**
 * 删
 * @param {Object} query 查询条件
 * @return {Number} 成功返回正数，失败返回0，没有改变返回负数
 */
Service.prototype.del = async function(query, config) {
	var sql = $.mysql.toDelSql(query, Object.assign({}, this.config, config || {}));
	var ret = await this.run(sql);
	return ret;
};

/**
 * 改
 * @param {Object} query 查询条件
 * @return {Number} 成功返回正数，失败返回0，没有改变返回负数
 */
Service.prototype.set = async function(query, body, config) {
	var sql = $.mysql.toSetSql(query, body, Object.assign({}, this.config, config || {}));
	var ret = await this.run(sql);
	return ret;
};

/**
 * 查一条
 * @param {Object} query 查询条件
 * @return {Array} 返回列表
 */
Service.prototype.get_list = async function(query, config) {
	var sql = $.mysql.toGetSql(query, Object.assign({}, this.config, config || {}));
	return await this.run(sql);
};

/**
 * 查多条
 * @param {Object} query 查询条件
 * @return {Array} 返回对象
 */
Service.prototype.get_obj = async function(query, config) {
	var sql = $.mysql.toGetSql(query, Object.assign({}, this.config, config || {}));
	var arr = await this.run(sql);
	if (arr.length > 0) {
		return arr[0];
	}
	return null;
};

/**
 * 统计查询结果数
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.count = async function(query, config) {
	var sql = $.mysql.toCountSql(query, Object.assign({}, this.config, config || {}));
	var arr = await this.run(sql);
	if (arr.length) {
		return arr[0].count;
	}
	return 0;
};

/**
 * 合计字段值
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.sum = async function(query, config) {
	var sql = $.mysql.toSumSql(query, Object.assign({}, this.config, config || {}));
	var arr = await this.run(sql);
	if (arr.length) {
		return arr[0].sum || 0;
	}
	return 0;
};

/**
 * 求平均数
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.avg = async function(query, config) {
	var sql = $.mysql.toAvgSql(query, Object.assign({}, this.config, config || {}));
	var arr = await this.run(sql);
	if (arr.length) {
		return arr[0].avg || 0;
	}
	return 0;
};

/**
 * 分组求总数
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.count_group = async function(query, config) {
	var sql = $.mysql.toCountSql(query, Object.assign({}, this.config, config || {}));
	return await this.run(sql);
};

/**
 * 分组求合
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.sum_group = async function(query, config) {
	var sql = $.mysql.toSumSql(query, Object.assign({}, this.config, config || {}));
	return await this.run(sql);
};

/**
 * 分组求平均数
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.avg_group = async function(query, config) {
	var sql = $.mysql.toAvgSql(query, Object.assign({}, this.config, config || {}));
	return await this.run(sql);
};

/**
 * 柱状图求合
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.bar_group = async function(query, config) {
	var {
		field,
		groupby,
		sqlwhere
	} = config;
	var where = $.mysql.toWhere(query,false,sqlwhere);
	if(where != ''){
		where = " WHERE " + where;
	}
	var sum_list = '';
	var field = field.split(',');
	for(var i = 0;i < field.length;i ++){
		sum_list += ',sum(' + field[i] + ')';
	}
	var sql = "SELECT "+ groupby + sum_list + " FROM `" + this.config.table + "` " + where + " GROUP BY " + groupby;
	
	return await this.run(sql);
};

/**
 * 获取上一条
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.prev = async function(key, value) {
	var sql = "SELECT * FROM `" + this.config.table + "` WHERE `" + key + "`<" + value + " ORDER BY `" + key +
		"` DESC limit 0,10;";
	return await this.run(sql);
};

/**
 * 获取下一条
 * @param {Object} query 查询条件
 * @return {Number} 返回条数
 */
Service.prototype.next = async function(key, value) {
	var sql = "SELECT * FROM `" + this.config.table + "` WHERE `" + key + "`>" + value + " limit 0,10;";
	return await this.run(sql);
};

/**
 * 日期计算
 * @param {String} date_key 日期字段
 * @param {String} method 方法
 * @param {String} field 用作统计的字段
 * @return {Array} 返回列表
 */
Service.prototype.date_comput = async function(query, config) {
	var sql = $.mysql.toDateComput(query, Object.assign({
		table: this.config.table
	}, config));
	return await this.run(sql);
};

/**
 * 导入
 * @param {Function} data
 */
Service.prototype.import = async function(data, config) {};

/**
 * 导出
 * @param {Object} query
 */
Service.prototype.export = async function(query, config) {};

module.exports = Service;
