import styled from "styled-components";
import { useEffect, useState } from "react";
import ItemSearch from "../Components/ItemSearch";
import { useRecoilState } from "recoil";
import {
    item,
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

const Main = () => {
    //소켓 기본 설정
    let sock = new SockJS("http://43.200.61.12:3333/stomp");
    let stomp = Stomp.over(sock);
    const [searchOpen, setSearchOpen] = useRecoilState(searchOpenState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoData);
    const [itemDataValue, setItemDataValue] = useRecoilState(itemDataVal);
    const [itemData, setItemData] = useRecoilState<any>(item);
    const [payOpen, setPayOpen] = useState(false);
    const [itemInfoS, setItemInfoS] = useRecoilState(itemInfo);
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
        stomp.debug = null;
        stomp.connect({}, () => {
            stomp.subscribe(
                `/sub/chat/read/${userInfo.username}`,
                (data: any) => {
                    console.log(JSON.parse(data.body).body);
                    if (JSON.parse(data.body).body !== "wait") {
                        //statusCodeValue
                        const Data = JSON.parse(data.body);
                        setItemDataValue(Data.body);
                        console.log(Data.body);
                    }
                }
            );

            stomp.subscribe(
                `/sub/item/weight/${userInfo.username}`,
                (data: any) => {
                    if (JSON.parse(data.body).body !== "wait") {
                        const Data = JSON.parse(data.body);
                        setItemInfoS(Data);
                        console.log(Data);
                        // if (Data.ifZero) {
                        //   // setItemDataValue(Data.body);
                        //   console.log(Data);
                        // }
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
    }, 3000);
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
                            <button onClick={() => navigate("/mypage")}>
                                마이페이지
                            </button>
                            <button
                                onClick={() => Logout(userInfo?.socialType)}
                            >
                                로그아웃
                            </button>
                        </div>
                    </Header>
                    <ItemViewList />
                    {searchOpen ? <ItemSearch /> : null}
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};
export default Main;
