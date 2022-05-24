
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Main from "./Routes/Main";
import Payment from "./Routes/Payment";
import Receipt from "./Routes/Receipt";
import Admin from "./Routes/Admin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="DAMA/login" element={<Login />}></Route>
        <Route path="DAMA/admin/:category" element={<Admin />}></Route>
        <Route path="DAMA/join" element={<Join />}></Route>
        <Route path="DAMA/main" element={<Main />}>
          <Route path="/DAMA/main/:itemId" element={<Main />} />
        </Route>
        <Route path="DAMA/pay" element={<Payment />} />
        <Route path="DAMA/receipt" element={<Receipt />} />
        <Route path="DAMA/" element={<Welcome />}></Route>
      </Routes>
    </Router>
  );
}

export default App;