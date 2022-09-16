import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Itemadd from "./Itemadd";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  min-width: 1000px;
  min-height: 600px;
`;

const LeftWrap = styled.div`
  background-color: white;
  padding: 30px;
  width: 65%;
`;

const LightWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #388e3c;
  padding: 40px;
  width: 35%;
`;

const Leftheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 38px;
  margin-top: 12px;
`;

const CloseBtn = styled.div``;

const Codeview = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 310px;
  height: 150px;
  background-color: white;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const Numberpad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Numbers = styled.div`
  cursor: pointer;
  font-size: 30px;
  font-weight: 600;
  width: 90px;
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 55px;
  :last-child {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
function Itemcode() {
  const NumberpadData = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "X",
    "0",
    "Enter",
  ];
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [dumyCode, setDumyCode] = useState(["5959", "1234"]); // 더미 상품리스트
  const [dumyData, setDumyData] = useState({
    data: {
      code: ["5959", "1234"],
      value: ["바나나", "치킨"],
      price: ["1500", "3000"],
    },
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  function onClick(item: string) {
    if (item !== "X" && item !== "Enter") setCode((prev) => prev + item);
    if (item === "X") setCode((prev) => prev.substring(0, prev.length - 1));
    if (item === "Enter") {
      axios
        .post(
          `/item/itemCodePutItem`,
          JSON.stringify({
            itemCode: code,
          }),
          config
        )
        .then((response) => {
          console.log(response);
          navigate(`/itemcode/${code}`);
          setCode("");
        })
        .catch((error) => {
          // 예외처리 추가 예정
          console.log(error);
        });
    }
  }
  return (
    <Wrapper>
      <LeftWrap>
        <CloseBtn>
          <Link to="/main">
            <svg
              style={{ width: "30px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="black"
            >
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </Link>
        </CloseBtn>
        <Leftheader>상품코드를 입력하세요..</Leftheader>
      </LeftWrap>
      <LightWrap>
        <Codeview>{code}</Codeview>
        <Numberpad>
          {NumberpadData.map((num) => (
            <Numbers onClick={() => onClick(num)} key={num}>
              {num}
            </Numbers>
          ))}
        </Numberpad>
      </LightWrap>
      <Itemadd />
    </Wrapper>
  );
}
export default Itemcode;
