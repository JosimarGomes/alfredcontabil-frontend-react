import React, { Component } from 'react';
// import { connect } from 'react-redux';
import FormNovaMovimentacao from './FormNovaMovimentacao';

export default class FormNovaReceita extends Component {

    constructor(props) {
        super(props);

        this.idForm = props.isEdit ? 'form_editar_receita' : 'form_nova_receita';
        this.title = props.isEdit ? 'Editar receita' : 'Nova receita';
        this.method = props.isEdit ? 'put' : 'post';
    }

    render() {

        return (
            <FormNovaMovimentacao
                type="receita"
                id={this.idForm}
                {...this.props}
                title={this.title}
                method={this.method}
            />
        );
    }
}
