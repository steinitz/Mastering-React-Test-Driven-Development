import React from 'react';
import {
  click,
  id,
  className,
  childrenOf,
  createShallowRenderer,
  type,
} from './shallowHelpers';
import {App} from '../src/App';
import {
  AppointmentsDayViewLoader
} from '../src/AppointmentsDayViewLoader';
import {
  AppointmentFormLoader
} from '../src/AppointmentFormLoader';
import {CustomerForm} from '../src/CustomerForm';

describe('App', () => {
  let render, elementsMatching, elementMatching, child;

  beforeEach(() => {
    ({
      render,
      elementMatching,
      elementsMatching,
      child
    } = createShallowRenderer());
  });

  it('initially shows the AppointmentsDayViewLoader', () => {
    render(<App />);
    // variables for debugging
    const theTypeMatcher = type(AppointmentsDayViewLoader);
    const theElement = elementMatching(theTypeMatcher);

    expect(theElement).toBeDefined();
  });

  it('has a button bar as the first child', () => {
    render(<App />);
    expect(child(0).type).toEqual('div');
    expect(child(0).props.className).toEqual('button-bar');
  });

  it('has a button to initiate add customer and appointent action', () => {
    render(<App />);
    const buttons = childrenOf(
      elementMatching(className('button-bar'))
    );
    expect(buttons[0].type).toEqual('button');
    expect(buttons[0].props.children).toEqual(
      'Add customer and appointment'
    );
  });

  const beginAddingCustomerAndAppointment = () => {
    render(<App />);
    const matcher = id('addCustomer');
    const element = elementMatching(matcher);
    click(element);
  };

  it('displays the CustomerForm when button is clicked', async () => {
    beginAddingCustomerAndAppointment();
    expect(elementMatching(type(CustomerForm))).toBeDefined();
  });

  it('hides the AppointmentsDayViewLoader when button is clicked', () => {
    beginAddingCustomerAndAppointment();
    expect(
      elementMatching(type(AppointmentsDayViewLoader))
    ).not.toBeDefined()
  });

  it('hides the button bar when CustomerForm is displayed', () => {
      beginAddingCustomerAndAppointment();
      expect(
        elementMatching(className('button-bar'))
      ).not.toBeDefined();
    }
  )

  const saveCustomer = customer =>
    elementMatching(type(CustomerForm)).props.onSave(customer);

  const appointmentFormLoader = () => elementMatching(
    type(AppointmentFormLoader)
  );

  it(
    'displays AppointmentFormLoader after submitting CustomerForm',
    async () => {
      beginAddingCustomerAndAppointment();
      saveCustomer();

      expect(
        appointmentFormLoader()
      ).toBeDefined();
    }
  );

  it(
    'passes customer to AppointmentForm',
    async () => {
      const customer = {id: 123};

      beginAddingCustomerAndAppointment();
      saveCustomer(customer);

      expect(
        appointmentFormLoader().props.customer
      ).toBe(customer);
    }
  );

  const saveAppointment = () =>
    elementMatching(
      type(AppointmentFormLoader)
    ).props.onSave();

  it(
    'renders AppointmentDayViewLoader after user submits AppointmentForm',
    async () => {
    beginAddingCustomerAndAppointment();
    saveCustomer();
    saveAppointment();

    expect(
      elementMatching(type(AppointmentsDayViewLoader))
    ).toBeDefined();
  });

});
