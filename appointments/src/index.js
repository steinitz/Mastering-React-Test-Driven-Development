import React from 'react';
import ReactDOM from 'react-dom';
import { AppointmentForm } from './AppointmentForm';
import { availableTimeSlots } from './sampleData';

ReactDOM.render(
  <AppointmentForm
    availableTimeSlots={availableTimeSlots}
  />,
  document.getElementById('root')
);
