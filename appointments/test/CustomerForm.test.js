import 'whatwg-fetch';
import React from 'react';
import ReactTestUtils, {act} from 'react-dom/test-utils';
import {createContainer} from './domManipulators';
import {
  fetchResponseOk,
  fetchResponseError,
  requestBodyOf
} from './spyHelpers';
import {CustomerForm} from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({render, container} = createContainer());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  })

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form('customer').elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });

  it(
    'calls fetch with the right properites when submitting data',
    async () => {
      render(<CustomerForm />);
      ReactTestUtils.Simulate.submit(form('customer'));
      expect(window.fetch).toHaveBeenCalledWith(
        '/customers',
        expect.objectContaining(
          {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'}
          }
        )
      );
    }
  );

  it(
    'renders error message when fetch call fails',
    async () => {
      window.fetch.mockReturnValue(Promise.resolve({ok: false}));
      render(<CustomerForm />);
      await act(
        async() => {
          ReactTestUtils.Simulate.submit(form('customer'));
        }
      );
      const errorElement = container.querySelector('.error');
      expect(errorElement).not.toBeNull();
      expect(errorElement.textContent).toMatch('error occured');
    }
  )

  it('notifies onSave when form is submitted', async () => {
    const customer = {id: 123};
    window.fetch.mockReturnValue(fetchResponseOk(customer));
    const saveSpy = jest.fn();

    render(<CustomerForm onSave={saveSpy} />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    });
    expect(saveSpy).toHaveBeenCalledWith(customer);
  });

  it(
    'does not notify onSave if the POST request returns an error',
    async () => {
      window.fetch.mockReturnValue(fetchResponseError());
      const saveSpy = jest.fn();
      render(<CustomerForm onSave={saveSpy} />);
      await act(async () => {
        ReactTestUtils.Simulate.submit(form('customer'));
      });
      expect(saveSpy).not.toHaveBeenCalled();
    }
  );

  it(
    'prevents the default action when submitting the form',
    async () => {
      const preventDefaultSpy = jest.fn();// spy();
      render(<CustomerForm />);
      await act(async () => {
        ReactTestUtils.Simulate.submit(
          form('customer'),
          {preventDefault: preventDefaultSpy}
        );
      });
    }
  )

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = fieldName =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, text) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    });

  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName) =>
    it('saves existing value when submitted', async () => {

      render(
        <CustomerForm
          {...{ [fieldName]: 'value' }}
        />
      );

      ReactTestUtils.Simulate.submit(form('customer'));
      expect(requestBodyOf(window.fetch)).toMatchObject({[fieldName]: 'value'});
    });

  const itSubmitsNewValue = (fieldName) =>
    it('saves new value when submitted', async () => {
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
        />
      );
      ReactTestUtils.Simulate.change(
        field(fieldName),
        {target: { value: 'newValue', name: fieldName }}
      );
      ReactTestUtils.Simulate.submit(form('customer'));

      expect(requestBodyOf(window.fetch)).toMatchObject({[fieldName]: 'newValue'});
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'value');
    itSubmitsNewValue('firstName', 'newValue');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName', 'value');
    itSubmitsNewValue('lastName', 'newValue');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber', '12345');
    itSubmitsNewValue('phoneNumber', '67890');
  });
});
