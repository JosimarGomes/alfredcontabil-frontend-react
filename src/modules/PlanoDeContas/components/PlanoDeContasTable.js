import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'app-ui';
import AppTable from 'components/Application/AppTable';
import {
    loadPlanoDeContas,
    getPlanoDeContas,
    getLoading,
} from '../redux';

const columns = [
    {
        title: '',
        dataIndex: 'id',
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
        title: 'Conta categoria',
        dataIndex: 'codigo',
    },
    {
        title: 'Descrição',
        dataIndex: 'nome',
    },
];

class PlanoDeContasTable extends Component {

    componentDidMount() {
        this.load();
    }

    load(params = {}) {
        this.props.loadPlanoDeContas(params);
    }

    editAll = selectedsRows => {
        console.log("selected rows", selectedsRows)
    }

    deleteAll = selectedsRows => {
        console.log("deleteds rows", selectedsRows)
    }

    render() {

        const { loading, planoDeContas } = this.props;

        return (
            <AppTable
                rowKey="id"
                loading={loading}
                className="height-500"
                dataSource={planoDeContas}
                columns={columns}
                title="Plano de contas"
                buttons={[
                    { label: 'Excluir', type: 'danger', onClick: this.deleteAll },
                ]}
                handlerPagination={page => this.load({page})}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        planoDeContas: getPlanoDeContas(state),
        loading: getLoading(state),
    };
};

export default connect(mapStateToProps, { loadPlanoDeContas })(PlanoDeContasTable);
