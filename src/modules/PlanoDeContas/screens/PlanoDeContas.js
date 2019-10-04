import React, { Component } from 'react';
import { Layout, Card, Button } from 'app-ui';
import { PlanoDeContasTable } from '../components';
import FormNovoPlanoDeContas from '../forms/FormNovoPlanoDeContas';

const { Content } = Layout;

export default class PlanoDeContas extends Component {

    state = {
        visibleNewCategory: false,
    }

    handleCancel = () => {
        this.setState({ visibleNewCategory: false });
    }

    newCategory = () => {
        this.setState({ visibleNewCategory: true });
    }

    render() {

        const { visibleNewCategory } = this.state;

        return (
            <Content>
                <FormNovoPlanoDeContas
                    visible={visibleNewCategory}
                    handleCancel={this.handleCancel}
                // wrappedComponentRef={form => this.formNewExpense = form}
                />
                <Card>
                    <Button
                        onClick={this.newCategory}
                        className="margin-10"
                        type="primary"
                    >
                        Novo plano de contas
                    </Button>
                </Card>
                <PlanoDeContasTable />
            </Content>
        );
    }
}
