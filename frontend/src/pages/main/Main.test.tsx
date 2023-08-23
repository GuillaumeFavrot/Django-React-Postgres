import React from 'react';
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import Main from './index';

let component: any;

describe('Main', () => {
  beforeEach(() => {
      component = render(
          <Provider store={store}>
              <Main />
          </Provider>
      );
  });

  it('Should properly render the DOM tree and display the "API Tester" title', () => {
    expect(component.getByText(/API Tester/i)).toBeInTheDocument();
  });
})