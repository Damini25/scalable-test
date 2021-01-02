import React from 'react';
import PropTypes from 'prop-types';

class InputSelector extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const { onInputchange } = this.props;
        const inputValues = {
            name: event.target.name,
            value: parseInt(event.target.value)
        }
        onInputchange(inputValues);
    }

    render() {
        const { riskOptions, riskLevel,years,investmentSum,monthlySum } = this.props;
        return (
            <div>
                <div>
                    <label>Risk level:</label>
                    <select onChange={this.onChange} value={riskLevel} name="riskLevel" data-testid="risk-options-id">
                        {riskOptions}
                    </select>
                </div>

                <div>
                    <label>No. of years:</label>
                    <input type="number" data-testid="years-id" min="1" max="1000" onChange={this.onChange} value={years} name="years" />
                </div>

                <div>
                    <label>Initial Investment Sum:</label>
                    <input type="number" min="1" max="10000" onChange={this.onChange} value={investmentSum} name="investmentSum" />
                </div>

                <div>
                    <label>Initial Monthly Sum:</label>
                    <input type="number" min="1" max="10000" onChange={this.onChange} value={monthlySum} name="monthlySum" />
                </div>
            </div>
        );
    }
}

InputSelector.defaultProps = {
    riskLevel: 3,
    riskOptions: [],
    onInputchange: () => { },
};

InputSelector.propTypes = {
    riskLevel: PropTypes.number,
    riskOptions: PropTypes.array,
    onInputchange: PropTypes.func
};

export default InputSelector;
