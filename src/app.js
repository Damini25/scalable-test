import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from './menu';
import InputSelector from './risk-level-selector';
import Table from './table';
import Chart from './chart';
import { minRiskLevel, maxRiskLevel, defaultRiskLevel, defaultYears, defaultInvestmentSum, defaultMonthlySum } from './constants';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            riskLevel: defaultRiskLevel,
            years: defaultYears,
            investmentSum: defaultInvestmentSum,
            monthlySum: defaultMonthlySum,
            riskOptions: [],
            conesData:[]
        };
        this.minRiskLevel = minRiskLevel;
        this.maxRiskLevel = maxRiskLevel;
        this.getRiskOptions = this.getRiskOptions.bind(this);
        this.onInputchange = this.onInputchange.bind(this);
    }

    componentDidMount() {
        this.fetchConesData();
        this.getRiskOptions();
    }

    /** fetch cones data */
    async getConesData(url = '') {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

    fetchConesData() {
        this.getConesData(`http://localhost:3000/api/cones`)
            .then(response => {
                console.log('conesData', response);
                if (response) {
                    this.setState({conesData:[...response]})
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    getRiskOptions() {
        const options = [];
        for (let k = this.minRiskLevel; k <= this.maxRiskLevel; k++) {
            options.push(
                <option key={k} value={k}>{k}</option>
            );
        }
        this.setState({
            riskOptions: [...options]
        })
    }

    onInputchange(inputValues) {
        this.setState({ [inputValues.name]: inputValues.value });
    }

    render() {
        const { conesData, riskLevel, riskOptions, years, investmentSum, monthlySum,timeSeries } = this.state;
        return (
            <Router>
                <div>
                    <Menu />
                    <InputSelector
                        onInputchange={this.onInputchange}
                        riskOptions={riskOptions}
                        riskLevel={riskLevel}
                        years={years}
                        investmentSum={investmentSum}
                        monthlySum={monthlySum}
                    />
                    <Route exact path="/" component={() => <Table
                        riskLevel={riskLevel}
                        years={years}
                        investmentSum={investmentSum}
                        monthlySum={monthlySum}
                        conesData={conesData}
                    />
                    } />
                    <Route path="/table" component={() => <Table
                        riskLevel={riskLevel}
                        years={years}
                        investmentSum={investmentSum}
                        monthlySum={monthlySum}
                        conesData={conesData}
                    />} />
                    <Route path="/chart" component={() => <Chart
                        riskLevel={riskLevel}
                        years={years}
                        investmentSum={investmentSum}
                        monthlySum={monthlySum}
                        conesData={conesData}
                    />} />
                </div>
            </Router>
        );
    }

}
