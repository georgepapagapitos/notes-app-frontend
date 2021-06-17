import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Toggle from './Toggle';

describe('<Toggle />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Toggle buttonLabel='show...'>
        <div className='testDiv' />
      </Toggle>
    );
  });

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggleContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.toggleContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    const closeButton = component.getByText('cancel');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.toggleContent');
    expect(div).toHaveStyle('display: none');
  });
});