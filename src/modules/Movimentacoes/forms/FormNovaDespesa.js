import React, { Component } from 'react';
// import { connect } from 'react-redux';
import FormNovaMovimentacao from './FormNovaMovimentacao';

export default class FormNovaDespesa extends Component {

    constructor(props) {
        super(props);

        this.idForm = props.isEdit ? 'form_editar_despesa' : 'form_nova_despesa';
        this.title = props.isEdit ? 'Editar despesa' : 'Nova Despesa';
        this.method = props.isEdit ? 'put' : 'post'; 

        this.state = {
            fields: {
                teste: {
                    name: 'teste',
                    label: 'Anexos',
                    type: 'upload',
                },
            },
        };
    }

    render() {

        const { fields } = this.state;

        return (
            <FormNovaMovimentacao
                type="despesa"
                id={this.idForm}
                {...this.props}
                title={this.title}
                fields={fields}
            />
        );
    }

}
