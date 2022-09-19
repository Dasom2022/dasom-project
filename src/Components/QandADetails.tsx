import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { qandaDeatils } from "../atoms";
const Wrap = styled.div``;
const ListWrap = styled.div`
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
    font-size: 22px;
    font-weight: 600;
    margin-left: 10px;
  }
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;
const Back = styled.svg`
  width: 20px;
  fill: #32965c;
  margin-left: 20px;
`;
const Contents = styled.div`
  margin: 20px;
  height: 410px;
`;
const Conetent = styled.div`
  margin: 15px 0px;
  display: flex;

  img {
    width: 30px;
    height: 30px;
  }
`;
const Answer = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 15px;
  background-color: #eee;
  font-size: 14px;
`;
function QandADetails() {
  const [detailView, setDetailView] = useRecoilState(qandaDeatils);
  const [qandaData, setQandaData] = useState([]);

  useEffect(() => {
    if (setQandaData.length > 0) {
      axios
        .post(`/api/v1/qna/second?secondQ=${detailView}`)
        .then((reponse) => setQandaData(reponse.data));
    }
  }, []);
  return (
    <Wrap>
      <ListWrap>
        <SetBtn
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
        </SetBtn>
        <ExitBtn xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 430">
          <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
        </ExitBtn>
      </ListWrap>
      <Header>
        <Back
          onClick={() => setDetailView(null)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </Back>
        <span>다마</span>
      </Header>
      <Contents>
        {qandaData.map((data, index) => (
          <Conetent key={index}>
            <img src={process.env.PUBLIC_URL + `/image/dasom.png`} />
            <Answer>{data}</Answer>
          </Conetent>
        ))}
      </Contents>
    </Wrap>
  );
}

export default QandADetails;
