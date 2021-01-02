const React = require('react');
import PropTypes from 'prop-types';
import { calculateTimeSeries } from './utils';
import 'regenerator-runtime/runtime';
import { Fragment } from 'react';

class Table extends React.Component {
    componentDidMount() {
        this.drawTable();
    }

    drawTable() {
        const { riskLevel, years, investmentSum, monthlySum, conesData } = this.props;
        const cone = conesData.length && conesData.filter(cone => cone.riskLevel == riskLevel)[0];
        const fee = 0.01;

        const timeSeries = calculateTimeSeries({
            mu: cone.mu,
            sigma: cone.sigma,
            years: years,
            initialSum: investmentSum,
            monthlySum: monthlySum,
            fee
        });

        const months = timeSeries.median.map((v, idx) => idx);
        const dataGood = timeSeries.upper95.map(v => v.y);
        const dataMedian = timeSeries.median.map(v => v.y);
        const dataBad = timeSeries.lower05.map(v => v.y);

        const rows = months.map((entry, idx) => (
            <tr key={idx}>
                <td>{entry}</td>
                <td>{dataGood[idx]}</td>
                <td>{dataMedian[idx]}</td>
                <td>{dataBad[idx]}</td>
            </tr>
        ));
        const tableHeader = <Fragment>
            <tr>
                <th key="month">month</th>
                <th key="good">good</th>
                <th key="median">median</th>
                <th key="bad">bad</th>
            </tr>
        </Fragment>
        return (
            <table>
                <thead>
                    {tableHeader}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
    render() {
        return this.drawTable()
    }
}

Table.defaultProps = {
    riskLevel: 3,
    years: 1,
    investmentSum: 1000,
    monthlySum: 200
};

Table.propTypes = {
    riskLevel: PropTypes.number,
    years: PropTypes.number,
    investmentSum: PropTypes.number,
    monthlySum: PropTypes.number,
    conesData: PropTypes.array,
};

export default Table;
