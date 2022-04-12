import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Main from "./Routes/Main";
import Shopinglist from "./Routes/Shopinglist";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/shopinglist" element={<Shopinglist />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
