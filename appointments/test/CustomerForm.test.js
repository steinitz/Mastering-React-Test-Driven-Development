import React from 'react';
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
  const firstNameField = () => form('customer').elements.firstName;
  const labelFor = formElement => container.querySelector(`label[for="${formElement}"`);

  it('renders a label for the first name field', () => {
    render(<CustomerForm />);
    expect(labelFor('firstName')).not.toBeNull();
    expect(labelFor('firstName').textContent).toEqual('First name');
  });

  it('renders a form', () => {
    render(<CustomerForm/>);
    expect(form('customer')).not.toBeNull();
  });

  it('renders the first name field as a text box', () => {
    render(<CustomerForm/>);
    expectToBeInputFieldOfTypeText(firstNameField());
  });

  it('includes any existing value for the first name', () => {
    render(<CustomerForm firstName="Ashley" />);
    expect(firstNameField().value).toEqual('Ashley');
  })

  it("assigns and id that matches the label id to the firstName field", () => {
    render(<CustomerForm/>);
    expect(firstNameField().id).toEqual('firstName');
  });
});
