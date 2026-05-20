import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function SiteLayout() {
  return (
    <div className="site-layout">
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
