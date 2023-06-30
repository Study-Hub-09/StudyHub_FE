import React, { useState, useEffect, useRef } from 'react';
import Subtract from '../asset/Subtract.svg';
import Vector from '../asset/Vector.svg';
import openAllow from '../asset/Polygon 3.svg';
import closeAllow from '../asset/selectboxAllow.svg';
import leftAllow from '../asset/leftArrow.svg';
import rightAllow from '../asset/rightArrow.svg';
import hoverLeftAllow from '../asset/hoverLeftArrow.svg';
import hoverRightAllow from '../asset/hoverRightArrow.svg';
import studyhub from '../asset/studyhub.svg';
import emptyRoom from '../asset/emptyarea.svg';
import Modal from '../components/Modal';
import Joinmodal from '../components/Joinmodal';
import lockimg from '../asset/lock.svg';
import Selectbox from '../components/Selectbox';
import { useRoomData, useSearchData } from '../components/Customhook';
import ModalPortal from '../components/Modal/ModalPortal';
import {
  Stcontainer,
  StTopline,
  StContents,
  StTitlebox,
  StTitle,
  Stsubtitle,
  StSearchbox,
  StSearchinput,
  StSearchicon,
  StButton,
  Stroombox,
  Stfilterbox,
  StroomArea,
  Stroomboxlayout,
  Stroomtext,
  Stroomtitle,
  Stroomsubtitle,
  Stroomcountarea,
  Stroomcount,
  Stallowbox,
  Stallowicon,
  StCategoryButton,
  StEmptyImage,
  Stroomboxlmage,
} from '../styles/mainpage/Main.styles';
import { getCookie } from '../Cookies/Cookies';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../CustomAlert/Alert';
function Main() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSelectOpen, setSelectOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [filterData, setfilterData] = useState('');
  const [prevSelectedOption, setPrevSelectedOption] = useState('');
  const token = getCookie('AccessToken');
  const navigate = useNavigate();
  const outside = useRef();

  useEffect(() => {
    setfilterData({ category: selectCategory, keyword: search });
  }, [search, selectCategory]);

  const roomData = useRoomData(page);

  const objectToQueryString = (obj) => {
    let queryString = '';

    Object.entries(obj).forEach(([key, value], index) => {
      if (Array.isArray(value)) {
        queryString += `${key}=${value.join(',')}`;
      } else {
        queryString += `${key}=${value}`;
      }

      if (index < Object.entries(obj).length - 1) {
        queryString += '&';
      }
    });

    return queryString;
  };

  const queryString = objectToQueryString(filterData);
  // 검색및 필터링 시 사용하는 요청
  const searchData = useSearchData(
    page,
    queryString,
    search !== '' || selectCategory !== ''
  );

  if (roomData.isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (roomData.isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  // undefined 일 시 빈배열 할당
  const currentPageData = roomData.data?.currentPageData || [];
  const nextPageData = roomData.data?.nextPageData || [];

  const modalToggleHandler = () => {
    if (token) {
      setModalOpen(true);
    } else {
      Alert('info', '로그인이 필요한 서비스입니다', () => navigate('/login'));
    }
  };
  const selectToggleHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectOpen(!isSelectOpen);
  };

  const joinmodalToggleHandler = (id) => {
    setJoinModalOpen(true);
    setSelectedRoomId(id);
  };

  const nextpageHandler = () => {
    if (nextPageData.length > 0) {
      setPage(page + 1);
    }
  };
  const prevpageHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // 하위컴포넌트에서 데이터를 가지고오는 코드
  const handleCategory = (selectedOptions) => {
    setSelectCategory(selectedOptions);
  };

  // 최종 데이터
  let pageData = searchData?.data?.content ? searchData?.data?.content : currentPageData;

  return (
    <>
      <div>
        {isModalOpen && (
          <ModalPortal>
            <Modal
              onClose={() => {
                setModalOpen(false);
              }}
            />
          </ModalPortal>
        )}
        {joinModalOpen && (
          <ModalPortal>
            <Joinmodal
              roomData={pageData.find((item) => item.sessionId === selectedRoomId)}
              onClose={() => {
                setJoinModalOpen(false);
              }}
            />
          </ModalPortal>
        )}
      </div>
      <Stcontainer>
        <StContents>
          <StTopline>
            <StTitlebox>
              <StTitle>공개 스터디</StTitle>
              <Stsubtitle>자유롭게 공개된 스터디에 참여해보세요!</Stsubtitle>
            </StTitlebox>
            <StSearchbox>
              <StSearchicon src={Subtract} alt="SearchImage unable" />
              <StSearchinput
                type="text"
                placeholder="스터디방 이름 검색"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <StButton onClick={modalToggleHandler}>스터디 만들기</StButton>
            </StSearchbox>
          </StTopline>
          <Stfilterbox>
            <div>
              <span>분야 필터</span>
              <StCategoryButton
                src={isSelectOpen ? closeAllow : openAllow}
                alt="selectBoxImage unable"
                onClick={selectToggleHandler}
              />
            </div>
            {isSelectOpen && (
              <Selectbox
                handleCategory={handleCategory}
                isSelectOpen={isSelectOpen}
                setSelectOpen={setSelectOpen}
                prevSelectedOption={prevSelectedOption}
                setPrevSelectedOption={setPrevSelectedOption}
                outside={outside}
              />
            )}
          </Stfilterbox>
          {pageData.length === 0 ? (
            <StEmptyImage src={emptyRoom} alt="emptyRoomImage unable" />
          ) : (
            <StroomArea>
              {pageData.map((item) => {
                return (
                  <Stroombox
                    key={item.sessionId}
                    onClick={() => {
                      joinmodalToggleHandler(item.sessionId);
                    }}
                  >
                    <Stroomboxlayout>
                      <Stroomboxlmage
                        src={
                          item.imageUrl === '대표 이미지 URL' ? studyhub : item.imageUrl
                        }
                        alt="roomImage unable"
                      />
                      <Stroomtext>
                        <Stroomtitle>{item.roomName}</Stroomtitle>
                        <Stroomsubtitle>{item.roomContent}</Stroomsubtitle>
                      </Stroomtext>
                      <div>
                        <Stroomcountarea>
                          {item.secret ? (
                            <img src={lockimg} alt="lockImage unable" />
                          ) : (
                            ''
                          )}
                          <Stroomcount>
                            <span>{item.userCount} / 9</span>
                            <img src={Vector} alt="userImage unable" />
                          </Stroomcount>
                        </Stroomcountarea>
                      </div>
                    </Stroomboxlayout>
                  </Stroombox>
                );
              })}
            </StroomArea>
          )}
        </StContents>
        <Stallowbox>
          <Stallowicon
            src={page > 1 ? hoverLeftAllow : leftAllow}
            alt="leftAllowImage unable"
            onClick={prevpageHandler}
          />
          <Stallowicon
            src={nextPageData.length > 0 ? hoverRightAllow : rightAllow}
            alt="rightAllowImage unable"
            onClick={nextpageHandler}
          />
        </Stallowbox>
      </Stcontainer>
    </>
  );
}

export default Main;
