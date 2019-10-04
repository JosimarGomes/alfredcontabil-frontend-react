import React, { Component } from 'react';
import { Tabs, Card, TabPane } from 'app-ui';

// const dataSource = [
//     {
//         key: '1',
//         name: 'Receitas',
//         total: "390,00",
//     }, 
//     {
//         key: '2',
//         name: 'Despesas',
//         total: "290,00",
//     },
//     {
//         key: '3',
//         name: 'Total',
//         total: "100,00",
//     }
// ];

//   const columns = [{
//     title: '',
//     dataIndex: 'name',
//     key: 'name',
//   }, {
//     title: '',
//     dataIndex: 'total',
//     key: 'total',
//   }];



class BalanceSummary extends Component {

    getSummaryByPeriod = data => {

        const google = window.google;
        // Load the Visualization API and the corechart package.
        google.charts.load('current', { 'packages': ['corechart'] });

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                ['Receitas', 349.00],
                ['Despesas', 134.90],
            ]);

            // Set chart options
            var options = {
                'title': '',
                // 'width':"100%",
                'height': 300,
                is3D: true,
                slices: {
                    0: { color: '#5cb85c' },
                    1: { color: '#d9534f' }
                },
                legend: 'none',
                pieSliceText: 'label',
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    }

    render() {
        return (
            <Card className="height-500">
                <h2>Saldo atual: <b>34.790,90</b></h2>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Dia" key="1">
                        {this.getSummaryByPeriod()}
                        <div id="chart_div"></div>
                    </TabPane>
                    <TabPane tab="Semana" key="2">
                        {this.getSummaryByPeriod()}
                    </TabPane>
                    <TabPane tab="Mês" key="3">
                        {this.getSummaryByPeriod()}
                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default BalanceSummary;