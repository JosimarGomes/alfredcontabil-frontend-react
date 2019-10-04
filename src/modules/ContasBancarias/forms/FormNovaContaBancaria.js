import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppForm from 'components/Application/AppForm';
import {
    Form, Input,
} from 'app-ui';


class FormNovaContaBancaria extends Component {

    saveNewCategory = () => {
        return new Promise((resolve, reject) => {
            const { form } = this.props;

            form.validateFields((err, values) => {
                if (err) {
                    reject(err);
                }
                setTimeout(() => {
                    form.resetFields();
                    resolve(values);
                }, 1500);
            });
        });
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;

        return (
            <AppForm
                {...this.props}
                handleOk={this.saveNewCategory}
                title="Nova conta bancária"
            >
                <Form.Item
                    label="Nome da conta"
                >
                    {
                        getFieldDecorator('accountName')(<Input />)
                    }
                </Form.Item>
                <Form.Item
                    label="Banco"
                >
                    {
                        getFieldDecorator('accountBank')(<Input />)
                    }
                </Form.Item>
                <Form.Item
                    label="Agência"
                >
                    {
                        getFieldDecorator('accountAgency')(<Input />)
                    }
                </Form.Item>
                <Form.Item
                    label="Número da conta"
                >
                    {
                        getFieldDecorator('accountNumber')(<Input />)
                    }
                </Form.Item>
            </AppForm>
        );
    }
}

FormNovaContaBancaria.propTypes = {
    form: PropTypes.object,
};

FormNovaContaBancaria.defaultProps = {
    form: {},
};

export default Form.create({})(FormNovaContaBancaria);
