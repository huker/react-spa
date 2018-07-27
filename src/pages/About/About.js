/**
 * Created by huk on 2018/7/25.
 */
import React, { Component } from "react";
import img1 from "../../assets/img/img1.jpeg";

export default class About extends Component {
    render() {
        return (
            <div>
                <h3>从0开始react项目基础搭建</h3>
                <p>技术栈用的现在最新的版本 要检查下自己的版本</p>
                <ul>
                    <li>Webpack4</li>
                    <li>less antd</li>
                    <li>redux</li>
                </ul>
                <img src={img1} alt="img1"/>
            </div>
        )
    }
}