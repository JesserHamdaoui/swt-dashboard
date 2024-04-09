import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import SideBar from "./components/sidebar/SideBar";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <SideBar />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
