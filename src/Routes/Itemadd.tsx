import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  position: fixed;
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
  background-color: #388e3c;
  padding: 30px;
  width: 35%;
  color: white;
`;

const CloseBtn = styled.div``;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Itemheader = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Itemprice = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

const Quantity = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

const QuantityAdd = styled.div`
  display: flex;
  font-size: 58px;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

const AddBtn = styled.div`
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-left: 200px;
`;

const Point = styled.div`
  font-size: 58px;
  font-weight: 600;
  text-align: center;
  position: absolute;
`;

const AddPrice = styled.div``;

const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EaPrice = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-right: 90px;
`;

const Price = styled.div`
  font-size: 58px;
  font-weight: 600;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  height: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;

const InfoSpan = styled.span`
  font-size: 25px;
  font-weight: 400;
  text-align: center;
`;

const InfoImg = styled.svg`
  width: 150px;
  margin-bottom: 30px;
`;

function Itemadd() {
  const match: PathMatch<string> | null = useMatch("/DAMA/itemcode/:num");
  const [dumyData, setDumyData] = useState({
    data: {
      code: ["5959", "1234"],
      value: ["바나나", "치킨"],
      price: ["1500", "3000"],
    },
  });
  const i = match?.params.num;
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  function CtnAdd() {
    setCount((prev) => prev + 1);
    setPrice(Number(dumyData.data.price[Number(i)]));
    setPrice((prev) => prev + price);
  }
  function BackBtn() {
    setPrice(0);
    setCount(1);
    navigate("/DAMA/itemcode");
  }
  return (
    <>
      {match ? (
        <Wrapper>
          <LeftWrap>
            <CloseBtn>
              <svg
                onClick={BackBtn}
                style={{ width: "30px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="black"
              >
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </CloseBtn>
            <Item>
              <Itemheader>{dumyData.data.value[Number(i)]}</Itemheader>
              <Itemprice>{dumyData.data.price[Number(i)]}₩</Itemprice>
            </Item>
          </LeftWrap>
          <LightWrap>
            <Quantity>
              <div style={{ fontSize: "58px", fontWeight: "400" }}>개수:</div>
              <QuantityAdd>
                <Point>{count - 1}</Point>
                <AddBtn onClick={CtnAdd}>
                  <svg
                    style={{ width: "30px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="white"
                  >
                    <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                  </svg>
                </AddBtn>
              </QuantityAdd>

              <AddPrice>
                <PriceWrap>
                  <EaPrice>개당 {dumyData.data.price[Number(i)]}₩</EaPrice>
                  <Price>{price}₩</Price>
                </PriceWrap>
              </AddPrice>
            </Quantity>
            <Info>
              <InfoImg
                stroke="white"
                strokeWidth="15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 600 600"
              >
                <path d="M0 24C0 10.75 10.75 0 24 0H96C107.5 0 117.4 8.19 119.6 19.51L121.1 32H312V134.1L288.1 111C279.6 101.7 264.4 101.7 255 111C245.7 120.4 245.7 135.6 255 144.1L319 208.1C328.4 218.3 343.6 218.3 352.1 208.1L416.1 144.1C426.3 135.6 426.3 120.4 416.1 111C407.6 101.7 392.4 101.7 383 111L360 134.1V32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24V24zM224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464zM416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464z" />
              </InfoImg>
              <InfoSpan>
                등록한 상품들을
                <br /> 카트에 넣어주세요
              </InfoSpan>
            </Info>
          </LightWrap>
        </Wrapper>
      ) : null}
    </>
  );
}
export default Itemadd;
