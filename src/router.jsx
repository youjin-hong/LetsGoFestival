import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./features/HomePage/HomePage";
import SearchPage from "./features/SearchPage/SearchPage";
import CalendarPage from "./features/CalendarPage/CalendarPage";
import DetailPage from "./features/DetailPage/DetailPage";
import WishListPage from "./features/WishListPage/WishListPage";
import NotFoundPage from "./features/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search/:keyword", element: <SearchPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "detail/:id", element: <DetailPage /> },
      { path: "wish", element: <WishListPage /> },
    ],
  },
]);
