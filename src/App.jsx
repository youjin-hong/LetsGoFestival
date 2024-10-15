// import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="dark:bg-bgDark dark:text-white min-h-[100vh]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
