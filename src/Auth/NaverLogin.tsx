import { useEffect, useState } from "react";
import styled from "styled-components";

const { naver } = window;

const NaverBtn = styled.div`
  background-color: #03c75b;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 50px;
  width: 280px;
  margin-bottom: 20px;
`;
const NaverLogin = () => {
  const [on, SetOn] = useState(false);
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_CLIENT_ID,
      callbackUrl: "http://localhost:3000/dasom-project/auth/naver",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 1, height: "60" },
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
    SetOn((prev) => !prev);
  }, []);

  const btn: any = document.getElementById("naverLogin");
  btn?.addEventListener("click", function () {
    const loginBtn: any = document.getElementById("naverIdLogin")?.firstChild;
    loginBtn.click();
  });

  return (
    <>
      <div id="naverIdLogin" style={{ display: "none" }} />
      <NaverBtn id="naverLogin" onClick={() => SetOn((prev) => !prev)}>
        네이버 로그인
      </NaverBtn>
    </>
  );
};

export default NaverLogin;
