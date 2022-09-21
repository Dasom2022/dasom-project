import styled from "styled-components";
import { useEffect, useState } from "react";
import ItemSearch from "../Components/ItemSearch";
import { useRecoilState } from "recoil";
import {
  beaconVal,
  checkList,
  itemAdded,
  itemDataVal,
  itemInfo,
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
import QandA from "../Components/QandA";
const Stomp = require("stompjs");
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-width: 950px;
  min-height: 600px;
`;

const Left = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #fafbfc;
`;
const LeftLine = styled.div`
  align-self: center;
  width: 94%;
  height: 94%;
  margin: 0 auto;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  div > button {
    margin: 0px 10px;
    padding: 7px 15px;
    border-radius: 25px;
    border: 1px solid black;
    background-color: #32965c;
    color: white;
    font-weight: bold;
    font-size: 17px;
    color: white;
    box-shadow: 0 4px 4px -4px black;
    cursor: pointer;
  }
`;

const UserName = styled.span`
  span {
    font-weight: 600;
    font-size: 18px;
  }
`;
const SelectedItems = styled.div`
  background-color: white;
  height: 75%;
  margin-bottom: 10px;
  box-shadow: 1px 1px 3px gray;
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
  margin-right: 70px;
  & > :last-child {
    margin-left: 40px;
  }
`;

const Infomation = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-child {
    text-align: right;
    font-size: 18px;
    font-weight: 600;
  }
  & > :last-child {
    font-weight: bold;
    font-size: 22px;
    color: tomato;
    text-align: right;
  }
`;

//여기부턴 오른쪽메뉴
const Right = styled.div`
  width: 40%;
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
    flex-wrap: wrap;
    color: black;
    & > span {
      display: flex;
      align-items: center;
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
  let sock = new SockJS("http://43.200.61.12:3333/stomp");
  let stomp = Stomp.over(sock);
  const [searchOpen, setSearchOpen] = useRecoilState(searchOpenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoData);
  const [itemDataValue, setItemDataValue] = useRecoilState(itemDataVal);
  const [itemInfoS, setItemInfoS] = useRecoilState(itemInfo);
  const [addedItem, setAddedItem] = useRecoilState(itemAdded);
  const [checkListItem, setCheckListItem] = useRecoilState(checkList);
  const [beacon, setBeacon] = useRecoilState(beaconVal);
  const [payOpen, setPayOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [onCheckList, setOnCheckList] = useState(false);
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
      setOnCheckList(false);
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
    //체크리스트
    axios
      .get(`/member/memberItemList?accessToken=${token}`, config)
      .then((reponse: any) => {
        setCheckListItem(reponse);
        if (checkListItem.length !== 0) setOnCheckList(true);
      });
    axios.get(`/item/itemListPutByCode`, config).then((reponse: any) => {
      if (reponse.data[0].itemCode) {
        setAddedItem(reponse.data);
      }
    });
    //물품코드로 상품추가
    stomp.debug = null;
    stomp.connect({}, () => {
      //아이템
      stomp.subscribe(`/sub/chat/read/${userInfo.username}`, (data: any) => {
        if (JSON.parse(data.body).body !== "wait") {
          //statusCodeValue
          const Data = JSON.parse(data.body);
          setItemDataValue(Data.body);
        }
      });
      //총가격
      stomp.subscribe(`/sub/item/weight/${userInfo.username}`, (data: any) => {
        if (JSON.parse(data.body).body !== "wait") {
          const Data = JSON.parse(data.body);
          setItemInfoS(Data);
        }
      });
      //비콘센서
      stomp.subscribe(
        `/sub/api/beacon/locale/${userInfo.username}`,
        (data: any) => {
          if (JSON.parse(data.body).body.beacon !== "NOT_BEACON") {
            const Data = JSON.parse(data.body);
            setBeacon(Data.body.beacon);
          }
        }
      );
    });
  }, []);
  useInterval(() => {
    stomp.send(
      `/pub/api/websocket/itemList/${userInfo.username}`,
      {},
      JSON.stringify({})
    );
    stomp.send(
      `/pub/api/websocket/itemWeight/${userInfo.username}`,
      {},
      JSON.stringify({})
    );
    stomp.send(
      `/pub/api/beacon/locale/${userInfo.username}`,
      {},
      JSON.stringify({})
    );
  }, 3000);

  return (
    <Container>
      <Left>
        <LeftLine>
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
              <UserName>
                <span>{userInfo?.username}</span>님 환영합니다!
              </UserName>
              <button onClick={() => navigate("/mypage")}>마이페이지</button>
              <button onClick={() => Logout(userInfo?.socialType)}>
                로그아웃
              </button>
            </div>
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
      {onCheckList && (
        <Right>
          <RightTitle>
            <span>체크 리스트</span>
          </RightTitle>
          <Lists>
            {checkListItem.data &&
              checkListItem.data
                .filter(
                  (v: any, i: any) =>
                    checkListItem.data.findIndex(
                      (x: any) => x.itemCode === v.itemCode
                    ) === i
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
      )}

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
      <QandA />
    </Container>
  );
};
export default Main;
