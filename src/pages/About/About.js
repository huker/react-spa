/**
 * Created by huk on 2018/7/25.
 */
import React, { Component } from "react";
import { Button } from "antd";
import BaseLayout from "components/Base/Base";

export default class About extends Component {
    render() {
        return (
            <BaseLayout>
                <div>
                    <h3>sieg</h3>
                    <p>前端开发</p>
                    <p>https://github.com/huker</p>
                    <Button>hello world</Button>
                </div>
            </BaseLayout>
        )
    }
}