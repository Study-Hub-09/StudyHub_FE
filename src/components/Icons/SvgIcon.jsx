import React from 'react';

function SvgIcon(props) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox={props.viewBox}
      fill={props.fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.path}
    </svg>
  );
}

export default SvgIcon;
