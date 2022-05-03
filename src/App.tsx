import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import Welcome from "./Routes/Welcome";
import Main from "./Routes/Main";
import Itemcode from "./Routes/Itemcode";
import Itemadd from "./Routes/Itemadd";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const baseURL = "http://52.55.54.57:3333";

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    await axios
      .get(baseURL)
      .then((response) => {
        console.log(response.data);
        // setValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/main" element={<Main />}>
          <Route path=":itemId" element={<Main />} />
        </Route>
        <Route path="/itemcode" element={<Itemcode />}>
          <Route path=":num" element={<Itemcode />} />
        </Route>

        <Route path="/" element={<Welcome />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
