import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {
  Appointment,
  appointmentTimeOfDay,
  AppointmentsDayView,
} from '../src/Appointment';

import {sampleAppointments} from './sampleData';

const appointments = sampleAppointments;

describe('Appointment', () => {
  let container;
  let appointment;

  const render = component =>
    ReactDOM.render(component, container);

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders the customer first name', () => {
    appointment = {customer: {firstName: 'Ashley'}};
    render(<Appointment appointment={appointment} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    appointment = {customer: {firstName: 'Jordan'}};
    render(<Appointment appointment={appointment} />);
    expect(container.textContent).toMatch('Jordan');
  });

  it('renders customer name in a valid table structure', () => {
    appointment = {customer: {firstName: 'Alice'}};
    render(<Appointment appointment={appointment} />);
    expect(container.querySelector('table')).not.toBeNull();
    expect(container.querySelector('tbody')).not.toBeNull();
    expect(container.querySelector('tr')).not.toBeNull();
    expect(container.querySelector('td')).not.toBeNull();
    // querySelector returns first match
    // querySelectorAll returns NodeList (array)
    expect(container.querySelector('td').textContent).toEqual('Alice');
  });

  it('renders one table row for each appointment info key', () => {
    render(<Appointment appointment={appointments[0]} />);
    expect (container.querySelectorAll('tr')).toHaveLength(Object.keys(appointments[0]).length);
  })

  // it('creates labels for appointment values', () => {
  //
  // })

});

describe('AppointmentsDayView', () => {
  let container;

  const render = component =>
    ReactDOM.render(component, container);

  const today = new Date();

  // console.log(appointments);
  // const appointments = [
  //   {
  //     startsAt: today.setHours(12, 0),
  //     customer: {firstName: 'Ashley'},
  //   },
  //   {
  //     startsAt: today.setHours(13, 0),
  //     customer: {firstName: 'Jordan'},
  //   },
  // ];

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  })

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector('ol')).not.toBeNull();
    expect(
      container.querySelector('ol').children
    ).toHaveLength(appointments.length);
  })

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li')).toHaveLength(appointments.length);
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual(appointmentTimeOfDay(appointments[0].startsAt));
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual(appointmentTimeOfDay(appointments[1].startsAt));
  })


  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch(appointments[0].customer.firstName);
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect (
      container.querySelectorAll('li > button')
    ).toHaveLength(appointments.length);
    expect (
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch((appointments[1].customer.firstName));
  });

});

