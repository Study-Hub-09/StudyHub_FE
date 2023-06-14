import React from 'react';
import { StNavbar } from '../../styles/Layout.styles';

function FooterNavbar({ title, item1, item2, item3 }) {
  return (
    <StNavbar>
      <ul>
        <li>{title}</li>
        <li>{item1}</li>
        <li>{item2}</li>
        <li>{item3}</li>
      </ul>
    </StNavbar>
  );
}

export default FooterNavbar;
