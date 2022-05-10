import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Main from "./Routes/Main";
import Itemcode from "./Routes/Itemcode";
import Payment from "./Routes/Payment";
import Receipt from "./Routes/Receipt";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="join" element={<Join />}></Route>
        <Route path="main" element={<Main />}>
          <Route path="/main/:itemId" element={<Main />} />
        </Route>
        <Route path="/itemcode" element={<Itemcode />}>
          <Route path=":num" element={<Itemcode />} />
        </Route>
        <Route path="pay" element={<Payment />} />
        <Route path="receipt" element={<Receipt />} />
        <Route path="/" element={<Welcome />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
