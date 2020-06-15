import React from 'react';

export const CustomerForm = ({firstName}) => (
  <form id="customer">
    <input
      type="text"
      readOnly
      name="firstName"
      value={firstName}
    />
  </form>
);

