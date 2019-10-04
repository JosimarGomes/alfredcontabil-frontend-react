import React, { Component } from 'react';
import { Icon } from 'app-ui';
import AppTable from 'components/Application/AppTable';

const data = [
    {
        key: '1',
        name: "Compra de insumos",
        category: 'Insumos',
    },
    {
        key: '2',
        name: "Materiais de limpeza",
        category: 'Supermercado',
    },
    {
        key: '3',
        name: "Material de escritório",
        category: 'Insumos'
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
            )
        }
    },
    {
        title: 'Serviço',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
            return (
                <span>{text}</span>
            )
        }
    },
    {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
    }
];

class ServicesTable extends Component {

    state = {
        loading: true,
        dataSource: []
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ dataSource: data, loading: false })
        }, 3000)
    }

    editAll = selectedsRows => {
        console.log("selected rows", selectedsRows)
    }

    deleteAll = selectedsRows => {
        console.log("deleteds rows", selectedsRows)
    }

    render() {

        return (
            <AppTable
                loading={this.state.loading}
                className="height-500"
                dataSource={this.state.dataSource}
                columns={columns}
                title="Serviços"
                buttons={[
                    { title: "Excluir", type: "danger", onClick: this.deleteAll }
                ]}
            />
        )
    }
}

export default ServicesTable;