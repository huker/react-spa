/**
 * Created by huk on 2018/7/29.
 */
import React, { Component } from "react";
import { loadData } from "../../client/assetsApi";
import { List } from 'antd';

export default class CodeApi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateList: []
        };
    }

    componentWillMount() {
        loadData().then((res) => {
            const { data } = res;
            this.setState({
                dateList: data
            })
        });
    }

    render() {
        const { dateList } = this.state;
        return (
            <div>
                <List
                    bordered
                    dataSource={dateList}
                    renderItem={item => (<List.Item>{item.title}</List.Item>)}
                />
            </div>
        )
    }
}