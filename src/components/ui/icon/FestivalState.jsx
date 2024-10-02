export default function FestivalState({ card }) {
  if (!card) {
    return null; // card가 없을 경우 아무것도 렌더링하지 않음
  }

  const getCurrentDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const todayString = getCurrentDateString();

  let eventStatus = "";

  if (card.eventstartdate <= todayString && todayString <= card.eventenddate) {
    eventStatus = "진행중";
  } else if (todayString < card.eventstartdate) {
    // D-일수 계산
    const startDate = card.eventstartdate;
    const differenceInDays = parseInt(startDate) - parseInt(todayString);
    eventStatus = `D-${differenceInDays}`;
  } else {
    eventStatus = "종료";
  }

  return (
    <div
      className={`w-16 h-6 ${
        eventStatus === "진행중"
          ? "bg-iconActive"
          : eventStatus === "종료"
          ? "bg-subText"
          : "bg-[#007BFF]"
      } rounded-lg flex justify-center items-center cursor-default p-2`}
    >
      <p className="text-white text-sm font-light">{eventStatus}</p>
    </div>
  );
}
