import "../style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Menu from "./Menu";
import Drink from "./Menu/drink";
import StapleFood from "./Menu/stapleFood";
import SideDish from "./Menu/sideDish";
import SignatureDish from "./Menu/signatureDish";
import CapsicumAnnuum from "./Menu/capsicumAnnuum";
import ColdFood from "./Menu/coldFood";
import StirFry from "./Menu/stirFry";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="menu" element={<Menu />}>
            <Route path="drinks" element={<Drink />} />
            <Route path="stapleFood" element={<StapleFood />} />
            <Route path="sideDish" element={<SideDish />} />
            <Route path="signatureDish" element={<SignatureDish />} />
            <Route path="capsicumAnnuum" element={<CapsicumAnnuum />} />
            <Route path="coldFood" element={<ColdFood />} />
            <Route path="stirFry" element={<StirFry />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
