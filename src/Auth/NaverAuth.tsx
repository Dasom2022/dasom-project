import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getNaverLogin } from "../api";
import { naverToken, userInfoData } from "../atoms";

function NaverAuth() {
  const setUserInfo = useSetRecoilState<any>(userInfoData);
  const setNaverTkenData = useSetRecoilState<any>(naverToken);
  const location = useLocation();
  const navigate = useNavigate();

  const NaverLoginMatch = (value: any) => {
    if (value?.status === 200) {
      console.log("로그인 성공!");
      setUserInfo(value?.data);
      navigate("/main");
    } else {
      console.log("로그인 실패");
    }
  };
  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split("=")[1].split("&")[0];
    setNaverTkenData(token);

    NaverLoginMatch(getNaverLogin(token));
  };

  useEffect(() => {
    getNaverToken();
  }, []);
  return <div>Naver Loging...</div>;
}
export default NaverAuth;
