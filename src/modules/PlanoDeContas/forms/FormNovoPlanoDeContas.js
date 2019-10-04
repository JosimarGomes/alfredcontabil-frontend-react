import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppForm from 'components/Application/AppForm';
import { PlanoDeContasApi } from 'services/api';
import { loadPlanoDeContas } from '../redux';


class FormNovoPlanoDeContas extends Component {

    constructor(props) {
        super(props);

        this.idForm = 'form_novo_planodecontas';
        this.title = 'Novo plano de contas';

        this.state = {
            fields: {
                nome: {
                    name: 'nome',
                    label: 'Descrição',
                    type: 'text',
                    rules: [{ required: true, message: 'Informe a descrição' }],
                },
                codigo: {
                    name: 'codigo',
                    label: 'Código',
                    type: 'text',
                    rules: [{ required: true, message: 'Informe o códigos' }],
                },
            },
        };
    }

    saveNovoPlanoDeContas = formData => {

        return new Promise((resolve, reject) => {

            PlanoDeContasApi.post(formData)
                .then(resp => {
                    this.props.loadPlanoDeContas();
                    resolve(resp);
                })
                .catch(err => {
                    const message = err.response.data.message || 'Não foi possível salvar';
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject({ message });
                });
        });
    }

    render() {

        const { fields } = this.state;

        return (
            <AppForm
                id={this.idForm}
                {...this.props}
                handleOk={this.saveNovoPlanoDeContas}
                title={this.title}
                fields={fields}
            />
        );
    }
}

// export default FormNovoPlanoDeContas;


const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, { loadPlanoDeContas })(FormNovoPlanoDeContas);
