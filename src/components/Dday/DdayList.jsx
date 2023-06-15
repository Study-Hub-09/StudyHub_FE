import React, { useState } from 'react';
import Dday from './Dday';

function DdayList({ onDdayListChange }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [list, setList] = useState([]);
  const [userInputs, setUserInputs] = useState({
    dDayName: '',
    date: '',
  });

  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInputs.dDayName === '' || userInputs.date === '') {
      return;
    } else {
      setIsSubmit(true);
      setList([...list, userInputs]);
    }

    for (let i = 0; i < 2; i++) {
      e.target[i].value = '';
    }

    setUserInputs({ dDayName: '', date: '' });
  };

  const deleteItem = (e) => {
    const key = e.target.id;
    list.splice(key, 1);
    setList([...list]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="dDayName"
          type="text"
          placeholder="What's your D-day?"
          onChange={handleChange}
        />
        <input name="date" type="date" onChange={handleChange} />
        <button type="submit">+</button>
      </form>
      <div>
        {isSubmit &&
          list
            .map((info, id) => <Dday info={info} id={id} delete={deleteItem} />)
            .reverse()}
      </div>
    </>
  );
}

export default DdayList;
