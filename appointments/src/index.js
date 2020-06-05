import React from 'react';
import ReactDOM from 'react-dom';
import {AppointmentsDayView} from './Appointment';
import {sampleAppointments} from '../test/sampleData';

ReactDOM.render(
  <AppointmentsDayView appointments={sampleAppointments} />,
  document.getElementById('root')
);
