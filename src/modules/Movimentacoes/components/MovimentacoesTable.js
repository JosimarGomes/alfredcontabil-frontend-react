import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Icon,
    DatePicker,
    Tag,
    Popconfirm,
    Tooltip,
    Button
} from 'app-ui';
import { AppTable } from 'components/Application';
import {
    loadMovimentacoes,
    getMovimentacoes,
    getLoading,
} from '../redux';
import { toCurrencyBRL } from 'utils';
import { MovimentacoesApi } from 'services/api';
import FormNovaReceita from '../forms/FormNovaReceita';
import FormNovaDespesa from '../forms/FormNovaDespesa';

const { MonthPicker } = DatePicker;

class MovimentacoesTable extends Component {

    state = {
        itemEdit: {},
    }

    requestParams = {
        comDadosPlanoDeContas: 1
    }

    componentDidMount() {
        this.load();
    }

    load(params={}) {
        params = { ...params, ...this.requestParams };
        this.props.loadMovimentacoes(params);
    }

    updateMovimentacoes = movimentacao => {
        MovimentacoesApi.put(movimentacao)
            .then(resp => {
                this.load();
                // resolve(resp);
            })
            .catch(err => {
                const message = err.response.data.message || 'Não foi possível salvar';
                // eslint-disable-next-line prefer-promise-reject-errors
                // reject({ message });
            });
    }

    liquidar = movimentacao => {
        movimentacao.status = 1;
        this.updateMovimentacoes(movimentacao);
    }

    estornar = movimentacao => {
        movimentacao.status = 0;
        this.updateMovimentacoes(movimentacao);
    }

    columns = [
        {
            title: '',
            dataIndex: 'id',
            render: (text, record) => {
                return (
                    <Icon
                        type="edit"
                        onClick={() => this.editItem(record)}
                        title="editar"
                        className="cursor-pointer"
                    />
                )
            }
        },
        {
            title: 'Vencimento',
            dataIndex: 'dataVencimento',
            render: (text, record) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            render: (text, record) => {
                const value = toCurrencyBRL(text);
                
                if (parseInt(value) < 0) {
                    return (
                        <span className="danger">{value}</span>
                    );
                }
    
                return (value);
            },
        },
        {
            title: '',
            dataIndex: 'status',
            render: (text, record) => {
                if (parseInt(text) === 1) {
                    return (
                        <Popconfirm
                            title="Deseja estornar?"
                            onConfirm={() => this.estornar(record)}
                            onCancel={() => false}
                            okText="Sim"
                            cancelText="Não"
                            >
                            <Tooltip placement="left" title="clique para estornar">
                                <Tag color="green">
                                    liquidado
                                </Tag>
                            </Tooltip>
                        </Popconfirm>
                    );
                }
    
                return (
                    <Popconfirm
                        title="Deseja liquidar?"
                        onConfirm={() => this.liquidar(record)}
                        onCancel={() => false}
                        okText="Sim"
                        cancelText="Não"
                        >
                        <Tooltip placement="left" title="clique para liquidar">
                            <Tag color="orange">
                                pendente
                            </Tag>
                        </Tooltip>
                    </Popconfirm>
                );
            },
        },
    ];

    editAll = selectedsRows => {
        console.log("selected rows", selectedsRows)
    }

    deleteAll = selectedsRows => {
        console.log("deleteds rows", selectedsRows)
    }

    editItem = item  => this.setState({ itemEdit: item });

    handleCancelEditItem = () => this.setState({ itemEdit: {} });

    getFiltersOptions() {
        return (
            <Button>Filtrar</Button>
        );
    }

    render() {

        const { loading, data, className } = this.props;
        const { itemEdit } = this.state;

        const viewFormReceita = (itemEdit.id > 0 && itemEdit.tipo === 1);
        const viewFormDespesa = (itemEdit.id > 0 && itemEdit.tipo === 2);

        return (
            <div>
                <FormNovaReceita
                    visible={viewFormReceita}
                    handleCancel={this.handleCancelEditItem}
                    dataValues={itemEdit}
                    isEdit
                // wrappedComponentRef={form => this.formNewRecipe = form}
                />
                <FormNovaDespesa
                    visible={viewFormDespesa}
                    handleCancel={this.handleCancelEditItem}
                    dataValues={itemEdit}
                    isEdit
                // wrappedComponentRef={form => this.formNewRecipe = form}
                />
                <AppTable
                    rowKey="id"
                    loading={loading}
                    className={className}
                    dataSource={data}
                    columns={this.columns}
                    title="Movimentações"
                    buttons={[
                        { label: 'Liquidar', onClick: this.deleteAll },
                        { label: 'Excluir', type: 'danger', onClick: this.deleteAll }
                    ]}
                    filter={this.getFiltersOptions()}
                    handlerPagination={page => this.load({page})}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: getMovimentacoes(state),
        loading: getLoading(state),
    };
};

export default connect(mapStateToProps, { loadMovimentacoes })(MovimentacoesTable);
