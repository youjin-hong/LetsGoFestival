import { useState } from "react";
import { getKeywordSearchResults } from "../../../network/FestivalApi";

export default function KeywordSearch({ onSelect }) {
  const [keyword, setKeyword] = useState("");

  const fetchKeyword = async (inputValue) => {
    if (inputValue) {
      try {
        const keywordResult = await getKeywordSearchResults(inputValue);
        return keywordResult;
      } catch (e) {
        console.error("축제정보 검색결과 데이터 불러오기 실패", e);
      }
    }
  };

  const handleInputKeyword = async (e) => {
    const inputValue = e.target.value;
    setKeyword(inputValue);

    if (inputValue.length > 1) {
      try {
        const results = await fetchKeyword(inputValue);
        onSelect && onSelect(results);
      } catch (error) {
        console.error(error);
      }
    } else {
      onSelect && onSelect([]);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col gap-3">
      <p className="text-beforeHover">검색하고 싶은 키워드를 입력하세요.</p>
      <input
        type="text"
        placeholder="ex) 강원 or 벚꽃"
        className="shadow-lg rounded-lg w-full py-5 px-3 flex items-center outline-iconActive"
        onChange={handleInputKeyword}
        value={keyword}
      />
    </div>
  );
}
