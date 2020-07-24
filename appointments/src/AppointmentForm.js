import React, { useState } from 'react';

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill(startTime)
    .reduce((acc, cur, i) =>
      acc.concat(startTime + (i * increment)),
      []
    );

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const aHalfHour = 30 * 60 * 1000;
  const result = timeIncrements(totalSlots, startTime, aHalfHour);
  return result
}

const weeklyDateValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0,0,0,0);
  const aDay = 24 * 60 *60 *1000;
  const result = timeIncrements(7, midnight, aDay);
  return result;
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);

const toShortDate = timestamp => {
  const datePartsArray = new Date(timestamp)
    .toDateString()
    .split(' ');
  const[day, , dayOfMonth] = datePartsArray;
  return `${day} ${dayOfMonth}`;
}

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);
  const result =  new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds(),
  );
  // console.log('mergeDateAndTime result', result);
  return result;
};

const isTimeSlotAvailable = (availableTimeSlots, date, timeSlot) => {
  const mergedSlot = mergeDateAndTime(date, timeSlot);
  const result = availableTimeSlots.some(
    availableTimeSlots => availableTimeSlots.startsAt === mergedSlot
  )
  // console.log('mergedSlot', mergedSlot, 'result', result);
  return result;
}

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots
}) => {
  // console.log('availableTimeSlots', availableTimeSlots);
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map(d => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {
              dates.map(
                date => (
                  <td key={date}>
                    {
                      isTimeSlotAvailable(
                        availableTimeSlots,
                        date,
                        timeSlot
                      ) ?
                        <input type="radio" /> :
                        null
                    }
                  </td>
                )
              )
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots
}) => {
  const [appointment, setAppointment] = useState({ service });

  const handleServiceChange = ({ target: { value } }) =>
    setAppointment(appointment => ({
      ...appointment,
      service: value
    }));

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Salon service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleServiceChange}>
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
      />
    </form>
  );
};

AppointmentForm.defaultProps = {
  availableTimeSlots: [],
  today: new Date(),
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ],
  salonOpensAt: 9,
  salonClosesAt: 19
};
