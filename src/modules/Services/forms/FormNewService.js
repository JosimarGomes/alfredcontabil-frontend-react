import React, { Component } from 'react';
import AppForm from 'components/Application/AppForm';
import {
    Form, Input, Select, Option
} from 'app-ui';

class FormNewService extends Component {

    state = {
        confirmLoading: false
    }

    saveNewService = () => {

        return new Promise((resolve, reject) => {
            const form = this.props.form;

            console.log("teste", form.getFieldsValue())
            form.validateFields((err, values) => {
                if (err) {
                    reject({ message: "Preencha uma descrição" })
                }
                setTimeout(() => {
                    console.log('Received values of form: ', values);
                    form.resetFields();
                    resolve()
                }, 1500)

            });
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;

        return (
            <AppForm
                {...this.props}
                handleOk={this.saveNewService}
                title="Novo serviço"
                confirmLoading={confirmLoading}
            >
                <Form.Item
                    label="Descrição"
                >
                    {
                        getFieldDecorator('descricao')(<Input />)
                    }
                </Form.Item>
                <Form.Item
                    label="Plano de contas"
                >
                    {
                        getFieldDecorator('categoria', { initialValue: "1" })(
                            <Select style={{ width: "50%" }}>
                                <Option value="1">Option 1</Option>
                                <Option value="2">Option 2</Option>
                                <Option value="3">Option 3</Option>
                            </Select>
                        )
                    }
                </Form.Item>
            </AppForm>
        )
    }
}

export default Form.create({})(FormNewService)
