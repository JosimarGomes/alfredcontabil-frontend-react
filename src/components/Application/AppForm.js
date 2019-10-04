import React, { Component } from 'react';
import moment from 'moment';
import {
    Modal,
    Form,
    message,
    Input,
    DatePicker,
    Select,
    Upload,
    Button,
    Icon,
    AutoComplete,
    InputNumber
} from 'app-ui';
import { fileToObject } from 'antd/lib/upload/utils';

const { Option } = Select;

class AppForm extends Component {

    static defaultProps = {
        size: 'middle',
        title: '',
        fields: [],
        dataValues: {}
    }

    constructor(props) {
        super(props);

        this.handleOk = this.props.handleOk;
        this.handleCancel = this.props.handleCancel;
        this.state = {
            confirmLoading: false,
        };
        this.size = {
            small: '30%',
            middle: '45%',
            large: '65%',
        };
    }

    onCancel = () => {

        const { confirmLoading } = this.state;
        if (confirmLoading === true) {
            return false;
        }

        return this.handleCancel();
    }

    onOk = () => {

        const { form } = this.props;

        form.validateFields((err, values) => {
            if (err) {
                // eslint-disable-next-line prefer-promise-reject-errors
                message.error('Alguns campos obrigatórios não foram preenchidos');
            } else {

                this.setState({ confirmLoading: true }, () => {
                    const formData = form.getFieldsValue();
                    this.handleOk(formData)
                        .then(() => {

                            this.setState({ confirmLoading: false });
                            this.handleCancel();
                            form.resetFields();

                            setTimeout(() => {
                                message.success('Salvou com sucesso!');
                            }, 500);
                        })
                        .catch(err => {
                            this.setState({ confirmLoading: false });
                            message.error(err.message);
                        });
                });
            }
        });
    }

    getFieldByTypes = field => {

        const basicProps = {
            className: field.className,
            style: field.style
        };

        if (field.type === 'date') {
            return <DatePicker
                        {...basicProps}
                        format={"DD/MM/YYYY"}
                    />;
        }

        if (field.type === 'select') {
            return (
                <Select 
                    {...basicProps}
                >
                    {
                        field.options.map(option => <Option value={option.value} key={option.value}>{option.name}</Option>)
                    }
                </Select>
            );
        }

        if (field.type === 'upload') {

            const props = {
                name: 'file',
                action: '//jsonplaceholder.typicode.com/posts/',
                headers: {
                    authorization: 'authorization-text',
                },
                // onRemove: (file) => console.log("removeu"), file
            };

            return (
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" />
                        Adicionar
                    </Button>
                </Upload>
            );
        }

        if (field.type === 'hidden') {
            return <Input hidden />
        }

        if (field.type === 'autocomplete') {
            return (
                <AutoComplete
                    {...basicProps}
                    dataSource={this.autoCompleteMapDataSource(field.dataSource)}
                    // style={{ width: 200 }}
                    onChange={field.onChange}
                    onSelect={field.onSelect}
                    placeholder="pesquisar"
                    optionLabelProp="title"
                />
            );
        }

        if (field.type === 'number') {
            return(
                <InputNumber 
                    {...basicProps}
                    precision={2}
                    decimalSeparator=","
                />
            )
        }

        if (field.type === 'text') {
            return <Input {...basicProps} />;
        }
    }

    autoCompleteMapDataSource = data => {
        return(
            data.map( item => 
                <Option key={item.value} title={item.title} >
                    { item.title }
                </Option>
            )
        )
    }

    getFieldsForm = field => {

        const { getFieldDecorator } = this.props.form;

        return getFieldDecorator(field.name, {
            rules: field.rules || [],
            initialValue: field.value,
        })(this.getFieldByTypes(field));
    }

    includesDataValuesInFields = fields => {
        const { dataValues } = this.props;

        fields.forEach( (item,index) => {

            let itemValue = dataValues[item.name];

            if (item.type === 'date') {
                itemValue = moment(itemValue);
            }

            if (item.type === 'autocomplete') {
                const itemField = item.setOptions(item);
                fields[index] = itemField;
                itemValue = itemField.labelValue;
            }

            if (item.type === 'select') {
                const itemField = item.setOptions(item);
                fields[index] = itemField;
                itemValue = itemField.value;
            }

            fields[index].value = itemValue;
        });

        return fields;
    }

    getFields() {

        let { fields } = this.props;
        fields = Object.values(fields);

        fields = this.includesDataValuesInFields(fields);

        return (
            <div>
                {
                    fields.map(field => {
                        return (
                            <Form.Item
                                key={field.name}
                                label={field.label}
                            >
                                { this.getFieldsForm(field) }
                            </Form.Item>
                        );
                    })
                }
            </div>
        );
    }

    render() {

        const { visible, size, title, id } = this.props;
        const { confirmLoading } = this.state;

        return (
            <Modal
                title={title.toUpperCase()}
                width={this.size[size]}
                okText="Salvar"
                cancelText="Cancelar"
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                confirmLoading={confirmLoading}
            >
                <Form
                    layout="vertical"
                    id={id}
                >
                    { this.getFields() }
                </Form>
            </Modal>
        )
    }
}

export default Form.create({})(AppForm);

export function translateOptionsForSelect(options = [], config = {}) {
    return options.map(opt => ({ value: opt[config.id], name: opt[config.name] }));
}

export function translateOptionsForAutoComplete(options = [], config = {}) {
    return options.map(opt => {
        return {
            title: opt[config.name],
            value: opt[config.id]
        }
    });
}
