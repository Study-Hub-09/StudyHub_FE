import React, { useEffect, useState, useRef } from 'react';
import checkmark from '../asset/checkmark.svg';
import {
  StSelectbox,
  Stbtn,
  Stfont,
  StCheckmark,
} from '../styles/mainpage/Selectbox.styles';
const Selectbox = ({ handleCategory, isSelectOpen, setSelectOpen }) => {
  const [selectedOptions, setSelectedOptions] = useState('');
  const [oldSelectedOptions, setOldSelectedOptions] = useState('');
  const outside = useRef();

  // const handleClickOutside = (event) => {
  //   if (outside.current && !outside.current.contains(event.target)) {
  //     setSelectOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isSelectOpen) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isSelectOpen]);

  const category = [
    {
      name: '어학',
    },
    {
      name: '취업',
    },
    {
      name: '자격증',
    },
    {
      name: '취미',
    },
    {
      name: '독서',
    },
    {
      name: '공무원',
    },
    {
      name: '임용',
    },
    {
      name: '기타',
    },
  ];
  useEffect(() => {
    if (isSelectOpen) {
      setOldSelectedOptions(selectedOptions);
    } else {
      setSelectedOptions(oldSelectedOptions);
    }
  }, [isSelectOpen]);

  const handleOptionClick = (option) => {
    if (!isSelectOpen) {
      setOldSelectedOptions(selectedOptions);
    } else {
      setSelectedOptions(option); // 다른 항목을 선택합니다.
    }
  };

  useEffect(() => {
    handleCategory(selectedOptions);
  }, [selectedOptions]);

  return (
    <StSelectbox ref={outside}>
      {category.map((item, index) => {
        const isSelected = selectedOptions === item.name;
        return (
          <Stbtn
            key={index}
            selected={isSelected}
            onClick={() => handleOptionClick(item.name)}
          >
            {isSelected && <StCheckmark src={checkmark} alt="checkmark" />}
            <Stfont>{item.name}</Stfont>
          </Stbtn>
        );
      })}
    </StSelectbox>
  );
};

export default Selectbox;
