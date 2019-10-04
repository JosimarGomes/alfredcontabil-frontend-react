import React, { Component } from 'react';
import {
    Table,
    Card,
    Button,
    message,
    Title
} from 'app-ui';

class AppTable extends Component {

    static defaultProps = {
        title: '',
        dataSource: [],
        columns: [],
        size: 'middle',
        loading: false,
        buttons: [],
        handlerPagination: () => false,
        itemsPerPage: 5
    }

    state = {
        selectedRowKeys: [],
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    render() {

        const { selectedRowKeys } = this.state;
        const {
            title,
            dataSource,
            columns,
            size,
            loading,
            buttons,
            className,
            rowKey,
            filter,
            handlerPagination,
            itemsPerPage,
        } = this.props;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const paginationOptions = {
            defaultPageSize: itemsPerPage,
            onChange: handlerPagination,
            total: dataSource.count,
        };

        return (
            <Card className={className}>
                {
                    filter
                }
                <Table
                    rowKey={rowKey}
                    title={() => <h3 className="border-bottom text-bold">{title}</h3>}
                    dataSource={dataSource.rows}
                    columns={columns}
                    rowSelection={buttons.length ? rowSelection : false}
                    size={size}
                    loading={loading}
                    pagination={paginationOptions}
                />
                <p className="text-label">Ações em lote:</p>
                {
                    buttons.map(btn => {
                        const {
                            type,
                            classNameBtn,
                            label,
                            onClick,
                        } = btn;


                        return (
                            <Button
                                key={label}
                                type={type}
                                className={classNameBtn}
                                onClick={() => selectedRowKeys.length ? onClick(selectedRowKeys) : message.warning("Nenhum item selecionado", 2)}
                            >
                                { label }
                            </Button>
                        )
                    })
                }
            </Card>
        )
    }
}

export default AppTable;