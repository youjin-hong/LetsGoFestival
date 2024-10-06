import { Link } from "react-router-dom";

export default function NoneItemPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">아직 위시리스트가 비어있네요!</h1>
      <p className="text-md mb-8">
        마음에 드는 축제를 찾아 위시리스트에 추가해보세요.
      </p>
      <Link
        to="/"
        className="text-blue-500 hover:underline text-lg font-medium"
      >
        축제 구경하러 가기
      </Link>
    </div>
  );
}
