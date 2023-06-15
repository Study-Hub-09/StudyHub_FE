import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import checkmark from '../asset/checkmark.svg';
const Selectbox = ({ handleCategory }) => {
  const [selectedOptions, setSelectedOptions] = useState('');
  // keyword: search,

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

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
    handleCategory(selectedOptions);
  }, [selectedOptions]);

  return (
    <StSelectbox>
      {category.map((item, index) => {
        const isSelected = selectedOptions.includes(item.name);
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

const StSelectbox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 10px 0px;
  border-radius: 12px;
  border: 1px solid #bfbfbf;
  margin-top: 26px;
  background-color: white;
  z-index: 1;
`;
const Stbtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: lightgray;
  }
`;

const Stfont = styled.span`
  width: 40px;
  display: flex;
`;

const StCheckmark = styled.img`
  position: absolute;
  left: 17.29px;
`;
