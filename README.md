# 🌳 항해99 14기 9조 실전 프로젝트 : STUDY HUB 🌳
![1](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/995d1d64-5777-4434-b8e0-25d31e33fd64)


>🧑‍💻 개발 기간 : 2023.05.19 ~ 2023.06.30</p> 👉 서비스 URL : https://www.study-hub.shop </P>
<br>

## 🌱 서비스 소개 <br>

![2](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/3ad9985c-0c44-41b4-96c3-a79c43c0639c)
![3](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/eec6f7a3-68e5-4409-bd51-37d6149c1953)
![4](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/3fd0f811-1177-4726-b58d-4d0b327b6fc2)



<br>

## 🌿 핵심 기능 <br>
<details>
  <summary>🧑‍💻 화상 스터디</summary>
  <br>
    - 스터디룸에 접속한 유저는 webRTC를 활용하여 본인의 화면을 송출하는 동시에, 다른 유저의 공부하는 모습을 실시간으로 확인<br>
<br>
  
![1](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/f2c557a9-fbf3-4e4f-8e5a-16312200b0cd)
  화면 송출 시 

![2](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/cecd6959-d641-4365-81ac-91fdcf84a2b6)
  화면 차단 시


</details>
<details>
  <summary>⌨️ 그룹 채팅 </summary>
  <br>
    - 소켓 통신을 바탕으로 스터디 룸에서 채팅 기능 제공<br>
<br>
  
![3](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/421bebce-5523-4c28-9898-4698b8cd6710)


</details>
<details>
  <summary>🕑 타이머 기능 & 통계 </summary>
  <br>
    - 매일 자정을 기준으로 DB에 저장된 공부 시간을 참조하여, 일일 공부시간 및 누적 공부시간 확인<br>
<br>
<img width="640" alt="통계" src="https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/8e50b6e3-0e47-46d5-849d-7ea5e015b180">



</details>

<br>

## 🪴 Project Architecture <br>
![STUB architecture](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/7719562c-1e99-4148-ad3b-51056303d1ea)



<br>

## 🌲 기술적 의사 결정 <br>
### FRONT-END

| 사용 기술 | 기술 설명 |
| --- | --- |
| **Styled-Components** | 다른 CSS-in-JS 라이브러리와 비교해 논의 후 Styled-Components를 사용한 이유는 가독성과 유지 관리를 개선하며,<br> 고유한 클래스 이름을 생성해 충돌을 최소화할 수 있다는 장점이 있기 때문입니다.<br> 또한, Styled-Components를 통해 컴포넌트에 props를 전달할 수 있어 스타일 속성의 동적인 사용이 용이하며,<br> 이에 따라 개발의 유연성이 증가 하기에 사용하였습니다. |
| **React Query** | React Query는 웹 애플리케이션에 사용자 경험을 향상시키기 위해 도입된 기술입니다.<br> 쿼리 캐싱 처리를 통해 서버 부하를 최소화하고 이미 요청한 데이터를 빠르게 불러올 수 있습니다.<br> 사용자는 최신 데이터를 실시간으로 확인할 수 있으며 데이터 재로드할 필요가 없습니다.<br> 이러한 장점들과 함께 isLoading과 isError를 사용하여 에러 처리를 유연하게 할 수 있어,<br> 전반적인 데이터 처리를 최적화하여 사용자에게 더 나은 경험을 제공하기 위해 사용하였습니다. |
| **Vercel** | Vercel을 사용한 이유는 프로젝트를 더욱 원활하게 관리하고 배포를 최적화하기 위해서 입니다.<br> Vercel은 GitHub에 푸시(pushing)될 때마다 자동으로 배포하는 기능을 제공하며,<br> 이로 인해 개발 및 배포 프로세스가 매우 간단해지기에 사용하였습니다. |
| **Axios** | Axios를 사용한 이유는 Fetch와 비교하여 에러 객체를 통해 상세한 응답 정보를 제공할 수 있기 때문입니다.<br> 또한, API 요청 시 토큰의 존재여부에 따라 토큰의 재발급 및 재요청 작업을 효율적으로 수행할 수 있는 Axios interceptor 기능이 제공되어 API 통신을 보다 효과적으로 구현할 수 있기에 사용을 하였습니다. |

<br>

## 🧨 트러블 슈팅
### FRONT END
<details>
  <summary> 💥 스터디룸 입장 시 openVidu 세션 연결 이슈 </summary>
    <br>
  
  **`문제`**
    
  스터디룸 입장 후 바로 마이크나 카메라를 끄면 openvidu 세션 연결이  되지 않는 오류가 발생
     
    
  **`시도`**
    
  Redirect 페이지를 방 입장후 setTimeOut을 적용하여 3초가 지난 후 스터디룸 페이지가 보이게 하여 마이크나 카메라에 대한 조작을 할 수 없게 하려고 하였다.<br> 하지만 시간만 적용을 해주면 유저별 세션 연결 시간에 대한 편차가 있어서 redirect 페이지가 사라진 후에도 세션 연결이 안된 유저가 마이크나 카메라를 껐을 때 여전히 세션 연결이 되지않았다.
     
    
  **`해결`**
    
  스터디룸 입장 후 세션연결하는 코드안에 redirect 페이지를 넣어줘서 이전처럼 시간이 지난 후 스터디룸이 보이는 아니라 세션 연결이 완료 된 후 스터디룸 페이지가 보이도록 수정


</details>

<details>
  <summary> 💥 스터디룸에서 상대방의 카메라, 마이크 상태 확인 이슈 </summary>
    <br>
  
  **`문제`**
    
   OpenViduLogger(오픈비두 콘솔 메세지)는 상대방이 카메라나 마이크를 켜거나 끄는 작업(publish/unpublish)을 볼 수 없음.<br> 유저는 자신이 수행한 카메라/마이크 상태 변경만 확인할 수 있으며, 상대방의 카메라/마이크 유무를 확인하지 못 하는 문제 발생
     
    
  **`시도`**
    
  'streamPropertyChanged' 오픈비두 이벤트를 사용하여 stream을 변경할 때만 상태를 업데이트 시도.<br> 그러나 오픈비두는 내가 발행자이자 구독자이기 때문에 정확히 구분하는 방법이 어려워서 이 이벤트를 사용할 수 없
     
    
  **`해결`**
    
  'streamManager'를 사용하여 문제 해결, 'streamManager'를 통해 구독자와 발행자를 구분 가능.<br>'streamManager.stream.audioActive'와 'streamManager.stream.videoActive'를 사용하여 
나와 상대방의 오디오 및 비디오 상태를 확인하고, UI를 업데이트할 수 있었다.<br>이렇게 함으로써 상대방이 마이크나 카메라를 끄거나 켤 때 이를 시각적으로 알 수 있게 됨.

  **`해결 코드`**
  
  <img width="599" alt="스크린샷 2023-06-26 오후 11 40 12" src="https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/db39ba2e-f28a-4a39-8b06-ff8df529e8ab">



  

</details>
<br>

## 👨‍👩‍👧‍👦 스터브 팀
- Front: 강한빛([Github](https://github.com/hanbitk)), 김시옥([Github](https://github.com/gigupc11)), 신민철([Github](https://github.com/MinCheolS))
- Back: 김근보([Github](https://github.com/CaptainGombo)), 박성우([Github](https://github.com/seongwop)), 한승희([Github](https://github.com/seunghee58)))

|             [강한빛](https://github.com/hanbitk)             |              [김시옥](https://github.com/gigupc11)              |             [🚩신민철](https://github.com/MinCheolS)             |              [🚩김근보](https://github.com/CaptainGombo)              |               [박성우](https://github.com/seongwop)               |             [한승희](https://github.com/seunghee58)             |
|:-------------------------------------------------------------:|:-------------------------------------------------------------:|:-------------------------------------------------------------:|:------------------------------------------------------------:|:-------------------------------------------------------------:|:-------------------------------------------------------------:|
|![image (7)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/f7977f3d-6ac2-4bf8-baff-2cc30cfbb472)|![image (3)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/09563e9c-eaf0-46da-9990-2bda6bf28585)|![image (2)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/92355f44-899c-4946-b5b0-d1a72b61d30d)|![image (6)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/63db2705-9c30-448e-8ce1-130b52d6816f)|![image (5)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/c0d17c6c-b7b8-4d70-938d-0b69902411ba)|![image](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/426406ea-e059-40b3-af8e-c698c8099851)|
|                           FRONT-END                           |                           FRONT-END                           |                           FRONT-END                            |                           BACK-END                           |                           BACK-END                            |                           BACK-END                            |
<br>
