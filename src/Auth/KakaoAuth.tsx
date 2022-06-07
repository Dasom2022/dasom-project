import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userInfoData } from "../atoms";
import { useRecoilState } from "recoil";
function Auth() {
  const [userInfo, setUserInfo] = useRecoilState<any>(userInfoData);
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const KakaoLoginMatch = (value: any) => {
    console.log(value);
    if (value.status === 200) {
      console.log("로그인 성공!");
      setUserInfo(value.data);
      navigate("/main");
    } else {
      console.log("로그인 실패");
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(`/auth/kakaoLogin?code=${code}`, config)
      .then((response) => {
        KakaoLoginMatch(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>Kakao Loging...</div>;
}

export default Auth;
