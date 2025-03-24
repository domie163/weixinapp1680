var Controller = require("../core/controller.js");

/**
 * 首页
 */
class Index extends Controller {
  /**
   * 构造函数
   * @param {Object} config 配置参数
   */
  constructor(config) {
    // 传参给父类构造函数
    super(
      Object.assign(
        {
          // 选择的模板那路径模板
          tpl: "./",
          // 选择的服务
          service: "article",
        },
        config
      )
    );
  }
}

/**
 * 首页
 * @param {Object} ctx http请求上下文
 * @return {Object} 返回html页面
 */
Index.prototype.index = async function (ctx) {
  var query = ctx.request.query;
  var { field, page, size } = query;
  delete query.field;
  delete query.page;
  delete query.size;
  var list = await this.service.get_list(
    query,
    Object.assign({}, this.config, {
      field,
      page,
      size,
    })
  );
  
  var list_article_hot = await this.service.get_list(
    {},
    Object.assign({}, this.config, {
      field: "article_id,description,hits,create_time,author,title,img,url",
      page: 1,
      size: 10,
      orderby: "hits desc",
    })
  );
  
  var list_article_new = await this.service.get_list(
    {},
    Object.assign({}, this.config, {
      field: "article_id,description,hits,create_time,author,title,img,url",
      page: 1,
      size: 10,
      orderby: "create_time desc",
    })
  );
  
  var list_goods_sales = await $.services["goods"].get_list({},{orderby:"`sales` desc"});
  var list_goods_new = await $.services["goods"].get_list({},{orderby:"`create_time` desc"});
  var list_ad = await $.services["ad"].get_list({},{orderby:"`display` desc"});
  var list_link = await $.services["link"].get_list({},{orderby:"`display` desc"});
  var model = await this.model(ctx, {
    list,list_goods_sales,list_goods_new,list_article_hot,list_article_new,list_ad,list_link
  });
  return await ctx.render(this.config.tpl + "index", model);
};

module.exports = Index;
