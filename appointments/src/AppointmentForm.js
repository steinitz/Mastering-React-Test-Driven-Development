import React from 'react';

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit
}) => (
  <form
    id="appointment"
    onSubmit={() => onSubmit({service})}
  >
    <label htmlFor="service">Services</label>
    <select
      name="service"
      id="service"
      value={service}
      readOnly
    >
      <option />
      {
        selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))
      }
    </select>
    <input type="submit" value="Submit" />
  </form>
);

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-Dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
}
