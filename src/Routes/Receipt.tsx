import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoData } from "../atoms";
const Container = styled.div`
  padding: 0 12vw;
  margin-top: 100px;
  box-sizing: border-box;
  margin-bottom: 100px;
  min-width: 890px;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 890px;
  height: 80px;
  background-color: #388e3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-sizing: border-box;
  padding: 0 10vw;
  span:first-child {
    font-size: 20px;
    font-weight: bold;
  }
`;
const BackBtn = styled.div`
  border: 2px solid #bbbbbb;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px 1px #bbbbbb;
  cursor: pointer;
  position: absolute;
  left: 10px;
  bottom: 0;
  transform: translateY(110%);
  & > svg {
    width: 25px;
    fill: #bbbbbb;
  }
`;
const Paper = styled.div`
  border: 2px solid #989898;
  padding: 10px 0;
  width: 100%;
  box-shadow: 0px 0px 4px 1px #bbbbbb;
`;
const PaperTwo = styled.div`
  width: 100%;
  padding: 2px 0;
  border-top: 10px solid #bbbbbb;
  border-bottom: 10px solid #bbbbbb;
`;
const PaperThree = styled.div`
  border-top: 3px solid red;
  border-bottom: 3px solid red;
  padding: 0 15px;
`;
const CustomerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 110px;
  border-bottom: 1px dashed #bbbbbb;
  span:first-child {
    margin-bottom: 10px;
  }
`;
const Exchange = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  border-bottom: 2px dashed #bbbbbb;
  span:first-child {
    margin-bottom: 10px;
    text-align: center;
  }
`;
const Title = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px dashed #bbbbbb;
  border-bottom: 2px dashed #bbbbbb;
  margin: 1px 0;
`;
const Table = styled.div`
  border-top: 2px dashed #bbbbbb;
`;

const Head = styled.div`
  display: flex;
  padding: 0 20px;
  padding-top: 15px;
  padding-bottom: 5px;
  border-bottom: 2px dotted #bbbbbb;
`;
const Name = styled.div`
  width: 55%;
`;
const OnePrice = styled.div`
  width: 20%;
`;
const Count = styled.div`
  width: 15%;
`;
const Price = styled.div`
  width: 10%;
`;
const Row = styled.div`
  display: flex;

  padding: 12px 20px;
`;
const Body = styled.div``;
const PayPrice = styled.div`
  border-top: 2px dotted #bbbbbb;
  border-bottom: 2px dotted #bbbbbb;
  padding: 3px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const imsi = [
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
];
function Receipt() {
  const [userInfo, setUserInfo] = useRecoilState<any>(userInfoData);
  const navigate = useNavigate();
  let testPopUp: any;
  const openPopUp = () => {
    testPopUp = window.open(
      "https://nid.naver.com/nidlogin.logout",
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1"
    );
  };
  const LogOut = (social: string) => {
    if (social === "KAKAO") {
      //카카오 로그아웃
      const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
      const LOGOUT_REDIRECT_URL = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
      const KAKAO_AUTH_URL_LOGOUT = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URL}`;
      setUserInfo([]);
      window.location.href = KAKAO_AUTH_URL_LOGOUT;
    } else if (social === "NAVER") {
      //네이버 로그아웃
      openPopUp();
      setTimeout(() => testPopUp.close(), 1000);
      setUserInfo([]);
      navigate("/");
    } else {
      //기본 로그아웃
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUserInfo([]);
      navigate("/");
    }
  };
  return (
    <Container>
      <Header>
        <span>결제완료!</span>
        <span>박진우 고객님 사랑합니다!</span>
        <BackBtn onClick={() => LogOut(userInfo?.socialType)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
          </svg>
        </BackBtn>
      </Header>
      <Paper>
        <PaperTwo>
          <PaperThree>
            <CustomerCenter>
              <span>고객센터 : 02 - 2610 - 1822</span>
              <span>문제 발생시 고객센터로 문의 부탁드립니다.</span>
            </CustomerCenter>
            <Exchange>
              <span>
                교환 / 환불은 결제일로부터 15일 내 판매가능한 정상품에 한해
                결제했던 수단과 구매영수증을 지참 후 방문시 가능합니다.
              </span>
              <span>
                (* 단 환불 / 결제수단 변경은 구매매장에서만 가능합니다.)
              </span>
            </Exchange>
            <Title>
              <span>카드 전표 (고객용)</span>
            </Title>
            <Table>
              <Head>
                <Name>상품명</Name>
                <OnePrice>단가</OnePrice>
                <Count>수량</Count>
                <Price>금액</Price>
              </Head>
              <Body>
                {imsi.map((item, index) => (
                  <Row key={index}>
                    <Name>{item.name}</Name>
                    <OnePrice>{item.price.toLocaleString()}</OnePrice>
                    <Count>{item.count}</Count>
                    <Price>{(item.count * item.price).toLocaleString()}</Price>
                  </Row>
                ))}
              </Body>
            </Table>
            <PayPrice>
              <span>결제금액</span>
              <span>123,456</span>
            </PayPrice>
          </PaperThree>
        </PaperTwo>
      </Paper>
    </Container>
  );
}
export default Receipt;
