import React from 'react';
import { Layout } from 'antd';
import { DashBoard } from '../components';

const { Content } = Layout;

export default props => {
    return(
        <Content>
            <DashBoard />                      
        </Content>
    )
}