import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { naverToken, userInfoData } from "../atoms";

// export function LogoutHook(social: string) {
const LogoutHook = (social: string) => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoData);
  const naverTokenData = useRecoilValue(naverToken);
  if (social === "KAKAO") {
    //카카오 로그아웃
    const KAKAO_AUTH_URL_LOGOUT = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_LOGOUT_REDIRECT_URI}`;
    setUserInfo([]);
    window.location.href = KAKAO_AUTH_URL_LOGOUT;
  } else if (social === "NAVER") {
    //네이버 로그아웃
    const NAVER_AUTH_URL_LOGOUT = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&access_token=${naverTokenData}&service_provider=NAVER`;
    setUserInfo([]);
    window.location.href = NAVER_AUTH_URL_LOGOUT;
    // 라우터 봐야함 로그아웃 url
  } else {
    //기본 로그아웃
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserInfo([]);
    navigate("/");
  }
};
export default LogoutHook;
