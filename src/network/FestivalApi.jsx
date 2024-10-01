import axios from "axios";

const festivalAxiosInstance = axios.create({
  baseURL: "http://apis.data.go.kr/B551011/KorService1/",
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
