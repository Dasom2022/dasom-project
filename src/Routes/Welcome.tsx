import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WelcomeBackground from "../Components/WelcomeBackground";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const LeftWrap = styled.div`
  padding: 40px;
  width: 60%;
`;

const LightWrap = styled.div`
  display: flex;
  justify-content: right;
  position: relative;
  padding: 40px;
  width: 40%;
`;

const Hader = styled.h1`
  margin-top: 30px;
  font-size: 48px;
  margin-bottom: 50px;
  color: white;
  font-weight: 600;
`;

const Explanation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const Leftspan = styled.span`
  color: white;
  font-size: 22px;
`;

const Rightbox = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 40px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 15px;
`;

const QRlocation = styled.div``;

const Footter = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 60px;
`;

const Loginbtn = styled.div`
  background-color: #8bc34a;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

function Welcome() {
  const navigate = useNavigate();
  const OnshopingList = () => {
    navigate("/main");
  };
  return (
    <Wrapper>
      <WelcomeBackground />
      <LeftWrap>
        <Hader>
          환영합니다!
          <br />
          DAMA 쇼핑카트
        </Hader>
        <Leftspan>
          DAMA 모바일 사이트에서
          <br />
          <span style={{ fontWeight: 600 }}> "QR코드"</span> 를 받아
          로그인하세요
          <Explanation>
            <Logo src={process.env.PUBLIC_URL + "/image/qr.png"}></Logo>
            <QRlocation>
              좌측의 QR코드를 카메라로
              <br /> 인식해 주세요!
            </QRlocation>
          </Explanation>
        </Leftspan>
        <Footter>DASOM Project dama</Footter>
      </LeftWrap>
      <LightWrap>
        <Link to="login">
          <Loginbtn>QR외 로그인</Loginbtn>
        </Link>
        <Rightbox>
          <div>
            우측 손잡이의 스캐너에 <br /> QR코드를 스캔하세요.
          </div>
          <div onClick={OnshopingList}>
            <FontAwesomeIcon
              icon={faAngleRight}
              color={"#F0F4C3"}
              fontSize="150px"
            />
            <FontAwesomeIcon
              icon={faAngleRight}
              color={"#8BC34A"}
              fontSize="150px"
            />
            <FontAwesomeIcon
              icon={faAngleRight}
              color={"#4CAF50"}
              fontSize="150px"
            />
          </div>
        </Rightbox>
      </LightWrap>
    </Wrapper>
  );
}
export default Welcome;
