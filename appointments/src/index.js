import React from 'react';
import ReactDOM from 'react-dom';
// import { AppointmentsDayView } from './AppointmentsDayView';
// import { sampleAppointments } from './sampleData';
import {CustomerForm} from './CustomerForm';

// ReactDOM.render(
//   <AppointmentsDayView appointments={sampleAppointments} />,
//   document.getElementById('root')
// );

ReactDOM.render(
  <CustomerForm
    firstName="fred"
    lastName="blogs"
    phoneNumber="12345678"
    onSubmit={() => console.log('submit running')}
  />,
  document.getElementById('root')
);
