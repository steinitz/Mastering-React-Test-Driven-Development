import React, {useState} from 'react';

export const appointmentFieldLabels = [
  'Customer',
  'Phone number',
  'Stylist',
  'Service',
  'Notes',
];

export const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');
  return`${h}:${m}`;
}

export const Appointment = ({ appointment }) => {
  return (
    <div>
      <h2>
        Today's appointment at {
          appointmentTimeOfDay(appointment.startsAt)
        }
      </h2>
      <table>
        <tbody>
          {
            Object.keys(appointment).map((key, index) => {
              return (
                  <tr key={key}>
                    <td>{appointmentFieldLabels[index]}</td>
                    <td>
                      {
                        key==='customer' ?
                          appointment[key].firstName :
                          appointment[key]
                      }
                    </td>
                  </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};


export const AppointmentsDayView = ({appointments}) => {
  const [
    selectedAppointment,
    setSelectedAppointment
  ] = useState(0);
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button
              type="button"
              onClick={() => setSelectedAppointment(i)}
            >
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {
        appointments.length === 0 ? (
          <p>There are no appointments scheduled for today.</p>
        ) : (
          <Appointment appointment = {
            appointments[selectedAppointment]
          } />
        )
      }
    </div>
  );
};
