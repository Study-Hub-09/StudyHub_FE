import React, { useEffect, useState, useRef } from 'react';
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
  selectToggleHandler,
}) => {
  const [selectedOptions, setSelectedOptions] = useState('');
  const [oldSelectedOptions, setOldSelectedOptions] = useState('');
  const outside = useRef();

  const handleClickOutside = (event) => {
    if (!outside.current.contains(event.target)) {
      event.stopPropagation();
      setSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
      if (selectedOptions === option) {
        setSelectedOptions(''); // 이미 선택한 항목을 다시 클릭하면 선택 해제
      } else {
        setSelectedOptions(option); // 다른 항목을 선택합니다.
      }

      setPrevSelectedOption(option); // 이전 선택 값을 설정합니다.
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
              if (!isSelectOpen) {
                selectToggleHandler(); // 상위 컴포넌트에서 전달받은 함수를 실행합니다.
              }
            }}
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
