import { Avatar, Divider, Tag } from 'antd'
import '../static/style/components/author.css'

const Author = () => {

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="../static/img/16cfa3238800341b.png" /></div>
            <div className="author-introduction">
                <div class="author-name">君吟</div>
                <div>   前端自由写手，WEB和移动前端开发</div>
                <div className="author-tag">
                    <Tag color="green">JavaScript</Tag>
                    <Tag color="magenta">react</Tag>
                    <Tag color="red">angular</Tag>
                    <Tag color="volcano">vue</Tag>
                    <Tag color="orange">nest</Tag>
                    <Tag color="gold">golang</Tag>
                    <Tag color="lime">.net</Tag>
                    <Tag color="cyan">技术菜</Tag>
                  
                </div>
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account" />
                <Avatar size={28} icon="qq" className="account" />
                <Avatar size={28} icon="wechat" className="account" />

            </div>
        </div>
    )

}

export default Author