import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">해당 페이지가 존재하지 않습니다.</p>
      <Link
        to="/"
        className="text-blue-500 hover:underline text-lg font-medium"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
