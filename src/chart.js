import React from 'react';
import {Chart as ChartJs} from 'chart.js';
import {calculateTimeSeries} from './utils';

class Chart extends React.Component {

    componentDidMount() {
        this.drawChart()
    }

    drawChart() {
        const {riskLevel, years, investmentSum, monthlySum,conesData} = this.props;
        const {mu, sigma} = conesData.length && conesData.filter(cone => cone.riskLevel == riskLevel)[0];
        const fee = 0.01;

        const timeSeries = calculateTimeSeries({
            mu,
            sigma,
            years: years,
            initialSum: investmentSum,
            monthlySum: monthlySum,
            fee
        });
        console.log(JSON.stringify(timeSeries))

        const labels = timeSeries.median.map((v, idx) => idx % 12 == 0 ? idx/12 : '');
        const dataMedian = timeSeries.median.map(v => v.y);
        const dataGood = timeSeries.upper95.map(v => v.y);
        const dataBad = timeSeries.lower05.map(v => v.y);

        const data = {
            datasets: [
                {
                    data: dataGood,
                    label: 'Good performance',
                    borderColor: 'rgba(100, 255, 100, 0.2)',
                    fill: false,
                    pointRadius: 0
                },
                {
                    data: dataMedian,
                    label: 'Median performance',
                    borderColor: 'rgba(100, 100, 100, 0.2)',
                    fill: false,
                    pointRadius: 0
                },
                {
                    data: dataBad,
                    label: 'Bad performance',
                    borderColor: 'rgba(255, 100, 100, 0.2)',
                    fill: false,
                    pointRadius: 0
                }
            ],
                labels
        };

        const options = {
            responsive: false,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Years'
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Valuation (EUR)'
                    }
                }]
            }
        };

        const config = {
            type: 'line',
            data,
            options
        };
        console.log('data',JSON.stringify(data))
        console.log('options',JSON.stringify(options))

        const canvas = this.canvas;
        const context = canvas.getContext("2d");
        const myChart = new ChartJs(context, config);
    }

    render() {
        return (
            <div>
                <canvas
                    ref={ref => this.canvas = ref}
                    width={600}
                    height={400}
                    data-testid="canvas-id"
                />
            </div>
        );
    }
}

export default Chart;
