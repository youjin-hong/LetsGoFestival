import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getFestivalCards } from "../network/FestivalApi";
import useFestivalRegionStore from "../store/festivalRegionStore";
import Card from "./Card";
import { useFestivalWishStore } from "../store/festivalWishStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function CardList({
  clickWishIcon = false,
  dateRange,
  isSearchPage,
  keywordResult,
}) {
  const [selectFestivalStatus, setSelectFestivalStatus] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const { selectedRegion } = useFestivalRegionStore();
  const { wishList } = useFestivalWishStore();

  const fetchFestivalCards = async (areaCode, pageNo) => {
    try {
      const cards =
        areaCode === "all"
          ? await getFestivalCards("", pageNo)
          : await getFestivalCards(areaCode, pageNo);

      return cards;
    } catch (e) {
      console.error("축제정보 데이터 불러오기 실패", e);
    }
  };

  const useFestivalInfiniteCards = (selectedRegion) => {
    return useInfiniteQuery({
      queryKey: ["festivals", selectedRegion],
      queryFn: ({ pageParam }) => {
        return fetchFestivalCards(selectedRegion, pageParam);
      },
      getNextPageParam: (lastPage) => {
        const totalPages = Math.ceil(lastPage.totalCount / lastPage.numOfRows);
        if (selectedRegion && lastPage.pageNo < totalPages) {
          return lastPage.pageNo + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFestivalInfiniteCards(selectedRegion);

  // 무한스크롤 객체 생성
  const { ref, inView } = useInView();

  const filterCards = () => {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10).replace(/-/g, "");

    if (keywordResult && keywordResult.length > 0) {
      // keywordResult가 있을 경우 바로 렌더링
      setFilteredCards(keywordResult);
      return;
    }

    if (!data) {
      setFilteredCards([]);
      return;
    }

    let allCards = data.pages.flatMap((page) => page.items.item);

    let filtered = allCards.filter((card) => {
      const eventStartDate = card.eventstartdate;
      const eventEndDate = card.eventenddate;

      if (
        dateRange &&
        Array.isArray(dateRange) &&
        dateRange.length === 2 &&
        dateRange[0] instanceof Date &&
        dateRange[1] instanceof Date
      ) {
        const startDate = dateRange[0]
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");
        const endDate = dateRange[1]
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");

        return (
          (eventStartDate >= startDate && eventStartDate <= endDate) ||
          (eventEndDate >= startDate && eventEndDate <= endDate) ||
          (eventStartDate <= startDate && eventEndDate >= endDate)
        );
      }

      if (selectFestivalStatus === "진행중") {
        return eventStartDate <= todayString && todayString <= eventEndDate;
      }
      if (selectFestivalStatus === "예정") {
        return todayString < eventStartDate;
      }
      if (selectFestivalStatus === "종료") {
        return todayString > eventEndDate;
      }
      return true; // 기본적으로 모든 카드를 반환
    });

    if (clickWishIcon) {
      filtered = filtered.filter((card) => wishList[card.contentid]);
    }

    setFilteredCards(filtered);
  };

  useEffect(() => {
    // 카드 갯수가 10개 이하일 때는 무한 스크롤이 작동하지 않도록 함
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      filteredCards.length > 9
    ) {
      fetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    filteredCards.length,
  ]);

  useEffect(() => {
    filterCards();
  }, [data, selectFestivalStatus, wishList, dateRange, keywordResult]);

  const handleFestivalStatus = (status) => {
    if (selectFestivalStatus === status) {
      setSelectFestivalStatus("");
    } else {
      setSelectFestivalStatus(status);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      {!isSearchPage && (
        <ul className="flex justify-end gap-2 pt-36">
          <li
            onClick={() => handleFestivalStatus("진행중")}
            className={`cursor-pointer text-sm text-white rounded-md py-1 px-1.5 ${
              selectFestivalStatus === "진행중"
                ? "bg-iconActive"
                : "bg-[#fdaa7b] hover:bg-iconActive"
            } duration-200`}
          >
            진행중인 행사
          </li>
          <li
            onClick={() => handleFestivalStatus("예정")}
            className={`cursor-pointer text-sm text-white rounded-md py-1 px-1.5 ${
              selectFestivalStatus === "예정"
                ? "bg-[#007BFF]"
                : "bg-[#76b5f8] hover:bg-[#007BFF]"
            } duration-200`}
          >
            개최 예정인 행사
          </li>
          <li
            onClick={() => handleFestivalStatus("종료")}
            className={`cursor-pointer text-sm text-white rounded-md py-1 px-1.5 ${
              selectFestivalStatus === "종료"
                ? "bg-subText"
                : "bg-[#b6b6b6] hover:bg-subText"
            } duration-200`}
          >
            종료된 행사
          </li>
        </ul>
      )}
      <div className="flex flex-wrap justify-evenly pt-4 pb-4 w-full">
        {filteredCards.map((card, index) => (
          <Card key={`${card.contentid}-${index}`} card={card} />
        ))}
      </div>
      <div ref={ref} className="h-20 pb-24 text-center">
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage && filteredCards.length > 9
          ? "Load More"
          : ""}
      </div>
    </>
  );
}
