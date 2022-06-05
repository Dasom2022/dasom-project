import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QueryString from "qs";
import qs from "qs";

function Auth() {
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  // const getToken = async () => {
  //   const payload = qs.stringify({
  //     grant_type: "authorization_code",
  //     client_id: REST_API_KEY,
  //     redirect_uri: REDIRECT_URI,
  //     code: code,
  //   });
  //   try {
  //     // access token 가져오기
  //     const res = await axios.post(
  //       "https://kauth.kakao.com/oauth/token",
  //       payload
  //     );

  //     // Kakao Javascript SDK 초기화
  //     window.Kakao.init(REST_API_KEY);
  //     // access token 설정
  //     // window.Kakao.Auth.setAccessToken(res.data.access_token);
  //     console.log(res.data.access_token);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // });
  useEffect(() => {
    console.log(code);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(`/auth/kakao?token=${code}`, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>{code}</div>;
}

export default Auth;
