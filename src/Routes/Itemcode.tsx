import { Link } from "react-router-dom";
import styled from "styled-components";
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
  align-items: center;
  flex-direction: column;
  background-color: #388e3c;
  padding: 30px;
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
  margin-top: 80px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 150px;
  background-color: white;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const Numberpad = styled.div`
  display: flex;
`;

const Numbers = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 55px;
`;
const Enter = styled.div`
  color: rgba(0, 0, 0, 0.3);
`;
function Itemcode() {
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
        <Leftheader>Enter the item's PLU #</Leftheader>
      </LeftWrap>
      <LightWrap>
        <Link to="/itemadd">
          <Codeview>Enter code</Codeview>
        </Link>
        <Numberpad>
          {[1, 2, 3].map((item) => (
            <Numbers key={item}>{item}</Numbers>
          ))}
        </Numberpad>
        <Numberpad>
          {[4, 5, 6].map((item) => (
            <Numbers key={item}>{item}</Numbers>
          ))}
        </Numberpad>
        <Numberpad>
          {[7, 8, 9].map((item) => (
            <Numbers key={item}>{item}</Numbers>
          ))}
        </Numberpad>
        <Numberpad>
          {["X", 0].map((item) => (
            <Numbers key={item}>{item}</Numbers>
          ))}
          <Numbers style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <Enter>Enter</Enter>
          </Numbers>
        </Numberpad>
      </LightWrap>
    </Wrapper>
  );
}
export default Itemcode;
