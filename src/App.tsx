import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
