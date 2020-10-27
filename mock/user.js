import {
  parse
} from 'url';

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};
const genList = (pageNo, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (pageNo - 1) * 10 + i;
    tableListDataSource.push({
      id: i,
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: valueEnum[Math.floor(Math.random() * 10) % 4],
      updatedAt: new Date(),
      createdAt: new Date(),
      createdAtRange: [
        Date.now() - Math.floor(Math.random() * 2000),
        Date.now() - Math.floor(Math.random() * 2000),
      ],
      progress: Math.ceil(Math.random() * 100),
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req, res) {
  const {
    current,
    pageSize
  } = req.body;
  let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);
  // const result = {
  //   code: 200,
  //   success: true,
  //   list: dataSource,
  //   extra:{
  //     total: tableListDataSource.length,
  //     pageSize:pageSize,
  //     pageNo: pageNo,
  //   }
  // };

  const result = {
    code: 200,
    success: true,
    data: dataSource,
    total: tableListDataSource.length,
    pageSize: pageSize,
    current: current,
  };
  return res.json(result);
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED',
    tags: [{
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const {
      password,
      userName,
      type
    } = req.body;

    if (password === 'admin' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (password === 'admin' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }

    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,

  'POST /api/test': getRule
  //  (req, res) => {

  //   const {
  //     age,
  //     name,
  //   } = req.body;
  //   console.log(  age,name)
  //   res.send({
  //     code: 200,
  //     success: true,
  //     message: "",
  //     extra: {
  //       pageNo: 1,
  //       pageSize: 10,
  //       total: 20
  //     },
  //     list: [
  //       {
  //         id: '000000001',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
  //         title: '你收到了 14 份新周报',
  //         datetime: '2017-08-09',
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000002',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
  //         title: '你推荐的 曲妮妮 已通过第三轮面试',
  //         datetime: '2017-08-08',
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000003',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
  //         title: '这种模板可以区分多种通知类型',
  //         datetime: '2017-08-07',
  //         read: true,
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000004',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
  //         title: '左侧图标用于区分不同的类型',
  //         datetime: '2017-08-07',
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000005',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
  //         title: '内容不要超过两行字，超出时自动截断',
  //         datetime: '2017-08-07',
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000006',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //         title: '曲丽丽 评论了你',
  //         description: '描述信息描述信息描述信息',
  //         datetime: '2017-08-07',
  //         type: 'message',
  //         clickClose: true,
  //       },
  //       {
  //         id: '000000007',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //         title: '朱偏右 回复了你',
  //         description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  //         datetime: '2017-08-07',
  //         type: 'message',
  //         clickClose: true,
  //       },
  //       {
  //         id: '000000008',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //         title: '标题',
  //         description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  //         datetime: '2017-08-07',
  //         type: 'message',
  //         clickClose: true,
  //       },
  //       {
  //         id: '000000009',
  //         title: '任务名称',
  //         description: '任务需要在 2017-01-12 20:00 前启动',
  //         extra: '未开始',
  //         status: 'todo',
  //         type: 'event',
  //       },
  //       {
  //         id: '000000010',
  //         title: '第三方紧急代码变更',
  //         description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
  //         extra: '马上到期',
  //         status: 'urgent',
  //         type: 'event',
  //       },
  //       {
  //         id: '000000011',
  //         title: '信息安全考试',
  //         description: '指派竹尔于 2017-01-09 前完成更新并发布',
  //         extra: '已耗时 8 天',
  //         status: 'doing',
  //         type: 'event',
  //       },
  //       {
  //         id: '000000012',
  //         title: 'ABCD 版本发布',
  //         description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
  //         extra: '进行中',
  //         status: 'processing',
  //         type: 'event',
  //       },
  //       {
  //         id: '000000013',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
  //         title: '这种模板可以区分多种通知类型',
  //         datetime: '2017-08-07',
  //         read: true,
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000014',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
  //         title: '左侧图标用于区分不同的类型',
  //         datetime: '2017-08-07',
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000015',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
  //         title: '内容不要超过两行字，超出时自动截断',
  //         datetime: '2017-08-07',
  //         type: 'notification',
  //       },
  //       {
  //         id: '000000016',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //         title: '曲丽丽 评论了你',
  //         description: '描述信息描述信息描述信息',
  //         datetime: '2017-08-07',
  //         type: 'message',
  //         clickClose: true,
  //       },
  //       {
  //         id: '000000017',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //         title: '朱偏右 回复了你',
  //         description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  //         datetime: '2017-08-07',
  //         type: 'message',
  //         clickClose: true,
  //       },
  //       {
  //         id: '000000018',
  //         avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
  //         title: '标题',
  //         description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
  //         datetime: '2017-08-07',
  //         type: 'message',
  //         clickClose: true,
  //       },
  //       {
  //         id: '000000019',
  //         title: '任务名称',
  //         description: '任务需要在 2017-01-12 20:00 前启动',
  //         extra: '未开始',
  //         status: 'todo',
  //         type: 'event',
  //       },
  //       {
  //         id: '000000020',
  //         title: '任务名称',
  //         description: '任务需要在 2017-01-12 20:00 前启动',
  //         extra: '未开始',
  //         status: 'todo',
  //         type: 'event',
  //       },
  //     ]
  //   });


  // }
};
