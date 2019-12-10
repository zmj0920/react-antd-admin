import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon, BackTop, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import '../static/style/pages/index.css'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import axios from 'axios'




const Home = (res) => {
  //---------主要代码-------------start
  //const [mylist, setMylist] = useState(list.data);

  const [mylist, setMylist] = useState(res.list);
  //---------主要代码-------------end
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={15}  >
          <div>

            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={6} xl={5}>
          <Author />
          <Affix offsetTop={40} >
            <Advert />
          </Affix>
        </Col>
        <BackTop />
      </Row>
      <Footer />

    </>
  )

}

Home.getInitialProps = async () => {

  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home