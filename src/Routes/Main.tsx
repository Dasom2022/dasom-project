import styled from "styled-components";
import { useEffect, useState } from "react";
import ItemSearch from "../Components/ItemSearch";
import { useRecoilState } from "recoil";
import { searchOpenState, userInfoData } from "../atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
const Stomp = require("stompjs");
const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 620px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #31a737;
  height: 70px;
  padding: 0 15px;
  color: white;
  div > button {
    margin: 0px 10px;
    background-color: transparent;
    border: 2px solid white;
    padding: 7px 15px;
    border-radius: 22px;
    font-weight: bold;
    font-size: 18px;
    color: white;
    box-shadow: 0 4px 4px -4px black;
    cursor: pointer;
  }
`;
const Bottom = styled.div`
  height: 70px;
  font-size: 27px;
  background-color: #31a737;
  display: flex;
  align-items: center;
  color: white;
  position: relative;
  padding: 0 20px;
`;
const Content = styled.div`
  height: calc(100% - 140px);
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TotalCount = styled.div`
  display: flex;
  width: 25%;
  justify-content: space-between;
  & > span:last-child {
    color: red;
  }
`;
const TotalPrice = styled(TotalCount)`
  width: 40%;
  margin-left: 15px;
  & > span:last-child > span:last-child {
    color: white;
  }
`;
const PayBtn = styled.button`
  background-color: transparent;
  border: 2px solid white;
  padding: 7px 15px;
  border-radius: 22px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  box-shadow: 0 4px 4px -4px black;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(-50%) translateY(-50%);
  cursor: pointer;
`;
const SelectedItem = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #bbbbbb;
  & > img {
    width: 80px;
    height: 64px;
  }
  &:last-child {
    border: none;
  }
`;
const SelectedItemInfo = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  padding-top: 10px;
  box-sizing: border-box;
  margin-left: 10px;
  & > div:first-child {
    width: 60%;
  }
  & > div:nth-child(2) {
    width: 20%;
    margin-left: 10px;
  }
  & > div:last-child {
    width: 20%;
    font-weight: bold;
  }
`;
const Pay = styled.div`
  width: 30%;
  height: 20vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & > span {
    font-weight: bold;
  }
  & > div {
    width: 100%;
    text-align: center;
  }
  button {
    padding: 5px 8px;
    border-radius: 20px;
    border: 2px solid white;
    color: white;
    font-weight: bold;
    box-shadow: 1px 4px 3px -3px #bbbbbb;
    cursor: pointer;
  }
  button:first-child {
    background-color: red;
  }
  button:last-child {
    background-color: #31a737;
  }
`;
const imsi = [
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
  { name: "남양유업 이오 요구르트, 80ml, 10개입", count: 1, price: 3960 },
];
const Main = () => {
  //소켓 기본 설정
  let sock = new SockJS("http://43.200.61.12:3333/stomp");
  let stomp = Stomp.over(sock);

  const [searchOpen, setSearchOpen] = useRecoilState(searchOpenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoData);
  const [payOpen, setPayOpen] = useState(false);
  const navigate = useNavigate();
  const Logout = async (social: string) => {
    if (social === "KAKAO") {
      //카카오 로그아웃
      const KAKAO_AUTH_URL_LOGOUT = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_LOGOUT_REDIRECT_URI}`;
      setUserInfo([]);
      window.location.href = KAKAO_AUTH_URL_LOGOUT;
    } else if (social === "NAVER") {
      //네이버 로그아웃
      //네이버 로그아웃 팝업창
      let testPopUp: any;
      const openPopUp = () => {
        testPopUp = window.open(
          "https://nid.naver.com/nidlogin.logout",
          "_blank",
          "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1"
        );
      };
      openPopUp();
      setTimeout(() => testPopUp.close(), 1000);
      setUserInfo([]);
      navigate("/");
    } else {
      //기본 로그아웃
      const token = localStorage.getItem("refreshToken");
      axios
        .post(`/api/member/auth/logout?refreshToken=${token}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          // ... 로그인 실패 처리
          console.log(error);
        });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUserInfo([]);
      navigate("/");
    }
  };
  useEffect(() => {
    if (!userInfo?.username) {
      navigate("/");
      alert("로그인 필수!");
    }
    //stomp.debug = null;
    // stomp.connect({}, () => {
    //   stomp.send(
    //     "/pub/api/websocket/itemList",
    //     {},
    //     JSON.stringify({ itemName: "123", itemCode: "100" })
    //   );
    //   stomp.subscribe(`/sub/chat/read/`, (data: any) => {
    //     const newMessage = JSON.parse(data.body);
    //     console.log(newMessage);
    //   });
    //   // return () => stomp.disconnect();
    // });
  }, []);
  return (
    <Container>
      {userInfo?.username ? (
        <>
          <Header>
            <div>
              <button
                onClick={() => {
                  setSearchOpen(true);
                }}
              >
                물건 검색
              </button>
              <button onClick={() => navigate("/itemcode")}>
                코드 상품추가
              </button>
            </div>
            <div>
              <span>{userInfo?.username}님 환영합니다!</span>
              <button onClick={() => navigate("/mypage")}>마이페이지</button>
              <button onClick={() => Logout(userInfo?.socialType)}>
                로그아웃
              </button>
            </div>
          </Header>
          <Content>
            {/* {imsi.map((item, index: any) => (
              <SelectedItem key={index}>
                <img src={process.env.PUBLIC_URL + "/image/apple.jpg"} />
                <SelectedItemInfo>
                  <div>{item.name}</div>
                  <div>{item.count}</div>
                  <div>{item.price.toLocaleString()}</div>
                </SelectedItemInfo>
              </SelectedItem>
            ))} */}
          </Content>
          <Bottom>
            <TotalCount>
              <span>수량 : </span>
              <span></span>
            </TotalCount>
            <TotalPrice>
              <span>구매금액 : </span>
              <span>
                <span></span>
                <span>원</span>
              </span>
            </TotalPrice>
            <PayBtn onClick={() => setPayOpen(true)}>결제하기</PayBtn>
          </Bottom>
          {searchOpen ? <ItemSearch /> : null}
          {payOpen ? (
            <Pay>
              <span>결제하시겠습니까?</span>
              <div>
                <button onClick={() => setPayOpen(false)}>돌아가기</button>
                <button onClick={() => navigate("/pay")}>결제하기</button>
              </div>
            </Pay>
          ) : null}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default Main;
