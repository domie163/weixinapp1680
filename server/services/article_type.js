var Service = require("../core/service.js");

/**
 * 频道
 */
class Article_type extends Service {
  /**
   * 构造函数
   * @param {Object} config 配置参数
   */
  constructor(config) {
    // 传参给父类构造函数
    super(
      Object.assign(
        {
          // 操作的表
          table: "article_type",
          // 分页大小
          size: 30,
          page: 1,
        },
        config
      )
    );
  }
}

module.exports = {
  Article_type,
};
