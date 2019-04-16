import React, { Component } from 'react';
import { Tag, Button } from "antd";
import { connect } from "react-redux";
import lodash from "lodash";
import img1 from "assets/img/img1.jpeg";
import BaseLayout from "components/Base/Base";
import { increment, decrement, reset, loadNewsList } from 'reduxAlias/actions/newsAction';

@connect(
    (state) => ({
        news: state.news
    }),
    { reset, decrement, increment, loadNewsList }
)

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const sum = lodash.sum([1, 2, 4]);
    }

    render() {
        const { news: { newsData } } = this.props;
        return (
            <BaseLayout>
                <div style={{ textAlign: 'center' }}>
                    <img src={img1} alt="img1" width={200} height={200}/>
                    <h3 style={{ marginTop: '20px' }}>react项目基础搭建</h3>
                    <p>技术栈用的现在最新的版本 要检查下自己的版本</p>
                    <div>
                        <Tag color="volcano">React16</Tag>
                        <Tag color="purple">Webpack4</Tag>
                        <Tag color="gold">Less</Tag>
                        <Tag color="blue">Ant design</Tag>
                        <Tag color="cyan">Redux</Tag>
                        <Tag color="red">Axios</Tag>
                    </div>
                    <p></p>
                    <p>redux:</p>
                    <div>count:{this.props.news && this.props.news.count}</div>
                    <Button onClick={() => {
                        this.props.increment()
                    }}>增加1</Button>
                    <Button onClick={() => {
                        this.props.decrement()
                    }}>减少1</Button>
                    <Button onClick={() => {
                        this.props.loadNewsList()
                    }}>api加载新闻</Button>

                    <div>
                        {
                            newsData && JSON.stringify(newsData)
                        }
                    </div>
                </div>
            </BaseLayout>

        )
    }
}