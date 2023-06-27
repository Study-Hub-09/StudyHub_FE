# 🌳 항해99 14기 9조 실전프로젝트 : STUDY HUB 🌳
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
  화면 차단 


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

### BACK-END

| 사용 기술 | 기술 설명 |
| --- | --- |
| **CI/CD - EC2 + Github Action & Nginx** | 프론트 팀이 원활하게 작업하기 위해서는 최대한 빨리 서버가 띄워져야 한다고 생각했으며,<br> dev branch에 코드가 merge 될 때마다 배포를 위해 반복적인 작업 최소화하고 서버 개발에만 집중할 수 있도록 CI/CD 환경을 구축하기로 결정하였습니다.<br> Jenkins와 github action + EC2 두 가지 선택지 중 GitHub Action이 GitHub 와의 연동이 편하고 빠른 시간 내에 배포할 수 있는 장점이 있으며,<br> GitHub에서 발생하는 이벤트를 처리할 수 있다는 점을 통해 해당 선택지를 도입하게 되었습니다.<br> 또한 배포할 때마다 서버가 잠시 중단되는 상황에 의해 유저들이 서비스를 이용 중에 중단되는 불편함이 있어 무중단 배포인 Nginx를 도입하게 되었습니다. |
| **OpenVidu** | N대N 화상 채팅을 구현하기 위해서 시그널링 서버를 통해서 P2P로 연결하는 방식과 미디어 서버를 두는 방식이 존재하는데 P2P로 구현하기에는 클라이언트에 부담이 너무 크며, OpenVidu 플랫폼을 이용하여 미디어 서버를 둠과 동시에 시그널링 처리도 맡길 수 있기 때문에 결정하게 되었습니다. |
| **Stomp** | Stomp 프로토콜은 메시지 전송을 위한 프로토콜로써 pub/sub 기반으로 동작하며 메시지 헤더를 가지고 있기 때문에 메시지의 송신, 수신에 대한 처리를 명확하게 정의 할 수 있는 장점이 있습니다.<br> 추가적인 작업 없이 메시지 발행 시 엔드포인트만 조정하여 쉬운 전송/수신 또한 가능하여 도입하게 되었습니다. |
| **Oauth2** | 소셜 로그인을 도입하게 된 가장 큰 이유는 사용자의 편의성 증대를 위해서 입니다.<br> 클릭 몇 번 만으로 로그인을 할 수 있는 편리성을 통해 사용자들이 이 웹을 더 찾을 수 있는 이유를 제공하기 위해서 입니다. |
| **Sentry** | Sentry는 실시간 오류 모니터링 및 로깅 플랫폼으로, 애플리케이션에서 발생하는 예외, 오류, 경고 등을 실시간으로 수집하고 중앙화된 대시보드에서 확인할 수 있도록 지원합니다.<br> 이러한 이유로 Sentry를 도입하여 애플리케이션의 로깅과 예외 처리를 효과적으로 관리할 수 있게 되었습니다. |
| **Redis** | Redis는 오픈 소스 인 메모리 키 값 데이터 구조 스토어로서 빠르게 접근할 필요가 있는 데이터를 저장하는데 유용합니다. 클라이언트가 자주 접근하는 토큰 정보나 데이터 캐싱에 사용하기 위해서 도입하였습니다. |
| **Spring Batch** | Spring Batch는 대용량 일괄처리 편의를 위한 다양한 기능을 제공합니다.<br> 특정한 시점에 스케줄러를 통해 자동화된 작업과 트랜잭션 관리와 함께 통계 처리를 맡기기 위해 도입하였습니다. |
| **JUnit5 + Mockito** | 테스트 코드를 사용하면 개발 과정 중에 발생할 수 있는 예상치 못한 문제를 컴파일 시점에서 찾을 수 있습니다.<br> 이는 런타임 오류를 방지하고, 버그를 사전에 발견하여 디버깅 시간을 절약할 수 있습니다.<br> 또한 작성한 코드가 의도한 대로 동작하는지 확인할 수 있습니다.<br> 테스트 코드는 예상되는 입력과 출력을 정의하고, 코드 실행 결과를 확인하여 코드의 정확성을 검증하는 역할을 합니다.<br> 이를 통해 코드 변경이나 리팩토링 후에도 기능의 동작이 올바른지 확인할 수 있기 때문에 도입하게 되었습니다. |
<br>

## 👨‍👩‍👧‍👦 스터브 팀
- Front: 강한빛([Github](https://github.com/hanbitk)), 김시옥([Github](https://github.com/gigupc11)), 신민철([Github](https://github.com/MinCheolS))
- Back: 김근보([Github](https://github.com/CaptainGombo)), 박성우([Github](https://github.com/seongwop)), 한승희([Github](https://github.com/seunghee58)))

|             [강한빛](https://github.com/hanbitk)             |              [김시옥](https://github.com/gigupc11)              |             [🚩신민철](https://github.com/MinCheolS)             |              [🚩김근보](https://github.com/CaptainGombo)              |               [박성우](https://github.com/seongwop)               |             [한승희](https://github.com/seunghee58)             |
|:-------------------------------------------------------------:|:-------------------------------------------------------------:|:-------------------------------------------------------------:|:------------------------------------------------------------:|:-------------------------------------------------------------:|:-------------------------------------------------------------:|
|![image (7)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/f7977f3d-6ac2-4bf8-baff-2cc30cfbb472)|![image (3)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/09563e9c-eaf0-46da-9990-2bda6bf28585)|![image (2)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/92355f44-899c-4946-b5b0-d1a72b61d30d)|![image (6)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/63db2705-9c30-448e-8ce1-130b52d6816f)|![image (5)](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/c0d17c6c-b7b8-4d70-938d-0b69902411ba)|![image](https://github.com/Study-Hub-09/StudyHub_FE/assets/129656095/426406ea-e059-40b3-af8e-c698c8099851)|
|                           FRONT-END                           |                           FRONT-END                           |                           FRONT-END                            |                           BACK-END                           |                           BACK-END                            |                           BACK-END                            |
<br>
