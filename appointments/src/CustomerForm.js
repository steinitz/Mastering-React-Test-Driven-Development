import React from 'react';

export const CustomerForm = ({firstName}) => (
  <form id="customer">
    <label htmlFor="firstName">First name</label>
    <input
      type="text"
      readOnly
      name="firstName"
      id="firstName"
      value={firstName}
    />
  </form>
);

