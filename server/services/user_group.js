var Service = require("../core/service.js");

/**
 * 用户类
 */
class User_group extends Service {
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
          table: "user_group",
          // 分页大小
          size: 30,
        },
        config
      )
    );
  }
}

module.exports = {
  User_group,
};
