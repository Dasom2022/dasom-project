import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userInfoData } from "../atoms";
import { useSetRecoilState } from "recoil";
import { getKakaoLogin } from "../api";
function Auth() {
  const setUserInfo = useSetRecoilState<any>(userInfoData);
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const KakaoLoginMatch = (value: any) => {
    console.log(value);
    if (value?.status === 200) {
      console.log("로그인 성공!");
      setUserInfo(value?.data);
      navigate("/main");
    } else {
      console.log("로그인 실패");
      //예외처리 추가
    }
  };

  useEffect(() => {
    KakaoLoginMatch(getKakaoLogin(code));
  }, []);

  return <div>Kakao Loging...</div>;
}

export default Auth;
