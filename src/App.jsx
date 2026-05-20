import { Route, Routes } from "react-router-dom";
import "./App.css";
import SiteLayout from "./components/layout/SiteLayout";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ExplorePage from "./pages/ExplorePage";
import HelpPage from "./pages/HelpPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
