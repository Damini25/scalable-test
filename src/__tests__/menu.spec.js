import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from '../menu';


afterEach(cleanup)
test('render <Menu>', () => {
    const wrapper = render(<Router><Menu /></Router>)
    expect(wrapper).toMatchSnapshot()
})