'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {

    async index() {
        this.ctx.body = `<h1>blog 接口 API</h1>`
    }

    //文章内容
    async getArticleList() {

        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            //主要代码----------start
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            //主要代码----------end
            'article.view_count as view_count ,' +
            '.type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id'

        const results = await this.app.mysql.query(sql)

        this.ctx.body = {
            data: results
        }
    }
}

module.exports = HomeController