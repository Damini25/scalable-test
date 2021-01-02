import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import App from '../app';
import cones from '../../cones.json';

afterEach(cleanup)
test('render <App>', () => {
    const wrapper = render(<App />)
    expect(wrapper).toMatchSnapshot()
})
test('test for fetchConesData api call', async () => {
    const wrapper = render(<App />)
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(cones)
        })
    );
    await act(async () => {
        render(<App />);
      });
})
