import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addRoom } from '../core/api/crud/api';
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
import { useNavigate } from 'react-router-dom';
import {
  StCircle,
  Stcontainer,
  Stmodalbox,
  StmadalLayout,
  StmodalLeft,
  StmodalRight,
  Stline,
  Stcategory,
  StinputA,
  StinputB,
  Stroomnamebox,
  Stcontentbox,
  Stcatebox,
  Stfont,
  Sttitle,
  Stthumbnail,
  StthumbnailbuttonB,
  StpasswordInput,
  Stcreatebutton,
  Stlockbutton,
  Stlockbuttonbg,
  StlockbuttonBall,
  Stdatepickerbox,
  Stthumnailarea,
  Stthumnailbox,
  Stlockbox,
  Stlockboxinner,
  Stlayoutbox,
  Stfontcolor,
  StreaderImagebox,
} from '../styles/mainpage/Modal.styles';
import { Alert } from '../CustomAlert/Alert';

const Modal = ({ onClose }) => {
  const [roomName, setRoomName] = useState('');
  const [roomContent, setRoomContent] = useState('');
  const [lock, setLock] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesB, setSelectedCategoriesB] = useState([]);
  const today = dayjs().format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState(today);
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

      navigate(`/rooms/${data.data.sessionId}`, {
        state: { roomData: data.data },
      });
    },
  });
  // 이미지업로드
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedImage(file);
    if (!file.type.startsWith('image/')) {
      Alert('error', '이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 이미지 미리보기 설정
    const reader = new FileReader();
    reader.onload = (event) => {
      setReaderImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // 방생성 핸들러
  const addbuttonHandler = async () => {
    const unarrayselectedCategories = selectedCategories.join(',');
    if (roomName !== '' && roomContent !== '' && selectDate !== '') {
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
        Alert('error', '제목을 입력해주세요.');
      } else if (roomContent === '') {
        Alert('error', '내용을 입력해주세요.');
      }
      if (selectDate === '') {
        Alert('error', '만료일을 입력해주세요.');
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
      if (selectedCategories.length < 4) {
        setSelectedCategories([...selectedCategories, categoryName]);
        setSelectedCategoriesB([...selectedCategoriesB, customCategoryName]);
      } else {
        Alert('error', '최대 4개의 카테고리만 선택할 수 있습니다.');
      }
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
                placeholder="방 이름을 입력 해주세요"
                value={roomName}
                maxLength={20}
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
                maxLength={35}
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
                <img src={cancel} alt="cancelImage unable" />
              </button>
            </Stlayoutbox>
            <div>
              <Stdatepickerbox>
                <Stfont>만료일</Stfont>
                <BasicDatePicker
                  selectedDate={selectDate}
                  onDateChange={handleDateChange}
                  inputFormat={'YYYY-MM-dd'}
                />
              </Stdatepickerbox>
              <Stthumnailarea>
                <Stfont>대표이미지</Stfont>
                <Stthumnailbox>
                  {readerImage ? (
                    <StreaderImagebox src={readerImage} alt="readerImage unable" />
                  ) : (
                    <Stthumbnail>'이미지를 등록해 주세요'</Stthumbnail>
                  )}
                  <div>
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
                        <img
                          src={lockimg}
                          alt="lockImage unable"
                          width={10}
                          height={14}
                        />
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
