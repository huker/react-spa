import React, { Component } from 'react';
import img1 from "../../assets/img/img1.jpeg";
import { Tag } from "antd";

export default class Home extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h3>雷猴啊!</h3>
                <img src={img1} alt="img1" width={200} height={200}/>
                <h3 style={{ marginTop: '20px' }}>react项目基础搭建</h3>
                <p>技术栈用的现在最新的版本 要检查下自己的版本</p>
                <div>
                    <Tag color="volcano">react16</Tag>
                    <Tag color="purple">Webpack4</Tag>
                    <Tag color="gold">less</Tag>
                    <Tag color="blue">ant design</Tag>
                </div>
            </div>
        )
    }
}