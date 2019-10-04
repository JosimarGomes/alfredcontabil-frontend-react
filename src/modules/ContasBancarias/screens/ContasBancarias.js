import React, { Component } from 'react';
import { Content, Card, Button } from 'app-ui';
import ContasBancariasTable from '../components/ContasBancariasTable';
import FormNovaContaBancaria from '../forms/FormNovaContaBancaria';

export default class ContasBancarias extends Component {

    state = {
        visibleNewBankAccount: false,
    }

    handleCancel = () => {
        this.setState({ visibleNewBankAccount: false });
    }

    newBankAccount = () => {
        this.setState({ visibleNewBankAccount: true });
    }

    render() {
        const { visibleNewBankAccount } = this.state;
        return (
            <Content>
                <FormNovaContaBancaria
                    visible={visibleNewBankAccount}
                    handleCancel={this.handleCancel}
                // wrappedComponentRef={form => this.formNewExpense = form}
                />
                <Card>
                    <Button
                        onClick={this.newBankAccount}
                        className="margin-10"
                        type="primary"
                    >
                        Nova conta bancária
                    </Button>
                </Card>
                <ContasBancariasTable />
            </Content>
        );
    }
}
