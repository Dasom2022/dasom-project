import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import { qandaDeatils } from "../atoms";
import QandADetails from "./QandADetails";

const Wrap = styled.div``;
const NavBox = styled.div`
  background-color: #32965c;
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 30px;
  border-radius: 15px;
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const ViewLogo = styled(motion.svg)`
  width: 35px;
  fill: white;
`;
const InLogo = styled.svg`
  width: 30px;
  fill: #32965c;
`;

const NavList = styled(motion.div)`
  background-color: white;
  width: 300px;
  height: 500px;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 30px;
  border-radius: 15px;
  z-index: 1;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2); ;
`;
const ListWrap = styled(motion.div)`
  margin: 20px;
  margin-bottom: 0px;
  position: relative;
`;
const ExitBtn = styled.svg`
  cursor: pointer;
  fill: #32965c;
  width: 16px;
  position: absolute;
  right: 0;
`;
const SetBtn = styled.svg`
  cursor: pointer;
  fill: #32965c;
  width: 21px;
  position: absolute;
  right: 0;
  margin-right: 30px;
  margin-top: 2px;
`;
const Header = styled.div`
  margin-bottom: 15px;
  display: flex;
  span {
    font-size: 24px;
    font-weight: 600;
    margin-left: 10px;
  }
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
  height: 330px;
`;
const ContentHeader = styled.div`
  span {
    display: block;
    color: gary;
    font-weight: 600;
    opacity: 0.5;
    margin-bottom: 5px;
  }
`;
const ChatBox = styled(motion.div)`
  cursor: pointer;
  min-width: 250px;
  min-height: 60px;
  margin-top: 15px;
  border-radius: 10px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  :hover {
    transform: scale(1.03);
  }
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2); ;
`;

const ChatBoxContents = styled.div`
  width: 100%;
`;
const ChatBoxHeader = styled.div`
  span {
    font-weight: 400;
    font-size: 16px;
  }
`;
const ChatDescription = styled.div`
  border-radius: 10px;
  color: #32965c;
  font-size: 14px;
  text-align: right;
  font-weight: 600;
`;

const Number = styled.div`
  text-align: center;
  span {
    padding: 10px;
    background-color: #32965c;
    font-size: 14px;
    border-radius: 10px;
    color: whitesmoke;
  }
  margin-top: 15px;
`;
function QandA() {
  const [id, setId] = useState<null | string>(null);
  const [detailView, setDetailView] = useRecoilState(qandaDeatils);
  const [qnaData, setQnaData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/v1/qna/first")
      .then((response) => setQnaData(response.data));
  }, []);
  return (
    <Wrap>
      <NavBox onClick={() => setId("1")}>
        <ViewLogo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
        </ViewLogo>
      </NavBox>
      {id ? (
        <NavList>
          {detailView == 0 || detailView ? (
            <QandADetails />
          ) : (
            <>
              <ListWrap>
                <SetBtn
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
                </SetBtn>
                <ExitBtn
                  onClick={() => setId(null)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 430"
                >
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </ExitBtn>
                <Header>
                  <InLogo
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
                  </InLogo>
                  <span>자주 묻는 질문</span>
                </Header>
                <ContentHeader>
                  <span>DAMA 카트!</span>
                  <span>궁금한 점은 언제든지 문의해주세요</span>
                </ContentHeader>
              </ListWrap>
              <Contents>
                {qnaData.map((data, index) => (
                  <ChatBox key={index} onClick={() => setDetailView(index)}>
                    <ChatBoxContents>
                      <ChatBoxHeader>
                        <span>{data}</span>
                      </ChatBoxHeader>
                      <ChatDescription>보러가기</ChatDescription>
                    </ChatBoxContents>
                  </ChatBox>
                ))}
              </Contents>
              <Number>
                <span>문의사항은 010-1234-1234</span>
              </Number>
            </>
          )}
        </NavList>
      ) : null}
    </Wrap>
  );
}
export default QandA;
