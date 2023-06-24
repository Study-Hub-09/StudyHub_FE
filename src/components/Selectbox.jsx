import React, { useEffect, useState } from 'react';
import checkmark from '../asset/checkmark.svg';
import {
  StSelectbox,
  Stbtn,
  Stfont,
  StCheckmark,
} from '../styles/mainpage/Selectbox.styles';
const Selectbox = ({
  handleCategory,
  isSelectOpen,
  setSelectOpen,
  prevSelectedOption,
  setPrevSelectedOption,
  outside,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(prevSelectedOption);

  const handleClickOutside = (event) => {
    if (!outside.current.contains(event.target)) {
      setSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSelectOpen]);

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

  const handleOptionClick = (option) => {
    if (selectedOptions === option && prevSelectedOption === option) {
      setSelectedOptions('');
      setPrevSelectedOption(''); // 이전 선택 값을 초기화합니다.
    } else {
      setSelectedOptions(option);
      setPrevSelectedOption(option); // 새로운 값으로 갱신합니다.
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
            onClick={() => {
              handleOptionClick(item.name);
            }}
          >
            {isSelected && <StCheckmark src={checkmark} alt="checkmarkImage unable" />}
            <Stfont>{item.name}</Stfont>
          </Stbtn>
        );
      })}
    </StSelectbox>
  );
};

export default Selectbox;
