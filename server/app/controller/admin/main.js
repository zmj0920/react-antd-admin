// eslint-disable-next-line strict
'use stract';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    this.ctx.body = '<h1>blog 接口 API</h1>';
  }

  async checkLogin() {
    console.log(this.ctx.request.body);
    // eslint-disable-next-line no-unused-vars
    const userName = this.ctx.request.body.userName;
    // eslint-disable-next-line no-unused-vars
    const password = this.ctx.request.body.password;

    // eslint-disable-next-line no-unused-vars
    const sql = `SELECT userName FROM admin_user WHERE userName='${userName}' AND password='${password}'`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      // eslint-disable-next-line object-shorthand
      this.ctx.session.openId = { openId: openId };
      // eslint-disable-next-line object-shorthand
      this.ctx.body = { data: '登录成功', openId: openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
}

module.exports = MainController;
