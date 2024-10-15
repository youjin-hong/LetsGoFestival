import { useInfiniteQuery } from "@tanstack/react-query";
import { getFestivalCards } from "../network/FestivalApi";

const fetchFestivals = async ({ pageParam = 1, queryKey }) => {
  const [_, areaCode] = queryKey;
  const response = await getFestivalCards(areaCode, pageParam);
  return response;
};

const useFestivalInfiniteCards = (selectedRegion) => {
  return useInfiniteQuery(
    ["festivals", selectedRegion], // Query Key (selectedRegion을 사용해 데이터 구분)
    fetchFestivals, // fetch 함수
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1; // 다음 페이지 번호 계산
        return lastPage && lastPage.length > 0 ? nextPage : undefined;
      },
    }
  );
};

export default useFestivalInfiniteCards;
