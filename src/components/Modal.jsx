import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { styled, keyframes, css } from 'styled-components';
import { addRoom } from '../api/api';
import cancel from '../asset/cancel.svg';
import lockimg from '../asset/lock.svg';
import languageunClick from '../asset/language.svg';
import jobunClick from '../asset/job.svg';
import certificateunClick from '../asset/certificate.svg';
import hobbyunClick from '../asset/hobby.svg';
import bookunClick from '../asset/book.svg';
import officialunClick from '../asset/official.svg';
import teacherunClick from '../asset/teacher.svg';
import etcunClick from '../asset/etc.svg';
import languageClick from '../asset/languageClick.svg';
import jobClick from '../asset/jobClick.svg';
import certificateClick from '../asset/certificateClick.svg';
import hobbyClick from '../asset/hobbyClick.svg';
import bookClick from '../asset/bookClick.svg';
import officialClick from '../asset/officialClick.svg';
import teacherClick from '../asset/teacherClick.svg';
import etcClick from '../asset/etcClick.svg';
import dayjs from 'dayjs';
import BasicDatePicker from './Datepicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import roomimageA from '../asset/roomimageA.svg';
import roomimageB from '../asset/roomimageB.svg';
import roomimageC from '../asset/roomimageC.svg';
import roomimageD from '../asset/roomimageD.svg';

const Modal = ({ onClose }) => {
  const [roomName, setRoomName] = useState('');
  const [roomContent, setRoomContent] = useState('');
  const [lock, setLock] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesB, setSelectedCategoriesB] = useState([]);
  const [selectDate, setSelectDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [roomPassword, setRoomPassword] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [readerImage, setReaderImage] = useState(null);
  const [randomImage, setrandomImage] = useState(null);
  const outside = useRef();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(addRoom, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('rooms');
      // console.log(data.data);
      navigate(`/rooms/${data.data.sessionId}/detail`, {
        state: { roomData: data.data },
      });
    },
  });
  // 이미지업로드
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(file);
    setUploadedImage(file);
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 이미지 미리보기 설정
    const reader = new FileReader();
    reader.onload = (event) => {
      setReaderImage(event.target.result);
    };
    reader.readAsDataURL(file);
    console.log('reader', reader);
  };
  // 랜덤 이미지 설정
  const imageArray = [roomimageA, roomimageB, roomimageC, roomimageD];
  const randomImageHandler = () => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    setrandomImage(imageArray[randomIndex]);
    console.log(randomImage);
  };
  // 방생성 핸들러
  const addbuttonHandler = async () => {
    const unarrayselectedCategories = selectedCategories.join(',');
    if (roomName !== '' && roomContent !== '') {
      const content = {
        roomName,
        roomContent,
        roomPassword,
        secret: lock,
        category: unarrayselectedCategories,
        expirationDate: selectDate,
      };
      // FormData에 데이터 추가
      const formData = new FormData();
      console.log(formData);
      const contentrString = JSON.stringify(content);
      await formData.append(
        'content',
        new Blob([contentrString], { type: 'application/json' })
      );
      // 이미지 추가
      if (uploadedImage) {
        formData.append('image', uploadedImage);
      }
      if (randomImage) {
        formData.append('image', randomImage);
      } else {
        formData.append('image', '');
      }
      try {
        mutation.mutate(formData);
        onClose(false);
      } catch (error) {
        console.error('추가 실패:', error);
      }
    } else {
      if (roomName === '') {
        alert('제목을 입력해 주세요');
      } else if (roomContent === '') {
        alert('내용을 입력해 주세요');
      }
    }
  };
  // 비번방 버튼
  const lockbuttonHandler = () => {
    setAnimate(true);
    setLock(!lock);
  };

  const handleDateChange = (date) => {
    setSelectDate(date);
  };
  // 카테고리 버튼 배열
  const buttonInfo = [
    {
      name: '어학',
      customName: 'language',
      clickImage: languageClick,
      unclickImage: languageunClick,
    },
    {
      name: '취업',
      customName: 'job',
      clickImage: jobClick,
      unclickImage: jobunClick,
    },
    {
      name: '자격증',
      customName: 'certificate',
      clickImage: certificateClick,
      unclickImage: certificateunClick,
    },
    {
      name: '취미',
      customName: 'hobby',
      clickImage: hobbyClick,
      unclickImage: hobbyunClick,
    },
    {
      name: '독서',
      customName: 'book',
      clickImage: bookClick,
      unclickImage: bookunClick,
    },
    {
      name: '공무원',
      customName: 'official',
      clickImage: officialClick,
      unclickImage: officialunClick,
    },
    {
      name: '임용',
      customName: 'teacher',
      clickImage: teacherClick,
      unclickImage: teacherunClick,
    },
    {
      name: '기타',
      customName: 'etc',
      clickImage: etcClick,
      unclickImage: etcunClick,
    },
  ];

  const categoryButtonHandler = (category) => {
    const categoryName = category.name;
    const customCategoryName = category.customName;
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryName)
      );
      setSelectedCategoriesB(
        selectedCategories.filter((category) => category !== customCategoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
      setSelectedCategoriesB([...selectedCategoriesB, customCategoryName]);
    }
  };
  if (!onClose) return null;

  return (
    <Stcontainer
      ref={outside}
      onClick={(event) => {
        if (event.target === outside.current) onClose(false);
      }}
    >
      <Stmodalbox>
        <Sttitle>스터디 만들기</Sttitle>
        <StmadalLayout>
          <StmodalLeft>
            <Stroomnamebox>
              <Stfont>방 이름</Stfont>
              <StinputA
                placeholder="방 이름"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
            </Stroomnamebox>
            <Stcontentbox>
              <Stfont>설명</Stfont>
              <StinputB
                placeholder="방을 설명할 수 있는 문장을 써주세요."
                value={roomContent}
                onChange={(e) => {
                  setRoomContent(e.target.value);
                }}
              />
            </Stcontentbox>
            <Stcatebox>
              <Stfont>카테고리</Stfont>

              <Stcategory>
                {buttonInfo.map((button, index) => (
                  <StCircle
                    key={index}
                    isSelected={selectedCategories.includes(button.name)}
                    onClick={() => categoryButtonHandler(button)}
                  >
                    {selectedCategories.includes(button.name) ? (
                      <img src={button.clickImage} alt={button.name} />
                    ) : (
                      <img src={button.unclickImage} alt={button.name} />
                    )}
                    <div>{button.name}</div>
                  </StCircle>
                ))}
              </Stcategory>
            </Stcatebox>
          </StmodalLeft>
          <Stline />
          <StmodalRight>
            <Stlayoutbox>
              <button onClick={onClose}>
                <img src={cancel} alt="" />
              </button>
            </Stlayoutbox>
            <div>
              <Stdatepickerbox>
                <Stfont>만료일</Stfont>
                <BasicDatePicker
                  selectedDate={selectDate}
                  onDateChange={handleDateChange}
                  inputFormat={'yyyy-MM-dd'}
                />
              </Stdatepickerbox>
              <Stthumnailarea>
                <Stfont>대표이미지</Stfont>
                <Stthumnailbox>
                  <Stthumbnail>
                    {readerImage ? (
                      <img src={readerImage} alt="" width={136} height={100} />
                    ) : randomImage ? (
                      <img src={randomImage} alt="" width={136} height={100} />
                    ) : null}
                  </Stthumbnail>
                  <div>
                    {/* <StthumbnailbuttonA onClick={randomImageHandler}>
                      랜덤이미지
                    </StthumbnailbuttonA> */}
                    <StthumbnailbuttonB for="inputImage">
                      PC에서 업로드
                    </StthumbnailbuttonB>
                    <input
                      type="file"
                      id="inputImage"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </Stthumnailbox>
              </Stthumnailarea>
              <Stlockbox>
                <Stfont>비밀방 설정</Stfont>
                <Stlockboxinner>
                  <Stlockbutton onClick={lockbuttonHandler}>
                    <StlockbuttonBall animate={animate} lock={lock} />
                    <Stlockbuttonbg lock={lock} />
                  </Stlockbutton>
                  {lock ? (
                    <>
                      <Stfontcolor>
                        비밀번호를 아는 사람만 입장할 수 있습니다.
                      </Stfontcolor>
                      <div>
                        <img src={lockimg} alt="" width={10} height={14} />
                        <StpasswordInput
                          type="text"
                          placeholder="1234"
                          maxLength="5"
                          value={roomPassword}
                          onChange={(e) => {
                            setRoomPassword(e.target.value);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </Stlockboxinner>
              </Stlockbox>
            </div>
            <Stlayoutbox>
              <Stcreatebutton
                onClick={() => {
                  addbuttonHandler();
                }}
              >
                만들기
              </Stcreatebutton>
            </Stlayoutbox>
          </StmodalRight>
        </StmadalLayout>
      </Stmodalbox>
    </Stcontainer>
  );
};

export default Modal;

const Stcontainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Stmodalbox = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 987px;
  height: 503px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  padding: 36px, 56px, 60px;
  gap: 10px;
`;

const StmadalLayout = styled.div`
  width: 875px;
  height: 332px;
  display: flex;
  justify-content: space-between;
`;

const StmodalLeft = styled.div`
  width: 417.19px;
  height: 316px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StmodalRight = styled.div`
  width: 417.19px;
  height: 316px;
`;

const Stline = styled.div`
  height: 316px;
  border-left: 1.5px solid #bfbfbf;
`;

const StCircle = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  background-color: ${(props) => (props.isSelected ? '#00573f' : '#e8e8e8')};
  gap: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
`;

const Stcategory = styled.div`
  width: 316px;
  height: 152px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 12px 12px;
`;

const StinputA = styled.input`
  background-color: #e8e8e8;
  width: 184px;
  height: 32px;
  border-radius: 12px;
  padding-left: 14px;
  font-size: 15px;
`;

const StinputB = styled.input`
  background-color: #e8e8e8;
  width: 261px;
  height: 57px;
  border-radius: 12px;
  padding-left: 13.81px;
  padding-bottom: 24px;
  font-size: 15px;
`;

const Stroomnamebox = styled.div`
  height: 63px;
  display: flex;
  align-items: center;
  gap: 32px;
`;

const Stcontentbox = styled.div`
  height: 71px;
  display: flex;
  gap: 53px;
`;

const Stcatebox = styled.div`
  height: 166px;
  display: flex;
  gap: 20.19px;
`;

const Stfont = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Sttitle = styled.div`
  width: 875px;
  font-size: 20px;
  font-weight: 700;
`;

const Stthumbnail = styled.div`
  width: 136px;
  height: 100px;
  background-color: #e8e8e8;
  border-radius: 12px;
`;

const StthumbnailbuttonA = styled.button`
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 4px;
  &:hover {
    background-color: #e8e8e8;
  }
`;
const StthumbnailbuttonB = styled.label`
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 4px;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const StpasswordInput = styled.input`
  width: 68px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 7px;
  padding-left: 14px;
  border: 1px solid #9d9d9d;
  margin-left: 14px;
`;

const Stcreatebutton = styled.button`
  /* position: absolute; */
  transform: translateY(-50px);
  width: 90px;
  height: 44px;
  border: 1px solid #bfbfbf;
  border-radius: 30px;
  color: #9d9d9d;
  font-size: 15px;
  font-weight: 700;
  &:hover {
    background-color: #00573f;
    color: #ffffff;
  }
`;

const Stlockbutton = styled.button`
  display: flex;
  align-items: center;
  width: 36px;
`;

const Stlockbuttonbg = styled.div`
  position: relative;
  width: 36px;
  height: 18px;
  background-color: ${(props) => (props.lock ? '#00573f' : '#bfbfbf')};
  border-radius: 30px;
`;

const moveForward = keyframes`
  0% {
    transform: translateX(1.53px);
  }
  100% {
    transform: translateX(19.15px);
  }
`;

const moveBackward = keyframes`
  0% {
    transform: translateX(19.15px);
  }
  100% {
    transform: translateX(1.53px);
  }
`;

const StlockbuttonBall = styled.div`
  position: absolute;
  width: 14.5px;
  height: 14.5px;
  border-radius: 30px;
  background-color: #ffffff;
  z-index: 1;
  transform: ${(props) => (props.lock ? 'translateX(19.15px)' : 'translateX(1.53px)')};
  ${(props) =>
    props.animate &&
    css`
      animation: ${props.lock ? moveForward : moveBackward} 0.2s linear;
    `}
`;
const Stdatepickerbox = styled.div`
  display: flex;
  align-items: center;
  gap: 53.19px;
  margin-bottom: 31px;
`;
const Stthumnailarea = styled.div`
  height: 100px;
  display: flex;
  gap: 20.19px;
`;
const Stthumnailbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  height: 140px;
`;
const Stlockbox = styled.div`
  height: 166px;
  display: flex;
  gap: 20.19px;
  padding-top: 38px;
  margin-top: 11px;
`;

const Stlockboxinner = styled.div`
  gap: 7px;
  display: flex;
  flex-direction: column;
`;

const Stlayoutbox = styled.div`
  display: flex;
  justify-content: end;
`;

const Stfontcolor = styled.div`
  color: #9d9d9d;
`;
