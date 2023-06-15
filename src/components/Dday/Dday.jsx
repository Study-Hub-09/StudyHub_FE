import React, { useEffect, useState } from 'react';

function Dday(props) {
  const { dDayName, date } = props.info;
  const [hover, setHover] = useState(false);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const today = new Date();
    const dday = new Date(`${date} 00:00:00`);
    const gapNum = dday - today;
    setDays(Math.ceil(gapNum / (1000 * 60 * 60 * 24)));
  }, [date]);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      id={props.id}
      onClick={props.delete}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: hover ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <div>
          <div>{dDayName}</div>
          <div>{date}</div>
        </div>
        <div>
          <span>
            D{days >= 0 ? '-' : '+'}
            {days === 0 ? 'day' : Math.abs(days)}
            <br />
          </span>
        </div>
        {hover && <button>지우기</button>}
      </div>
    </div>
  );
}

export default Dday;
