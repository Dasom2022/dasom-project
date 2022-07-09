import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Main from "./Routes/Main";
import Itemcode from "./Routes/Itemcode";
import Payment from "./KakoPay/Payment";
import Receipt from "./Routes/Receipt";
import KaKaoAuth from "./Auth/KakaoAuth";
import NaverAuth from "./Auth/NaverAuth";
import Admin from "./Routes/Admin";
import AdminDetail from "./Routes/AdminDetail";
import KaKaoLogout from "./Auth/KaKaoLogout";
import PayResult from "./KakoPay/PayResult";
import Find from "./Routes/Find";
import MyPage from "./Routes/MyPage";
import PayFail from "./KakoPay/PayFail";
import PayCancel from "./KakoPay/PayCancel";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/find/:id" element={<Find />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/auth/kakao" element={<KaKaoAuth />}></Route>
        <Route path="/auth/kakao/logout" element={<KaKaoLogout />}></Route>
        <Route path="/auth/naver" element={<NaverAuth />}></Route>

        <Route path="/payresult" element={<PayResult />}></Route>
        <Route path="/payfail" element={<PayFail />}></Route>
        <Route path="/paycancel" element={<PayCancel />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/main" element={<Main />}>
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
