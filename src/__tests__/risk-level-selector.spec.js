import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import InputSelector from '../risk-level-selector';

const props = {
    riskLevel: 3,
    years: 1,
    investmentSum: 1000,
    monthlySum: 100,
    onInputchange:jest.fn(),
    riskOptions:[3,4,5,6,7]
}
afterEach(cleanup)
test('render <InputSelector>', () => {
    const wrapper = render(<Router><InputSelector {...props}/></Router>)
    expect(wrapper).toMatchSnapshot()
})
test('function call on risk options change',()=>{
    const wrapper = render(<Router><InputSelector {...props}/></Router>)
    const inp = document.querySelector("[data-testid=risk-options-id]");
    const event = {
        target: { value: 3 }
      }
    fireEvent.change(inp,event)
    expect(props.onInputchange).toHaveBeenCalledTimes(1)
})
test('function call on years options change',()=>{
    render(<Router><InputSelector {...props}/></Router>)
    const inp = document.querySelector("[data-testid=years-id]");
    const event = {
        target: { value: '3' }
      }
    fireEvent.change(inp,event)
    expect(props.onInputchange).toHaveBeenCalledTimes(1)
})