import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function NaverAuth() {
  const location = useLocation();
  const NaverLoginMatch = (value: any) => {
    console.log(value);
    if (value.status === 200) {
      console.log("로그인 성공!");
    } else {
      console.log("로그인 실패");
    }
  };
  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split("=")[1].split("&")[0];
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(`/auth/naver?token=${token}`, config)
      .then((response) => {
        NaverLoginMatch(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNaverToken();
  }, []);
  return null;
}
export default NaverAuth;
