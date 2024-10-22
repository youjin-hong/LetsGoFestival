import axios from "axios";

const festivalAxiosInstance = axios.create({
  baseURL: `https://apis.data.go.kr/B551011/KorService1/`,
});

// 요청 인터셉터
festivalAxiosInstance.interceptors.request.use(
  (config) => {
    // 요청 보내기 전에 수행 로직
    return config;
  },
  (err) => {
    // 요청 에러 시 수행 로직
    return Promise.reject(err);
  }
);

// 응답 인터셉터
festivalAxiosInstance.interceptors.response.use(
  (response) => {
    // 응답이 제대로 왔는지 확인
    if (response && response.data) {
      return response.data;
    } else {
      return Promise.reject(new Error("No response data found"));
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default festivalAxiosInstance;

// 헤더 지역명 불러오기
export const getRegion = async () => {
  const response = await festivalAxiosInstance.get(
    `areaCode1?serviceKey=${
      import.meta.env.VITE_APP_FESTIVAL_API_KEY
    }&numOfRows=17&MobileOS=ETC&MobileApp=AppTest&_type=json`
  );
  return response.response.body.items.item;
};

// 홈페이지 축제 카드리스트 불러오기
export const getFestivalCards = async (areaCode, pageNo) => {
  const response = await festivalAxiosInstance.get(
    `searchFestival1?serviceKey=${
      import.meta.env.VITE_APP_FESTIVAL_API_KEY
    }&numOfRows=10&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&eventStartDate=20240101&areaCode=${areaCode}`
  );

  return response.response.body;
};

// 디테일페이지 상세설명 정보 불러오기
export const getFestivalOverView = async (contentId) => {
  const response = await festivalAxiosInstance.get(
    `detailCommon1?serviceKey=${
      import.meta.env.VITE_APP_FESTIVAL_API_KEY
    }&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=15&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`
  );
  return response.response.body.items.item;
};

// 검색 페이지 키워드 검색 결과 정보 불러오기
export const getKeywordSearchResults = async (keyword) => {
  const response = await festivalAxiosInstance.get(
    `searchKeyword1?serviceKey=${
      import.meta.env.VITE_APP_FESTIVAL_API_KEY
    }&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${encodeURIComponent(
      keyword
    )}&contentTypeId=15`
  );
  return response.response.body.items.item;
};
