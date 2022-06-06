import { useEffect } from "react";

const { naver } = window;

const NaverLogin = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "ZT4dK4wpFSNrBPdDwfMn",
      callbackUrl: "http://localhost:3000/auth/naver",
      clientSecret: "WW057qN9pe",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 3, height: "60" }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
