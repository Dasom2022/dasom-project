import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Main from "./Routes/Main";
import Itemcode from "./Routes/Itemcode";
import Payment from "./Routes/Payment";
import Receipt from "./Routes/Receipt";
import KaKaoAuth from "./Auth/KakaoAuth";
import NaverAuth from "./Auth/NaverAuth";
import Admin from "./Routes/Admin";
import AdminDetail from "./Routes/AdminDetail";
import KaKaoLogout from "./Auth/KaKaoLogout";

function App() {
  const token = localStorage.getItem("accessToken");

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/auth/kakao" element={<KaKaoAuth />}></Route>
        <Route path="/auth/kakao/logout" element={<KaKaoLogout />}></Route>
        <Route path="/auth/naver" element={<NaverAuth />}></Route>
        <Route path="join" element={<Join />}></Route>
        <Route path="main" element={<Main />}>
          <Route path="/main/:itemId" element={<Main />} />
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/:category" element={<AdminDetail />}></Route>
        <Route path="/itemcode" element={<Itemcode />}>
          <Route path=":num" element={<Itemcode />} />
        </Route>
        <Route path="pay" element={<Payment />} />
        <Route path="receipt" element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;
