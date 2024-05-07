import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
const Template = () => {
  return (
    <>
     <NavBar />       
        <div className="container">
          <Outlet />
          <Footer />
        </div>
    
    </>
  );
};

export default Template;
