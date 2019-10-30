import React, { useState, useEffect } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'


const ArticleList = () => {

    const [mylist, setMylist] = useState(list.data);
    useEffect(() => {
        setMylist(list.data)
    })
    return (
        <List
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
                        <span><Icon type="calendar" />{item.addTime}</span>
                        <span><Icon type="folder" /> {item.typeName}</span>
                        <span><Icon type="fire" />  {item.view_count}人</span>
                    </div>
                    <div className="list-context">{item.introduce}</div>
                </List.Item>
            )}
        />
    )


}
ArticleList.getInitialProps = async (context) => {

    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getListById + id).then(
            (res) => resolve(res.data)
        )
    })
    return await promise
}