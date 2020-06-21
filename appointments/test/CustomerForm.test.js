import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {createContainer} from './domManipulators';
import {CustomerForm} from '../src/CustomerForm';

const expectToBeInputFieldOfTypeText = formElement =>{
  expect(formElement).not.toBeNull();
  expect(formElement.tagName).toEqual('INPUT');
  expect(formElement.type).toEqual('text');
}

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({render, container} = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"`);
  const field = (name) => form('customer').elements[name];
  const labelFor = formElement => container.querySelector(`label[for="${formElement}"`);

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm/>);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}} />);
      expect(field(fieldName).value).toEqual('value');
    })

  const itRendersALabel = (fieldName, label) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm/>);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName) =>
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{[fieldName]: 'existingValue'}}
          onSubmit={props =>
            expect(props[fieldName]).toEqual('existingValue')
          }
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  const itSubmitsNewValue = (fieldName) =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{[fieldName]: 'existingValue'}}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual('newValue')
          }
        />
      );
      // we only need to simulate one, the last, keystroke
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: {value: 'newValue'}
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  it('renders a form', () => {
    render(<CustomerForm/>);
    expect(form('customer')).not.toBeNull();
  });

  describe('first-name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName');
    itSubmitsNewValue('firstName');
  });

  describe('last-name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName');
    itSubmitsNewValue('lastName');
  });

});
