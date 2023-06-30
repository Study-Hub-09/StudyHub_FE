import React, { useEffect, useState } from 'react';
import LogoW from '../../assets/Images/LogoW.svg';
import Logoic from '../../assets/Images/Logoic.svg';
import Dashboard from '../../assets/Images/Dashboard Icon.svg';
import setting from '../../assets/Images/setting2.svg';
import logoutimg from '../../assets/Images/logout.svg';
import profile from '../../assets/Images/Frame 19.svg';
import profileout from '../../assets/Images/Frame 20.svg';
import Straight from '../../assets/Images/Straight.svg';
import RevStraight from '../../assets/Images/RevStraight.svg';
import main from '../../assets/Icons/main.svg';
import nSeed from '../../assets/Icons/nSeed.png';
import nSprout from '../../assets/Icons/nSprout.png';
import nSapling from '../../assets/Icons/nSapling.png';
import nTree from '../../assets/Icons/nTree.png';
import nBigTree from '../../assets/Icons/nBigTree.png';
import nCenturyTree from '../../assets/Icons/nCenturyTree.png';
import nWorldTree from '../../assets/Icons/nWorldTree.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../Cookies/Cookies';
import { useQuery } from 'react-query';
import { getMypage } from '../../core/api/mypage/mypage';
import { logout } from '../../core/api/auth/logout';
import {
  StContainer,
  StSidebarContainer,
  StLogoContainer,
  StNavLinkContainer,
  StNavLink,
  StNavLink2,
  StMenuItems,
  StIcon,
  StName,
  StSymbol,
  StRevStraight,
  StStraight,
  StProfileContainer,
  StProfileLaout,
  StProfileFreame,
  StProfile,
  StPofileTextFreame,
  StPofileImgText,
  StPofileImg,
  StPofileName,
  StPofileText2,
  StOutFrame,
} from '../../styles/sidebar/Sidebar.styles';
import { Alert } from '../../CustomAlert/Alert';

function SideBar({ children }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [token, setToken] = useState('');
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [title, setTitle] = useState('');
  const location = useLocation();

  const { data, isLoading, isError } = useQuery('mypage', () => getMypage(), {
    onSuccess: (response) => {
      // console.log(response);
      setTotalStudyTime(response.data.totalStudyTime);
      setTitle(response.data.title);
    },
    onError: (error) => {
      // console.log('error', error.msg);
    },
    enabled: !!token,
    staleTime: 3000,
    notifyOnChangeProps: 'tracked',
  });

  useEffect(() => {
    const accessToken = getCookie('AccessToken');
    setToken(accessToken);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  const getRankingImage = () => {
    // 랭킹 이미지를 랭킹에 따라 매핑합니다.
    if (token) {
      if (title === '씨앗') {
        return nSeed;
      } else if (title === '새싹') {
        return nSprout;
      } else if (title === '잎줄기') {
        return nSapling;
      } else if (title === '묘목') {
        return nTree;
      } else if (title === '나무') {
        return nBigTree;
      } else if (title === '거목') {
        return nCenturyTree;
      } else if (title === '세계수') {
        return nWorldTree;
      }
    }
    return nSeed;
  };

  const tokenHandler = async () => {
    if (token) {
      try {
        const {
          status: statusCode,
          data: { message: responseMessage },
        } = await logout();
        if (statusCode === 200 && responseMessage === '로그아웃 성공') {
          removeCookie('AccessToken', { path: '/' });
          removeCookie('RefreshToken', { path: '/' });
          localStorage.removeItem('member');
          setToken('');
          Alert('success', responseMessage, () => {
            if (location.pathname === '/setting') {
              navigate('/');
            } else if (location.pathname === '/main') {
              navigate('/');
            } else if (location.pathname === '/mypage') {
              navigate('/');
            } else {
              return;
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const totalTime = (totalStudyTime) => {
    const hours = Math.floor(totalStudyTime / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalStudyTime % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalStudyTime % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const menuItem = [
    {
      navigate: '/main',
      name: '공개 스터디',
      icon: <img src={main} alt="main icon" />,
    },
    {
      navigate: '/mypage',
      name: '내 공부 현황',
      icon: <img src={Dashboard} alt="mypage icon" />,
    },
  ];
  const menuItem1 = [
    {
      navigate: '/setting',
      name: '개인설정 및 보안',
      icon: <img src={setting} alt="setting icon" />,
    },
  ];
  const menuItem2 = [
    {
      onClick: () => (token ? tokenHandler() : navigate('/members/login')),
      name: token ? '로그아웃' : '로그인',
      icon: <img src={logoutimg} alt="logout icon" />,
    },
  ];

  return (
    <StContainer>
      <StSidebarContainer isopen={isOpen ? 'true' : undefined}>
        <StLogoContainer>
          <StSymbol
            src={isOpen ? LogoW : Logoic}
            alt="Logo"
            isopen={isOpen ? 'true' : undefined}
            onClick={() => {
              navigate('/');
            }}
          />
          {/* <StSymbolName isOpen={isOpen}>스터브</StSymbolName> */}
          <StRevStraight
            src={RevStraight}
            alt="reverse arrow"
            isopen={isOpen ? 'true' : undefined}
            onClick={toggle}
          />
        </StLogoContainer>

        <StNavLinkContainer>
          {menuItem.map((item, index) => (
            <StNavLink
              to={item.navigate}
              key={index}
              // active={window.location.pathname === item.navigate}
              active={window.location.pathname === item.navigate ? 'true' : undefined}
            >
              <StMenuItems
                isopen={isOpen ? 'true' : undefined}
                // active={window.location.pathname === item.navigate}
                active={window.location.pathname === item.navigate ? 'true' : undefined}
              >
                <StIcon>{item.icon}</StIcon>
                <StName
                  isopen={isOpen ? 'true' : undefined}
                  // active={window.location.pathname === item.navigate}
                  active={window.location.pathname === item.navigate ? 'true' : undefined}
                >
                  {item.name}
                </StName>
              </StMenuItems>
            </StNavLink>
          ))}
          {/* <StLine isOpen={isOpen} /> */}
          {token &&
            menuItem1.map((item, index) => (
              <StNavLink
                to={item.navigate}
                key={index}
                // active={window.location.pathname === item.navigate}
                active={window.location.pathname === item.navigate ? 'true' : undefined}
              >
                <StMenuItems
                  isopen={isOpen ? 'true' : undefined}
                  // active={window.location.pathname === item.navigate}
                  active={window.location.pathname === item.navigate ? 'true' : undefined}
                >
                  <StIcon>{item.icon}</StIcon>
                  <StName
                    isopen={isOpen ? 'true' : undefined}
                    // active={window.location.pathname === item.navigate}
                    active={
                      window.location.pathname === item.navigate ? 'true' : undefined
                    }
                  >
                    {item.name}
                  </StName>
                </StMenuItems>
              </StNavLink>
            ))}
          {menuItem2.map((item, index) => (
            <StNavLink2 key={index} onClick={item.onClick}>
              <StMenuItems isopen={isOpen ? 'true' : undefined}>
                <StIcon>{item.icon}</StIcon>
                <StName isopen={isOpen ? 'true' : undefined}>{item.name}</StName>
              </StMenuItems>
            </StNavLink2>
          ))}
        </StNavLinkContainer>

        <StProfileContainer>
          <StProfileLaout>
            <StProfileFreame isopen={isOpen ? 'true' : undefined}>
              <StProfile
                src={
                  token
                    ? data?.data?.imageUrl === '대표 프로필 이미지 URL' ||
                      data?.data?.imageUrl === null
                      ? profile
                      : data?.data?.imageUrl
                    : profileout
                }
                alt="profile icon"
              />
            </StProfileFreame>

            <StPofileTextFreame>
              <StPofileImgText isopen={isOpen ? 'true' : undefined}>
                <StPofileImg src={getRankingImage()} />
                <StPofileName>{token ? localStorage.member : '게스트'}</StPofileName>
              </StPofileImgText>

              <StPofileText2 isopen={isOpen ? 'true' : undefined}>
                {token ? `누적시간 ${totalTime(totalStudyTime)}` : '로그인하여 이용하기'}
              </StPofileText2>
            </StPofileTextFreame>
          </StProfileLaout>
        </StProfileContainer>
      </StSidebarContainer>
      <StOutFrame isopen={isOpen ? 'true' : undefined}>
        <StStraight
          src={Straight}
          alt="arrow"
          isopen={isOpen ? 'true' : undefined}
          onClick={toggle}
        />
      </StOutFrame>
    </StContainer>
  );
}

export default SideBar;
