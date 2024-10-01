export default function RegionSearch() {
  return (
    <div className="w-full flex justify-center items-center relative rounded-lg p-4">
      <ul className="shadow-bottomShadow rounded-lg flex flex-col justify-center items-center gap-1 w-full bg-white dark:text-black">
        {/* TODO: API 받아와서 map 돌려서 지역 리스트 나타내기 */}
        {/* https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=STzybg2jYMNbL3WNU0kR0UPYx1mqVZfBTTEdxYEnbArtuIxcNwZolBhQfCrv3wlxQ0R8oj57TtNvTxUYGOBpMA%3D%3D&numOfRows=17&MobileOS=ETC&MobileApp=AppTest&_type=json */}
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          전체
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          서울
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          인천
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          대전
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          대구
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          광주
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          부산
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          울산
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          세종특별자치시
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          경기도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          강원특별자치도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          충청북도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          충청남도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          경상북도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          경상남도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          전북특별자치도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          전라남도
        </li>
        <li className="w-full text-center py-4 rounded-lg cursor-pointer hover:bg-[rgba(255,131,67,0.5)]">
          제주도
        </li>
      </ul>
    </div>
  );
}
