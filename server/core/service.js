var Service;
if ($.config.db === "mysql" && $.config.mysql) {
	// 判断是否用mysql数据库
	Service = require('./mysql.js');
} else if ($.config.db === "mongodb" && $.config.mongodb) {
	// 判断是否用mongodb数据库
	Service = require('./mongodb.js');
};

module.exports = Service;