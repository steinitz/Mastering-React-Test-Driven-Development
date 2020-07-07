import React, { useState } from 'react';

export const AppointmentForm = ({
  selectableServices,
  defaultService,
  onSubmit
}) => {
  const [service, setService] = useState(defaultService);
  console.log('defaultService')

  const handleChange = ({target}) => {
    setService(target.value);
  }

  return (
    <form
      id="appointment"
      onSubmit={() => onSubmit({service})}
    >
      <label htmlFor="service">Services</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleChange}
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
}

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
