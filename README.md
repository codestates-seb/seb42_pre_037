# seb42_pre_037
<br/>

## 주요 참고 문서
* [사용자 요구사항 명세서](https://docs.google.com/spreadsheets/d/1W6gs6SVlXXQ3jqEcAF2doiMAQQFcrZjtNNPBmP6bwHQ/edit#gid=0)
* [API 명세서](https://documenter.getpostman.com/view/24686427/2s93CGSbPy)
* [S3 정적 호스팅 링크](http://37-stack-over-fe.s3-website.ap-northeast-2.amazonaws.com)


<br/>
<br/>

## 프로젝트 기간
***23.2.15 ~ 23.3.2***


* 회원 가입
* 


<br/>
<br/>
<br/>


## 프리 바이오 팀스
<br/>

### BE

|                            박다솜                            |                            윤성현                            |                            최유진                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.pinimg.com/originals/b2/1a/9f/b21a9ff51a2b511b3680603887147f01.jpg" alt="img" width="200px" /> | <img src="https://mblogthumb-phinf.pstatic.net/20150622_12/haedameunah_1434947240506gnSIt_JPEG/vbbb.JPG?type=w800" alt="img" width = "200px"/> | <img src="https://suddenlycat.com/wp-content/uploads/2020/09/e69a4729748ea16a8ea50c7fa930d213.jpg" alt="img" width = "200px"/> |
|                     - Answer 엔드 포인트 구현                   |                     - Member 패키지 구현                     |                    - Question 패키지 구현                    |



### FE

|                            이서연                            |                            이치윤                            |                            김나영                            |                            이채욱                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.ibb.co/hd73F6f/2023-02-27-2-22-35.png" alt="2023-02-27-2-22-35" width = "200px"/> | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYe-zIT7cyG-M6Vlla38oVJ6twus0auSO7tQ&usqp=CAU" alt="img" width = "200px" /> | <img src="https://t1.daumcdn.net/cfile/tistory/99FDB24D5C73932B01" alt="img" width = "200px" /> | <img src="https://i0.wp.com/dailypetcare.net/wp-content/uploads/2021/09/image-1.jpeg?resize=453%2C605&ssl=1" alt="img" width="200px" /> |
|                     - Answer 페이지 구현                     |                    - login, sign-up 구현                     |                        - layout 구현                         |                    - Question 페이지 구현<br/>- 공통 UI 컴포넌트                    |



<br/>
<br/>

---

<br/>



## 사용 기술 스택

### 💄 Front-end
| React | React Router | React Icons | Styled-<br>Components | Zustand | Tailwind CSS |
| :---: | :---: | :---: | :---: | :---: | :---: |
|  <img height="65" width="65" src="https://cdn.simpleicons.org/react/#61DAFB" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/reactrouter" /> |  <img height="65" width="65" src="https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667" />  |  <img height="65" width="65" src="https://cdn.simpleicons.org/styledComponents" /> | <img height="65" width="65" src="https://cdn.discordapp.com/attachments/1074553703329173596/1079638795395268689/bear.png" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/tailwindcss" /> |

### 🧰 Back-end
| Spring Boot | Spring Security | Gradle | mySQL |
| :---: | :---: | :---: | :---: |
|  <img height="65" width="65" src="https://cdn.simpleicons.org/springboot/#6DB33F" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/springsecurity" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/gradle" />  |  <img height="65" width="65" src="https://cdn.simpleicons.org/mysql" /> |

### 🔧 Deploy
| GitPage | AWS EC2 | AWS S3 | AWS RDS |
| :---: | :---: | :---: | :---: |
|  <img height="65" width="65" src="https://cdn.simpleicons.org/github" /> |  <img height="65" width="65" src="https://cdn.simpleicons.org/amazonec2" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/amazons3" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/amazonrds" />



### 🚀 Tools & Dev Enviroment
| VSCode | Git | ESLint | Prettier | Discord | Notion | IntelliJ IDEA |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| <img height="65" width="65" src="https://cdn.simpleicons.org/visualstudiocode" />|  <img height="65" width="65" src="https://cdn.simpleicons.org/git" /> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /></div> | <img height="65" width="65" src="https://cdn.simpleicons.org/discord" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/notion" /> | <img height="65" width="65" src="https://cdn.simpleicons.org/intelliJidea" /> |






---

## Commit 컨벤션
| Tag Name | Description |
| --- | --- |
| feat | 새로운 기능을 추가 |
| fix | 버그 수정 |
| design | CSS 등 사용자 UI 디자인 변경 |
| !BREAKING CHANGE | 커다란 API 변경의 경우 |
| !HOTFIX | 급하게 치명적인 버그를 고쳐야하는 경우 |
| style | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| refactor | 프로덕션 코드 리팩토링 |
| comment | 필요한 주석 추가 및 변경 |
| docs | 문서 수정 |
| test | 테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음 |
| chore | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
| rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 |
| remove | 파일을 삭제하는 작업만 수행한 경우 |
