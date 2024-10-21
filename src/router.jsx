import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./features/HomePage/HomePage";
import SearchPage from "./features/SearchPage/SearchPage";
import DetailPage from "./features/DetailPage/DetailPage";
import WishListPage from "./features/WishListPage/WishListPage";
import NotFoundPage from "./features/NotFoundPage/NotFoundPage";
import SearchResultPage from "./features/SearchPage/_components/SearchResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "searchResult", element: <SearchResultPage /> },
      { path: "detail/:id", element: <DetailPage /> },
      { path: "wish", element: <WishListPage /> },
    ],
  },
]);