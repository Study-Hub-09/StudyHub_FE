import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Subtract from '../asset/Subtract.svg';
import Vector from '../asset/Vector.svg';
import check from '../asset/check.svg';
import noncheck from '../asset/noncheck.svg';
import allow from '../asset/Polygon 3.svg';
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

function Main() {
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSelectOpen, setSelectOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [url, setUrl] = useState('');
  const [filterData, setfilterData] = useState('');

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

  const checkBoxHandler = () => {
    setChecked(!checked);
  };

  const modalToggleHandler = () => {
    setModalOpen(true);
  };
  const selectToggleHandler = () => {
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
          <Modal
            onClose={() => {
              setModalOpen(false);
            }}
          />
        )}
        {joinModalOpen && (
          <Joinmodal
            roomData={pageData.find((item) => item.sessionId === selectedRoomId)}
            onClose={() => {
              setJoinModalOpen(false);
            }}
          />
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
              <StSearchicon src={Subtract} alt="" />
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
          {pageData.length === 0 ? (
            <img src={emptyRoom} alt="" width={1020} height={599} />
          ) : (
            <>
              <Stfilterbox>
                {/* {checked ? (
                  <Stcheckboximg onClick={checkBoxHandler} src={check} alt="" />
                ) : (
                  <Stcheckboximg onClick={checkBoxHandler} src={noncheck} alt="" />
                )}
                <Stfont>입장 가능한 방만 보기</Stfont> */}
                <Stfont>
                  <span>분야 필터</span>
                  <StCategoryButton src={allow} alt="" onClick={selectToggleHandler} />
                </Stfont>
                {isSelectOpen && <Selectbox handleCategory={handleCategory} />}
              </Stfilterbox>
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
                        <img
                          src={
                            item.imageUrl === '대표 이미지 URL' ? studyhub : item.imageUrl
                          }
                          alt=""
                          width={82}
                          height={82}
                        />
                        <Stroomtext>
                          <Stroomtitle>{item.roomName}</Stroomtitle>
                          <Stroomsubtitle>{item.roomContent}</Stroomsubtitle>
                        </Stroomtext>
                        <div>
                          <Stroomcountarea>
                            {item.secret ? <img src={lockimg} alt="" /> : ''}
                            <Stroomcount>
                              <span>{item.userCount} / 9</span>
                              <img src={Vector} alt="" />
                            </Stroomcount>
                          </Stroomcountarea>
                        </div>
                      </Stroomboxlayout>
                    </Stroombox>
                  );
                })}
              </StroomArea>
            </>
          )}
        </StContents>
        <Stallowbox>
          <Stallowicon
            src={page > 1 ? hoverLeftAllow : leftAllow}
            alt=""
            onClick={prevpageHandler}
          />
          <Stallowicon
            src={nextPageData.length > 0 ? hoverRightAllow : rightAllow}
            alt=""
            onClick={nextpageHandler}
          />
        </Stallowbox>
      </Stcontainer>
    </>
  );
}

export default Main;

const Stcontainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StTopline = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StContents = styled.div`
  width: 1018px;
  height: 642px;
`;

const StTitlebox = styled.div`
  width: 301px;
  height: 75.39px;
  gap: 9.39px;
  display: flex;
  flex-direction: column;
`;

const StTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const Stsubtitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #84848484;
`;

const StSearchbox = styled.div`
  gap: 24px;
  display: flex;
  height: 44px;
  align-items: center;
`;

const StSearchinput = styled.input`
  position: relative;
  width: 229px;
  height: 36px;
  background-color: #e8e8e8;
  border-radius: 12px;
  padding-left: 43px;
  font-size: 15px;
`;

const StSearchicon = styled.img`
  position: absolute;
  transform: translateX(14px);
  z-index: 1;
`;

const StButton = styled.button`
  width: 141px;
  height: 44px;
  padding: 11px 26px;
  gap: 10px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  color: #00573f;
  border: 1px solid #bfbfbf;
  &:hover {
    border: none;
    color: #ffffff;
    background-color: #00573f;
  }
`;

const Stroombox = styled.div`
  width: 485px;
  height: 125px;
  border: 1px solid #bfbfbfbf;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 19px 24px;
  cursor: pointer;
  background-color: white;
`;

const Stfilterbox = styled.div`
  display: flex;
  justify-content: end;
  gap: 21px;
  margin-top: 90px;
  margin-bottom: 10px;
`;

const StroomArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-gap: 15px 40px;
`;

const Stroomboxlayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;

const Stroomtext = styled.div`
  display: flex;
  flex-direction: column;
  width: 67%;
  gap: 13px;
  padding-left: 26px;
  height: 100%;
  /* transform: translate3d(-70px, -15px, 0px); */
`;

const Stroomtitle = styled.div`
  font-weight: 700;
  font-size: 15px;
`;

const Stroomsubtitle = styled.div`
  font-weight: 500;
  font-size: 15px;
`;

const Stroomcountarea = styled.div`
  display: flex;
  gap: 17px;
  transform: translate3d(0px, 40px, 0px);
  align-items: center;
`;

const Stroomcount = styled.div`
  display: flex;
  gap: 10px;
  font-size: 15px;
  color: #90b54c;
  width: 65px;
  font-weight: 500;
`;

const Stcheckboximg = styled.img`
  transform: translateX(14px);
  cursor: pointer;
`;

const Stallowbox = styled.div`
  width: 1018px;
  display: flex;
  justify-content: end;
  /* gap: 21px; */
`;

const Stallowicon = styled.img`
  cursor: pointer;
`;

const Stfont = styled.div``;

const StCategoryButton = styled.img`
  cursor: pointer;
  margin-left: 10px;
`;
