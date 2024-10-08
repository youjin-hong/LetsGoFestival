import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useFestivalSearchStore from "../../../store/festivalSearchStore";
import { useEffect } from "react";

export default function CalendarSearch({ onSelect }) {
  const today = new Date();
  const { dateRange, setDateRange } = useFestivalSearchStore();

  useEffect(() => {
    setDateRange(dateRange);
  }, [setDateRange, dateRange]);

  const handleDateChange = (date) => {
    if (date.length === 0) {
      setDateRange([today, today]); // 초기화
    } else if (date.length === 1) {
      setDateRange([date[0], date[0]]); // 시작일 선택
    } else {
      setDateRange([date[0], date[1]]); // 종료일 선택
      onSelect && onSelect([date[0], date[1]]); // 종료일까지 선택되었을 때 onSelect 호출 & 저장
    }
  };
  const handleTodayBtn = () => {
    setDateRange([today, today]);
  };
  return (
    <div className="w-[350px] flex justify-center items-center left-[50%] -translate-x-2/4 relative rounded-bottomShadow">
      <Calendar
        selectRange={true} // 기간 선택 모드 활성화
        value={dateRange}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")} // 일 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 년도 숫자만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. M")} // '2024. 9' 형식으로
        calendarType="gregory" // 일요일부터 시작
        nextLabel=">"
        prevLabel="<"
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년 단위 보기 숨기기
        locale="ko-KR"
        className="w-full bg-white rounded-lg shadow-lg py-5 flex flex-col items-center gap-7 text-sm border-none dark:bg-bgDark"
      />
      <button
        onClick={handleTodayBtn}
        className="absolute right-4 top-16 cursor-pointer bg-iconActive text-white text-[12px] py-1 px-3 rounded-lg shadow-md hover:bg-orange-700 transition-colors"
      >
        오늘
      </button>
    </div>
  );
}
