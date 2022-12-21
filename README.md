<div align=center>
	<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=Final%20MBTISOUR!&fontSize=90" />	
</div>

<div align=center>
	<h3>📚 Tech Stack 📚</h3>
	
</div>

<div align="center">
	<p>✨ Programming Languages ✨</p>
	<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=white" />
	<p>✨ Frontend Development ✨</p>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
	<img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white" />
	<br>
	<p>✨ Backend Development ✨</p>
	<img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white" />
	<img src="https://img.shields.io/badge/apachetomcat-F8DC75?style=flat&logo=apachetomcat&logoColor=white" />
  <img src="https://img.shields.io/badge/spring-6DB33F?style=flat&logo=spring&logoColor=white" />
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=flat&logo=springboot&logoColor=white" />
	<br>
	<p>✨ Database ✨</p>
  <img src="https://img.shields.io/badge/mysql-4479A1?style=flat&logo=mysql&logoColor=white" />
</div>
<div align=center>
	<p>🛠 Tools 🛠</p>
</div>
<div align=center>
  <img src="https://img.shields.io/badge/intellijidea-000000?style=flat&logo=intellijidea&logoColor=white" />
	<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" />
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=flat&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/firebase-FFCA28?style=flat&logo=firebase&logoColor=white" />
</div>

## React Libraries

```bash
yarn install
yarn add react-router-dom 
yarn add styled-components 
yarn add react-icons 
yarn add moment
yarn add axios
yarn add firebase

```
## Gradle Dependencies

```bash
//	QLRM을 사용하기 위해 Gradle 의존성 모듈
	implementation group: 'org.qlrm', name: 'qlrm', version: '3.0.4'
//	jackson-databind 라이브러리 추가
	implementation group: 'com.fasterxml.jackson.core', name: 'jackson-databind'
//	jackson 라이브러리 추가
	implementation group: 'org.codehaus.jackson', name: 'jackson-mapper-asl', version: '1.4.2'
	implementation group: 'com.googlecode.json-simple', name: 'json-simple', version: '1.1'
//	GSON 변환 추가
	implementation group: 'com.google.code.gson', name: 'gson', version: '2.9.0'
//	이메일 인증
	implementation 'org.springframework.boot:spring-boot-starter-mail'

```


### 빌드 하기
./gradlew build

### 실행 하기
java -jar build\libs\FINAL-0.0.1-SNAPSHOT.jar

java -jar FINAL-0.0.1-SNAPSHOT.jar

----------------------------------------------------------------------------
22.12.21(수)
♥ 조혜경
- (1차) 마이페이지, 비밀번호 변경 모달창에서 입력한 비밀번호 따라 마이페이지가 바뀌는 오류 수정
- (2차) 탈퇴하기 버튼 수정

22.12.20(화)
♥ 전규한

- 아이디 비번찾기 반응형 적용
- 아이디 비번찾기 대소문자 오류 


- 마이페이지


탈퇴하기 버튼 눈에 덜 띄게 만들기(완 아래로 50px 내림)


이메일 정규식 체크 안 되고, 무조건 저장됨 (정규식 / 중복확인 넣음)


- 회원가입

이메일 입력안해도 인증으로 넘어감(수정 완)

생년월일 개판이어도 넘어감 (수정 완 min="1900-01-01" max="2024-12-30" 지정)

안내문구 사라지게(생년월일/ 주소 입력시 안내문구 사라짐)

닉네임 중복확인 안되던거 수정


- 아이디/비번 찾기

대문자로 써지는거 (수정 완)

로그인 창으로 이동할수 있게 경로 설정(추가후 반응형 적용 완)


♥ 조혜경
- (1차) 네비바에 로그아웃 버튼 뜨는 거랑 사용자 메뉴 활성화 안 되는 거 수정
- (2차) 어바웃어스, 이메일모달, 회원가입, 마이페이지 모달 추가 및 수정
- (3차) 전체 선택시 모든 쪽지 삭제되는 오류 수정
- (4차) 네비바 배경색(네비바 컨테이너) 고정
- (5차) 쪽지함 반응형, 네비바 z-index 1000
- (6차) 쪽지 보내기 모달창(일단 매칭 화면에서만 수정)
- (7차) 쪽지 보내기 모달창(쪽지함에서 답장하기)
- (8차) 쪽지 보내기 모달창(어바웃어스에서 쪽지 보내기)
- (9차) 이름, 비밀번호 정규식 수정, 전체 적용

22.12.19(월)

우혜정
- 회원가입 반응형 CSS 완
- 매칭 좋아요 작업 완

♥ 조혜경
- 네비바 오류 수정
- (2차) 페이지네이션 숫자 1 안보이는 오류 수정, 첫 페이지는 0부터임!
- (3차) 어바웃어스에서 우리 멤버들에게 쪽지 보내기 기능 추가

22.12.18(일)

우혜정
- 매칭 반응형 CSS 완
- 채팅 반응형 CSS 하다가 민형 토스

♥ 조혜경
- 쪽지 없을 때 한 줄로만 쪽지가 없습니다 문구 보이게 수정

♥ 이민형
- 방명록css 반응형 추가

22.12.17(토) 

♥ 전규한

- mbti 페이지 스타일컴포넌트 -> css 분리
- mbti type 스타일컴포넌트 -> css 분리
- mbti , mbti type width 크기별 css 나눔 (핸드폰 기종병로 확인 완)

22.12.16(금) 

♥ 조혜경

- 네비바 반응형 일단 메뉴가 보이게끔만 수정

♥ 이민형

- 시퀀스 auto => identity로 수정
- start버튼 클릭시 login페이지 이동가능수정


22.12.15(목) 

♥ 이동균

- 마우스커서 추가(오늘 밤에 추가예정)
- Main 'start'버튼 수정 완료

우혜정 
- 약관 CSS 수정
- 회원가입 header, footer 영역 고정
- 로그인, 회원가입 페이지 로고 추가
- 회원가입 스크롤 디자인 변경

♥ 조혜경
- (1차) 쪽지함 모달 살짝 수정, 방명록 css 완성
- (2차)
- 페이지네이션 : 선택된 페이지 따로 표시
- 쪽지함 사이즈 조정, 쪽지 하나도 없을 때 체크되는 거 수정
- 커스텀 모달 폰트 수정
- 쪽지 모달 폰트 수정
- 네비바 폰트 수정, 로그아웃 커서 변경

♥ 전규한
- mypage , mbti , mbti type 

♥ 이민형
- mypage 닉네임, 프로필사진 수정시 바로 전 페이지 적용되도록 수정
- login css 간격, 글자크기, 위치 수정

22.12.14(수) 

우혜정
- 로그인 페이지 CSS 배치 및 크기 수정

♥ 전규한
- 마이페이지 css 변경
- 아이디 비밀번호 찾기 css 변경
- mbti 시작페이지 css 변경
- terms 약관 css 변경


♥ 조혜경
- (1차) AboutUs, Mypage, Postbox 마진탑 삭제
- (2차) 채팅 빈 값일 때 등록되지 않도록 수정
- (3차) 네비바 높이(70px) 지정, 쪽지함 모달 수정, success 모달 2초 후 자동 닫기

♥ 이민형
- 방명록 프로필사진 사이즈 수정
- 방명록 css 세부수정(위치, 크기, 내용)

22.12.13(화) 

우혜정 
- 채팅 CSS 입력창 하단 고정. 
- 스크롤바 스타일 변경.
- 채팅 말풍선 색상 변경 및 디자인 수정. 
- 시간 말풍선 밖으로 뺌.

♥ 조혜경
- (1차) alert 모달 만들고, 회원가입에 붙히기
- (2차) 채팅창에서 프사 불러오게 수정
- (3차) 로그인, 회원가입, 마이페이지, 쪽지함에 커스텀 모달 추가
