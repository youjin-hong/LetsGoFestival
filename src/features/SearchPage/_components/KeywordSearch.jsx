export default function KeywordSearch() {
  return (
    <div className="w-full p-4 flex flex-col gap-3">
      <p className="text-beforeHover">검색하고 싶은 키워드를 입력하세요.</p>
      <input
        type="text"
        placeholder="ex) 강원 or 벚꽃"
        className="shadow-lg rounded-lg w-full py-5 px-3 flex items-center outline-iconActive"
      />
    </div>
  );
}
