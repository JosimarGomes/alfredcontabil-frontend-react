import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppForm, {
    translateOptionsForSelect,
    translateOptionsForAutoComplete
} from 'components/Application/AppForm';
import {
    getPlanoDeContas,
    getContasBancarias,
    loadPlanoDeContas
} from 'modules/shared/redux';
import { MovimentacoesApi } from 'services/api';
import { loadMovimentacoes } from '../redux';
import { debounce } from 'utils';

class FormNovaMovimentacao extends Component {

    constructor(props) {
        super(props);
        const {
            type,
            id,
            title,
            fields,
            method,
            isEdit,
        } = props;

        this.type = type === 'receita' ? 1 : 2;

        this._fields = {
            dataVencimento: {
                name: 'dataVencimento',
                label: 'Data de vencimento',
                type: 'date',
                rules: [{ required: true, message: 'Informe o vencimento' }],
            },
            valor: {
                name: 'valor',
                label: 'Valor R$',
                type: 'number',
                style: { width: 200 },
                rules: [{ required: true, message: 'Insira um valor' }],
            },
            descricao: {
                name: 'descricao',
                label: 'Serviço',
                type: 'text',
                rules: [{ required: true, message: 'Informe a descrição' }],
            },
            contaBancaria: {
                name: 'contaBancariaId',
                label: 'Conta bancária',
                type: 'select',
                options: [],
                setOptions: this.includeInfoContaBancaria,
            },
            planoDeContas: {
                name: 'planoDeContaId',
                label: 'Plano de contas',
                type: 'autocomplete',
                dataSource: [],
                onChange: debounce(this.onChangePlanoDeContas, 500),
                onSelect: this.onSelectPlanoDeContas,
                labelValue: '',
                inputValue: '',
                setOptions: this.includeInfoPlanoDeContas,
            },
        };

        if (isEdit) {
            this._fields.id = {
                name: 'id',
                type: 'hidden',
            }
        };

        this.formFields = { ...this._fields, ...fields };

        this.idForm = id;
        this.title = title;

        this.state = {
            fields: this.formFields,
        };

        this.method = method || "post";
    }

    onChangePlanoDeContas = value => this.props.loadPlanoDeContas({ search: value });        

    onSelectPlanoDeContas = selected => this._fields.planoDeContas.inputValue = parseInt(selected);

    save = formData => {

        return new Promise((resolve, reject) => {

            const data = { 
                ...formData,
                ...{ 
                        tipo: this.type,
                        planoDeContaId: this._fields.planoDeContas.inputValue || this.props.dataValues.planoDeContaId
                    }
            };

            MovimentacoesApi[this.method](data)
                .then(resp => {
                    this.props.loadMovimentacoes({comDadosPlanoDeContas: 1});
                    resolve(resp);
                })
                .catch(err => {
                    const message = err.response.data.message || 'Não foi possível salvar';
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject({ message });
                });
        });
    }

    includeInfoPlanoDeContas = field => {

        const { planoDeContas, dataValues } = this.props;
        const arrPlanoDeContas = planoDeContas.rows;

        const formatedFields = field;

        if (dataValues && dataValues.PlanoDeConta ) {
            formatedFields.labelValue = dataValues.PlanoDeConta.nome || "";
        }
        
        if (arrPlanoDeContas.length) {
            formatedFields.dataSource = translateOptionsForAutoComplete(arrPlanoDeContas, { id: 'id', name: 'nome', key: 'id' });
        }      

        return formatedFields;
    }

    includeInfoContaBancaria = field => {

        const { contasBancarias, dataValues } = this.props;
        const arrContasBancarias = contasBancarias.rows;

        if (!arrContasBancarias.length) {
            return field;
        }
        
        const defaultValue = dataValues&&dataValues.contaBancariaId ? dataValues.contaBancariaId : arrContasBancarias.filter(item => item.padrao === true)[0].id;
        
        return {
            ...field,
            ...{
                value: defaultValue,
                options: translateOptionsForSelect(arrContasBancarias, { id: 'id', name: 'nome' })
            }
        };
    }

    render() {

        let { fields } = this.state;

        return (
            <AppForm
                id={this.idForm}
                {...this.props}
                handleOk={this.save}
                title={this.title}
                fields={fields}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        planoDeContas: getPlanoDeContas(state),
        contasBancarias: getContasBancarias(state),
    };
};

export default connect(mapStateToProps, { loadMovimentacoes, loadPlanoDeContas })(FormNovaMovimentacao);

// export { FormNovaReceita };
