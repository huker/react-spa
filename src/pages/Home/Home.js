import React, { Component } from 'react';
import img1 from "../../assets/img/img1.jpeg";
import { Tag, Button } from "antd";
import { connect } from "react-redux";
import { increment, decrement, reset, loadNewsList } from '../../redux/actions/newsAction';
import BaseLayout from "../../components/Base/Base";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
    }

    render() {
        const { news: { newsData } } = this.props;
        return (
            <BaseLayout>
                <div style={{ textAlign: 'center' }}>
                    <h3>雷猴啊!</h3>
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
                        this.props.loadNews()
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

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        loadNews: () => {
            dispatch(loadNewsList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)