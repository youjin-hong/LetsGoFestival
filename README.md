### 진행 단계

홈페이지, 상세 페이지, 아이콘, 축제 카드 컴포넌트 퍼블리싱 완료했습니다.
이번주 토요일까지 모든 페이지 퍼블리싱 후에 zustand 공부 & 설치한 뒤에 개발 시작할 예정입니다.

<br />

# 전국의 축제들을 모아놓은 모바일 중심 웹사이트 축제7ㅏ자

<br />

## 🎇 프로젝트 소개

축제7ㅏ자는 전국의 다양한 축제를 한곳에 모아놓은 모바일 중심의 웹사이트입니다.
사용자들은 이 웹사이트를 통해 다양한 축제 정보를 쉽게 조회하고, 자신의 관심사에 맞는 축제 정보들을 관리할 수 있습니다.

<br />

## 💡 페이지별 기능 (주요 기능)

- **홈페이지**: 지역 카테고리 메뉴를 이용해 지역별로 개최되는 축제를 찾아볼 수 있습니다.
- **축제 검색**: 지역, 날짜, 키워드 검색을 통해 원하는 축제를 쉽게 검색할 수 있습니다.
- **위시리스트**: 관심 있는 축제를 "찜하기" 버튼을 통해 나만의 위시리스트에 저장해두고, 언제든지 쉽게 찾아볼 수 있습니다.
- **축제 상세 정보**: 축제 카드를 클릭하면 축제의 상세 정보(주소, 설명, 전화번호 등)와 해당 축제 근처에 있는 맛집, 카페 정보도 함께 제공받을 수 있습니다.

<br />

🏠 홈페이지 <br />
![alt text](홈.png)

🔍 검색 페이지 <br />
![alt text](<Group 722.png>)

📄 상세 페이지 <br />
![alt text](상세.png)

❤️ 찜목록 페이지 <br />
![alt text](<찜 목록.png>)

<br />

## 👷 개발환경

- front: React, tailwind-css, Zustand
- 버전 및 이슈관리: Github, Github Issues
- 디자인: Figma / 기획: Notion

<br />

## 📁 프로젝트 구조

```bash
src
├── assets
│   └── logo.svg
├── store
│   └── 찜목록하트상태관리.js
├── constants
│   └── regionList.js
├── network
│   ├── 공공데이터.js
│   └── 카카오맵.js
├── features
│   ├── HomePage
│   │   ├── components
│   │   │   └── TodayList.jsx
│   │   └── HomePage.jsx
│   ├── SearchPage
│   │   └── SearchPage.jsx
│   ├── CalendarPage
│   │   ├── components
│   │   │   ├── Calendar.jsx
│   │   └── CalendarPage.jsx
│   ├── DetailPage
│   │   ├── components
│   │   │   ├── DetailCard.jsx
│   │   │   ├── MapArea.jsx
│   │   │   ├── Map.jsx
│   │   │   ├── AroundCardList.jsx
│   │   │   └── AroundCard.jsx
│   │   └── DetailPage.jsx
│   └── WishListPage
│       └── WishListPage.jsx
├── components
│   ├── ui
│   │   ├── Button.jsx
│   │   ├── FestivalState.jsx
│   │   └── icon
│   │       ├── index.js
│   │       ├── CallIcon.jsx
│   │       ├── SearchIcon.jsx
│   │       ├── WishIcon.jsx
│   │       ├── CalendarIcon.jsx
│   │       ├── LocationIcon.jsx
│   │       ├── CloseIcon.jsx
│   │       ├── RefreshIcon.jsx
│   │       ├── ExpendIcon.jsx
│   │       ├── HamburgerBarIcon.jsx
│   │       ├── DarkModeIcon.jsx
│   │       ├── TopButtonIcon.jsx
│   │       ├── CafeIcon.jsx
│   │       ├── RestaurantIcon.jsx
│   │       └── DescriptionIcon.jsx
│   ├── Card.jsx
│   ├── CardList.jsx
│   ├── WishListPreview.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── SearchBar.jsx
│   └── MoveTop.jsx
```

<br />

## 📆 개발 기간

- 기획: 2024.9,10 ~ 2024.9.25
- 개발: 2024.9.27 ~ ing

<br />

## 🔧 개선 목표

<br />

## 프로젝트 후기

### 프로젝트 중 어려웠던 점과 해결 방법

<details>
  <summary>tailwind-css 설치</summary>
    <div markdown="1">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
<details>
  <summary>vite + react에서 환경변수 사용</summary>
    <div markdown="2">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
<details>
  <summary>swiper 라이브러리 대신에 useRef로 슬라이드 구현</summary>
    <div markdown="3">
    <ul>
      <li>작성 예정</li>
      <li></li>
    </ul>
  </div>
</details>
