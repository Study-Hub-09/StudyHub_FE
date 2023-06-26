import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 260px;
  /* border: 1px solid #ffffff; */
`;

export const StSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const StLogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 260px;
  height: 86px;
`;

export const StNavLinkContainer = styled.div`
  height: 59px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StNavLink = styled(Link)`
  height: 59px;
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: ${({ active }) => (active ? '#007c5c' : 'transparent')};
  &:hover {
    /* height: 29.5px;
    margin: 15px 0px 15px 0px; */
    border-right: 3px solid #ffffff;
  }
`;

export const StNavLink2 = styled.div`
  height: 59px;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    /* height: 29.5px;
    margin: 15px 0px 15px 0px; */
    border-right: 3px solid #ffffff;
  }
  background-color: ${({ active }) => (active ? '#007c5c' : 'transparent')};
`;

export const StMenuItems = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0px 0px 0px 36px;
  ${({ isOpen }) =>
    !isOpen &&
    `
    margin: 0px 28px 0px 28px; /* isOpen이 false일 때의 너비 */
  `}
  background-color: ${({ active }) => (active ? '#007c5c' : 'transparent')};
`;

export const StIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

export const StName = styled.div`
  width: 108px;
  height: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
  font-weight: ${({ active }) => (active ? '700' : '500')};
`;

export const StSymbol = styled.img`
  height: 39.44px;
  width: 106px;
  margin: 0px 0px 0px 36px;
  cursor: pointer;
  ${({ isOpen }) =>
    !isOpen &&
    `
    width: 22px;
    height: 32px;
    margin: 0px 0px 0px 30px; /* isOpen이 false일 때의 너비 */
  `}
`;

export const StRevStraight = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px 36px 0px 74px;
  cursor: pointer;
  transition: display 0.36s ease;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;

export const StStraight = styled.img`
  width: 24px;
  height: 24px;
  margin: 32px 0px 0px 0px;
  cursor: pointer;
  transition: display 0.36s ease;
  ${({ isOpen }) =>
    isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;

export const StProfileContainer = styled.div`
  box-sizing: border-box;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e8e8e8;
`;

export const StProfileLaout = styled.div`
  width: 197px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StProfileFreame = styled.div`
  width: 48px;
  height: 48px;
  transition: margin 0.36s ease;
  ${({ isOpen }) =>
    !isOpen &&
    `
    margin: 0px 0px 0px 72.67px; /* isOpen이 false일 때의 너비 */
  `}
`;

export const StProfile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const StPofileTextFreame = styled.div`
  width: 124px;
  height: 51px;
  display: flex;
  flex-direction: column;
  margin: 0px 0px 0px 12.67px;
`;

export const StPofileImgText = styled.div`
  width: 124px;
  height: 24px;
  display: flex;
  align-items: center;
  ${({ isOpen }) =>
    !isOpen &&
    `
    display: none; /* isOpen이 false일 때의 너비 */
  `}
`;

export const StPofileImg = styled.img`
  width: 16px;
  height: 16px;
  margin: 0px 7px 0px 0px;
`;

export const StPofileName = styled.div`
  width: 70px;
  height: 16px;
  display: flex;
  align-items: center;
  color: #ffffff;
`;

export const StPofileText2 = styled.div`
  width: 129px;
  height: 28px;
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

export const StOutFrame = styled.div`
  width: ${({ isOpen }) => (!isOpen ? '20px' : '0px')};
  background: ${({ isOpen }) => (!isOpen ? '#00573f' : 'transparent')};
  opacity: ${({ isOpen }) => (!isOpen ? 0.8 : 0)};
  box-shadow: ${({ isOpen }) => (!isOpen ? '6px 6px 10px #d9e7dd' : 'none')};
`;