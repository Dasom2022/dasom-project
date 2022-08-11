import styled from "styled-components";
import { useEffect, useState } from "react";
import ItemSearch from "../Components/ItemSearch";
import { useRecoilState } from "recoil";
import {
  checkList,
  item,
  itemDataVal,
  itemInfo,
  openedMap,
  searchOpenState,
  userInfoData,
} from "../atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import ItemViewList from "../Components/ItemViewList";
import useInterval from "../hooks/useInterval";
import { motion } from "framer-motion";
import SearchResultItem from "../Components/SearchResultItem";
const Stomp = require("stompjs");
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  min-width: 1000px;
  min-height: 600px;
`;

const Left = styled.div`
  width: 68%;
  height: 100%;
  display: flex;
  background-color: #fafbfc;
`;
const LeftLine = styled.div`
  align-self: center;
  width: 94%;
  height: 94%;
  margin: 0 auto;
`;

const Icons = styled.div`
  display: flex;
  margin-bottom: 10px;
  & > div:first-child,
  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: white;
    box-shadow: 1px 1px 3px 0px black;
    cursor: pointer;
    margin-right: 20px;
    & > svg {
      width: 20px;
    }
  }
`;
const SelectedItems = styled.div`
  background-color: white;
  height: 75%;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px black;
  position: relative;
`;
const PayButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  height: 45px;
  width: 200px;
  border-radius: 25px;
  border: 1px solid black;
  background-color: #32965c;
  color: white;
  font-weight: bold;
  font-size: 17px;
`;
const SelectedInfo = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
`;
const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  & > :first-child {
    font-weight: bold;
    margin-bottom: 5px;
  }
  & > :last-child {
    font-size: 15px;
  }
`;
const Infos = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  & > :last-child {
    margin-left: 40px;
  }
`;

const Infomation = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-child {
    font-size: 14px;
  }
  & > :last-child {
    font-weight: bold;
    font-size: 19px;
    text-align: right;
  }
`;

//여기부턴 오른쪽메뉴
const Right = styled.div`
  width: 32%;
  height: 100%;
  background: #dae6de;
  color: white;
`;
const RightTitle = styled.div`
  background-color: #32965c;
  font-weight: bold;
  padding: 12px 0;
  text-align: center;
  padding-left: 15px;
  font-size: 18px;
  & > svg {
    width: 20px;
    fill: white;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
  }
`;

const Lists = styled.div`
  height: calc(100% - 100px);
  div {
    display: flex;
    flex-wrap:wrap;
    color:black;
    & > span{
      display:flex;
      align-items:center;
    }
  }
  div:last-child {
    border: none;
  }
`;

const RightMenu = styled.div`
  display: flex;
  height: 53px;
  bottom: 0;
  width: 100%;
  & > button {
    width: 50%;
    color: white;
    border: none;
    border-right: 1px solid gray;
    font-size: 16px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserInfoHeader = styled.div`
  display: flex;
  font-size: 18px;
  div:last-child,
  div:first-child {
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 5px;
    background-color: white;
    box-shadow: 1px 1px 3px 0px black;
  }
  div:last-child {
    cursor: pointer;
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

const Main = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  //소켓 기본 설정
  const data = [
    {
      category: null,
      id: 10,
      itemCode: "123",
      itemName: "오레오",
      locale: "r-2",
      member: null,
      price: 5000,
      weight: 200,
    },
    {
      category: null,
      id: 7,
      itemCode: "553",
      itemName: "코카콜라 1.5L",
      locale: "c-2",
      member: null,
      price: 1900,
      weight: 0.51,
    },
  ];
  let sock = new SockJS("http://43.200.61.12:3333/stomp");
  let stomp = Stomp.over(sock);
  const [searchOpen, setSearchOpen] = useRecoilState(searchOpenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoData);
  const [itemDataValue, setItemDataValue] = useRecoilState(itemDataVal);
  const [itemData, setItemData] = useRecoilState<any>(item);
  const [itemInfoS, setItemInfoS] = useRecoilState(itemInfo);
  const [checkListItem, setCheckListItem] = useRecoilState(checkList);
  const [payOpen, setPayOpen] = useState(false);
  const [count, setCount] = useState(0);
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
    // if (!userInfo?.username) {
    //   navigate("/");
    //   alert("로그인 필수!");
    // }
    if (userInfo.role === "ADMIN") navigate("/admin");
    const token = localStorage.getItem("accessToken");
    axios
      .get(`/member/memberItemList?accessToken=${token}`, config)
      .then((reponse: any) => {
        setCheckListItem(reponse);
        for (let i = 0; i < reponse.data.length; i++) {
          for (let j = 0; j < reponse.data.length; j++) {
            if (reponse.data[j].itemName === reponse.data[j].itemName) {
              setCount((prev) => prev + 1 / 2);
            }
          }
        }
        console.log(checkListItem);
      });

    stomp.debug = null;
    stomp.connect({}, () => {
      stomp.subscribe(`/sub/chat/read/${userInfo.username}`, (data: any) => {
        if (JSON.parse(data.body).body !== "wait") {
          //statusCodeValue
          const Data = JSON.parse(data.body);
          setItemDataValue(Data.body);
        }
      });

      stomp.subscribe(`/sub/item/weight/${userInfo.username}`, (data: any) => {
        if (JSON.parse(data.body).body !== "wait") {
          const Data = JSON.parse(data.body);
          setItemInfoS(Data);
        }
      });

      stomp.subscribe(
        `/sub/api/beacon/locale/${userInfo.username}`,
        (data: any) => {
          console.log(JSON.parse(data.body).body);
          if (JSON.parse(data.body).body !== "NOT_BEACON") {
            const Data = JSON.parse(data.body);
            console.log(Data.body);
          }
        }
      );
    });
  }, []);
  // useInterval(() => {
  //   stomp.send(
  //     `/pub/api/websocket/itemList/${userInfo.username}`,
  //     {},
  //     JSON.stringify({})
  //   );
  //   stomp.send(
  //     `/pub/api/websocket/itemWeight/${userInfo.username}`,
  //     {},
  //     JSON.stringify({})
  //   );
  //   stomp.send(
  //     `/pub/api/beacon/locale/${userInfo.username}`,
  //     {},
  //     JSON.stringify({})
  //   );
  // }, 3000);

  return (
    <Container>
      <Left>
        <LeftLine>
          <Header>
            <Icons>
              <div onClick={() => navigate("/mypage")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill={"black"}
                >
                  <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" />
                </svg>
              </div>
              <div
                onClick={() => {
                  setSearchOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 550 512"
                  fill={"black"}
                >
                  <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                </svg>
              </div>
            </Icons>
            <UserInfoHeader>
              <div>{userInfo?.username}님 환영합니다!</div>
              <div onClick={() => Logout(userInfo?.socialType)}>로그아웃</div>
            </UserInfoHeader>
          </Header>
          <SelectedItems>
            <ItemViewList />
            <PayButton onClick={() => setPayOpen(true)}>
              카카오페이 결제
            </PayButton>
          </SelectedItems>
          <SelectedInfo>
            <InfoText>
              <span>좋은 쇼핑되세요!</span>
              <span>카메라에 인식 후 카트에 상품을 담아주세요..</span>
            </InfoText>
            <Infos>
              <Infomation>
                <span>개수</span>
                <span>{itemInfoS?.totalCount}</span>
              </Infomation>
              <Infomation>
                <span>총 가격</span>
                <span>{itemInfoS?.totalPrice}</span>
              </Infomation>
            </Infos>
          </SelectedInfo>
        </LeftLine>
      </Left>

      <Right>
        <RightTitle>
          <span>체크 리스트</span>
        </RightTitle>
        <Lists>
          {data &&
            data
              .filter(
                (v: any, i: any) =>
                  data.findIndex((x: any) => x.itemCode === v.itemCode) === i
              )
              .map((item: any, index: any) => (
                <div key={index}>
                  <span
                    style={{
                      textDecoration:
                        itemDataValue.itemCode === item.itemCode &&
                        itemDataValue.count > 0
                          ? "line-through"
                          : "",
                    }}
                  >
                    {item.itemName} {item.price}원
                  </span>
                  <SearchResultItem
                    type={"check"}
                    key={index}
                    name={item.itemName}
                    price={item.price}
                    where={item.locale}
                    index={index}
                  />
                </div>
              ))}
        </Lists>
        <RightMenu>
          <button
            style={{
              backgroundColor: "#32965c",
            }}
          >
            리스트
          </button>
          <button
            style={{
              backgroundColor: "#32965c",
            }}
          >
            초기화
          </button>
        </RightMenu>
      </Right>

      <div
        style={{
          backgroundColor: "blue",
          color: "white",
        }}
      ></div>
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
    </Container>
  );
};
export default Main;
