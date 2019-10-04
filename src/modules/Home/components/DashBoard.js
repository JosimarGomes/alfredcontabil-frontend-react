import React, { Component } from 'react';
import { Row, Layout, Col } from 'app-ui';
import BalanceSummary from './BalanceSummary';
import { MovimentacoesToolBar, MovimentacoesTable } from '../../shared/components';

class DashBoard extends Component {

    render() {
        return (
            <Layout>
                <Row>
                    <Col>
                        <MovimentacoesToolBar />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BalanceSummary />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MovimentacoesTable />
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default DashBoard;