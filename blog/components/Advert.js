import { Tabs } from 'antd'
import '../static/style/components/advert.css'
const { TabPane } = Tabs;
const Advert = () => {

  const callback = (key) => {
    console.log(key);
  }
  return (
    <div className="ad-div comm-box">
      <Tabs defaultActiveKey="1" onChange={callback} size="small">
        <TabPane tab="知识" key="1">
          <div><img src="http://blogimages.jspang.com/flutter_ad2.jpg" width="100%" /></div>
          <div><img src="http://blogimages.jspang.com/Vue_koa_ad1.jpg" width="100%" /></div>
          <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div>
          <div><img src="https://jspang.com/images/ad_4.jpg" width="100%" /></div>
        </TabPane>
        <TabPane tab="Q群" key="2">
          Content of Tab Pane 2
        </TabPane>
            <TabPane tab="公众号" key="3">
              Content of Tab Pane 3
        </TabPane>
      </Tabs>

    </div>
  )
}

export default Advert