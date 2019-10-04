import React, { Component } from 'react';
import { Layout, Button, Card } from 'app-ui';
import { ServicesTable } from '../components';
import FormNewService from '../forms/FormNewService';

const { Content } = Layout;

export default class Services extends Component {

    state = {
        visibleNewService: false,
    }

    newService = () => {
        this.setState({ visibleNewService: true })
    }

    handleCancel = () => {
        this.setState({ visibleNewService: false });
    }

    render() {

        const { visibleNewService } = this.state;

        return (
            <Content>
                <FormNewService
                    visible={visibleNewService}
                    handleCancel={this.handleCancel}
                // wrappedComponentRef={form => this.formNewExpense = form}
                />
                <Card>
                    <Button
                        onClick={this.newService}
                        className="margin-10"
                        type="primary"
                    >
                        Novo serviço
                    </Button>
                </Card>
                <ServicesTable />
            </Content>
        )
    }
}