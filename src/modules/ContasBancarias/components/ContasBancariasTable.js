import React, { Component } from 'react';
import { Icon } from 'app-ui';
import AppTable from 'components/Application/AppTable';

const data = [
    {
        key: '1',
        name: 'Conta Corrente Itaú',
    },
    {
        key: '2',
        name: 'Conta Poupança Caixa',
    },
    {
        key: '3',
        name: 'Conta Caixa',
    },
    {
        key: '4',
        name: 'Cartão de crédito',
    },
    {
        key: '5',
        name: 'Conta corrente Caixa',
    }
];

const columns = [
    {
        title: '',
        dataIndex: 'key',
        key: 'key',
        render: (text, record) => {
            return (
                <Icon
                    type="edit"
                    onClick={() => alert("edita ai pra mim")}
                    title="editar"
                    className="cursor-pointer"
                />
            );
        },
    },
    {
        title: 'Serviço',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
            return (
                <span>{text}</span>
            );
        },
    },
];

class ContasBancariasTable extends Component {

    state = {
        loading: true,
        dataSource: [],
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ dataSource: data, loading: false });
        }, 3000);
    }

    editAll = (selectedsRows) => {
        console.log('selected rows', selectedsRows);
    }

    deleteAll = (selectedsRows) => {
        console.log('deleteds rows', selectedsRows);
    }

    render() {
        const { loading, dataSource } = this.state;
        return (
            <AppTable
                loading={loading}
                className="height-500"
                dataSource={dataSource}
                columns={columns}
                title="Contas bancárias"
                buttons={[
                    { label: 'Excluir', type: 'danger', onClick: this.deleteAll }
                ]}
            />
        );
    }
}

export default ContasBancariasTable;
