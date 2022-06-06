
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Main from "./Routes/Main";
import Payment from "./Routes/Payment";
import Receipt from "./Routes/Receipt";
import Admin from "./Routes/Admin";
import AdminDetail from "./Routes/AdminDetail";
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/:category" element={<AdminDetail />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/main" element={<Main />}>
          <Route path="/main/:itemId" element={<Main />} />
        </Route>
        <Route path="/pay" element={<Payment />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/" element={<Welcome />}></Route>
      </Routes>
    </Router>
  );
}

export default App;