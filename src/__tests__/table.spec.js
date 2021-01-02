import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Table from '../table';

const props = {
    riskLevel: 3,
    years: 1,
    investmentSum: 1000,
    monthlySum: 100,
    conesData: [
        {
            "riskLevel": 3,
            "mu": 0.0216,
            "sigma": 0.0215
        }
    ]
}
afterEach(cleanup)
test('render <Table>', () => {
    const wrapper = render(<Table {...props} />)
    expect(wrapper).toMatchSnapshot()
})