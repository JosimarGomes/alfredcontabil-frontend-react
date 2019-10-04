import React from 'react';
import { Content } from 'app-ui';
import { MovimentacoesTable, MovimentacoesToolBar } from '../components';

export default props => {
    return (
        <Content>
            <MovimentacoesToolBar />
            <MovimentacoesTable />
        </Content>
    )
}