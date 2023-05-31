import React, { useState } from 'react';
import Symbol from '../../assets/Images/Symbol.svg';
import Analitycs from '../../assets/Images/Analitycs.svg';
import Dashboard from '../../assets/Images/Dashboard Icon.svg';
import Search from '../../assets/Images/Search.svg';
import materialsymbols from '../../assets/Images/material-symbols_help-outline.svg';
import setting from '../../assets/Images/setting2.svg';
import logout from '../../assets/Images/logout.svg';
import profile from '../../assets/Images/Frame 20.svg';
import Straight from '../../assets/Images/Straight.svg';
import RevStraight from '../../assets/Images/RevStraight.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SideBar({ children }) {
  const nevigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      nevigate: '/main',
      name: '진행중인 스터디',
      icon: <img src={Analitycs} alt="오류" />,
    },
    {
      nevigate: '/mypage',
      name: '내 공부 현황',
      icon: <img src={Dashboard} alt="오류" />,
    },
    {
      nevigate: '/main',
      name: '검색',
      icon: <img src={Search} alt="오류" />,
    },
  ];
  const menuItem1 = [
    {
      nevigate: '/main',
      name: 'Help',
      icon: <img src={materialsymbols} alt="오류" />,
    },
    {
      nevigate: '/main',
      name: '설정',
      icon: <img src={setting} alt="오류" />,
    },
    {
      nevigate: '/members/login',
      name: '로그인',
      icon: <img src={logout} alt="오류" />,
    },
  ];
  return (
    <StContainer>
      <StSidebarContainer isOpen={isOpen}>
        <StLogoContainer>
          <StSymbol src={Symbol} alt="오류" isOpen={isOpen} />
          <StSymbolName isOpen={isOpen}>스터브</StSymbolName>
          <StRevStraight src={RevStraight} alt="오류" isOpen={isOpen} onClick={toggle} />
        </StLogoContainer>

        <StNavLinkContainer>
          {menuItem.map((item, index) => (
            <StNavLink to={item.nevigate} key={index}>
              <StMenuItems isOpen={isOpen}>
                <StIcon>{item.icon}</StIcon>
                <StName isOpen={isOpen}>{item.name}</StName>
              </StMenuItems>
            </StNavLink>
          ))}
          <StLine isOpen={isOpen} />
          {menuItem1.map((item, index) => (
            <StNavLink to={item.nevigate} key={index}>
              <StMenuItems isOpen={isOpen}>
                <StIcon>{item.icon}</StIcon>
                <StName isOpen={isOpen}>{item.name}</StName>
              </StMenuItems>
            </StNavLink>
          ))}
        </StNavLinkContainer>

        <StProfileContainer>
          <StProfileLaout>
            <StProfileFreame isOpen={isOpen}>
              <StProfile src={profile} alt="오류" />
            </StProfileFreame>

            <StPofileTextFreame>
              <StPofileText isOpen={isOpen}>게스트</StPofileText>
              <StPofileText2 isOpen={isOpen}>로그인하여 이용하기</StPofileText2>
            </StPofileTextFreame>
          </StProfileLaout>
        </StProfileContainer>
      </StSidebarContainer>
      <StOutFrame isOpen={isOpen}>
        <StStraight src={Straight} alt="오류" isOpen={isOpen} onClick={toggle} />
      </StOutFrame>
      {/* <StMainContainer>{children}</StMainContainer> */}
    </StContainer>
  );
}

export default SideBar;

const StContainer = styled.div`
  display: flex;
  height: 100vh;
`;
const StSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100vh;
  background: #00573f;
  filter: drop-shadow(6px 6px 10px #d9e7dd);
  transition: width 0.3s ease;
  ${({ isOpen }) =>
    !isOpen &&
    `
    width: 80px; /* isOpen이 false일 때의 너비 */
  `}
`;
const StLogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 260px;
  height: 86px;
`;
const StNavLinkContainer = styled.div`
  height: 59px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const StNavLink = styled(Link)`
  height: 59px;
  display: flex;
  align-items: center;
  text-decoration: none;
  &:hover {
    /* height: 29.5px;
    margin: 15px 0px 15px 0px; */
    border-left: 3px solid #ffffff;
  }
`;
const StMenuItems = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0px 0px 0px 36px;
  ${({ isOpen }) =>
    !isOpen &&
    `
    margin: 0px 28px 0px 28px; /* isOpen이 false일 때의 너비 */
  `}
`;
const StIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;
const StName = styled.div`
  width: 101px;
  height: 20px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;
const StLine = styled.div`
  width: 212px;
  margin: 0px 24px 0px 24px;
  border: 1px solid #e8e8e8;
  ${({ isOpen }) =>
    !isOpen &&
    `
    width: 32px; /* isOpen이 false일 때의 너비 */
  `}
`;
const StSymbol = styled.img`
  height: 32px;
  width: 32px;
  margin: 0px 8px 0px 36px;
  ${({ isOpen }) =>
    !isOpen &&
    `
    margin: 0px 24px 0px 24px; /* isOpen이 false일 때의 너비 */
  `}
`;
const StSymbolName = styled.div`
  width: 50px;
  height: 25px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;
const StRevStraight = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px 36px 0px 74px;
  transition: display 0.36s ease;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;
const StStraight = styled.img`
  width: 24px;
  height: 24px;
  margin: 32px 0px 0px 0px;
  transition: display 0.36s ease;
  ${({ isOpen }) =>
    isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;
const StProfileContainer = styled.div`
  box-sizing: border-box;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e8e8e8;
`;
const StProfileLaout = styled.div`
  width: 197px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StProfileFreame = styled.div`
  width: 48px;
  height: 48px;
  transition: margin 0.36s ease;
  ${({ isOpen }) =>
    !isOpen &&
    `
    margin: 0px 0px 0px 72.67px; /* isOpen이 false일 때의 너비 */
  `}
`;
const StProfile = styled.img`
  width: 48px;
  height: 48px;
`;
const StPofileTextFreame = styled.div`
  width: 129px;
  height: 48px;
  display: flex;
  flex-direction: column;
  margin: 0px 0px 0px 12.67px;
`;
const StPofileText = styled.div`
  width: 42px;
  height: 28px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  display: flex;
  align-items: flex-end;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;
const StPofileText2 = styled.div`
  width: 129px;
  height: 28px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #e8e8e8e8;
  display: flex;
  align-items: flex-end;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;
const StMainContainer = styled.div`
  width: 100%;
  height: 100vh;
  flex: 1;
  background-color: #9aaeff;
`;
const StOutFrame = styled.div`
  width: ${({ isOpen }) => (!isOpen ? '20px' : '0px')};
  background: ${({ isOpen }) => (!isOpen ? '#00573f' : 'transparent')};
  opacity: ${({ isOpen }) => (!isOpen ? 0.8 : 0)};
  box-shadow: ${({ isOpen }) => (!isOpen ? '6px 6px 10px #d9e7dd' : 'none')};
`;
