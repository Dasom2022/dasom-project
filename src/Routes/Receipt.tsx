import { useEffect } from "react";
import styled from "styled-components";
import ReceiptItem from "../Components/ReceiptItem";


const Container = styled.div`
  width: 100%;
  background: #f9f9f9;
  padding-bottom: 10px;
`;
const ReceiptDiv = styled.div`
  width: 70%;
  margin: 0 auto;
  border: 3px solid #dfdfdf;
  min-height: 230px;
  min-width: 600px;
  position: relative;
  background: white;
`;
const SelectedItems = styled.div``;

const TotalInfo = styled.div`
  border-top: 3px solid #dfdfdf;
  box-sizing: border-box;
  position: relative;
  height: 200px;
  color: gray;
  & > :last-child {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const ItemCount = styled.div`
  position: absolute;
  left: 50px;
  top: 15px;
`;
const PriceInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
  margin-top: 15px;
`;
const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  & > * {
    margin-bottom: 10px;
    font-weight: bold;
  }
  & > :last-child {
    color: black;
    font-size: 20px;
    font-weight: bold;
  }
`;
const Price = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-left: 30px;
  & > * {
    margin-bottom: 10px;
    font-weight: bold;
  }
  & > :last-child {
    color: black;
    font-size: 20px;
    font-weight: bold;
  }
`;
const Buttons = styled.div`
  width: 130px;
  position: absolute;
  bottom: 0;
  right: 0px;
  transform: translateX(120%);
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    & > div {
      background: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      margin-bottom: 10px;
      box-shadow: 0px 1px 5px 1px black;
      & > svg {
        width: 40px;
      }
    }
  }
`;

function Receipt() {
  useEffect(() => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  }, []);
  return (
    <Container>
      <ReceiptDiv>
        <SelectedItems>
          <ReceiptItem name="Blueberries" count={3} price="3.48" />
          <ReceiptItem name="Strawberries" count={1} price="7.81" />
          <ReceiptItem name="eggs" count={10} price="6.23" />
          <ReceiptItem name="apple" count={7} price="8.15" />
          <ReceiptItem name="Banana" count={2} price="4.31" />
          <ReceiptItem name="cheeze" count={2} price="12.62" />
          <ReceiptItem name="milk" count={1} price="2.92" />
          <ReceiptItem name="chicken" count={1} price="14.48" />
          <ReceiptItem name="pizza" count={2} price="28.12" />
          <ReceiptItem name="pork" count={3} price="15.86" />
          <ReceiptItem name="snack" count={12} price="23.42" />
        </SelectedItems>
        <TotalInfo>
          <ItemCount>17 Items</ItemCount>
          <PriceInfo>
            <InfoTitle>
              <span>Total savings this visit</span>
              <span>SUBTOTAL</span>
              <span>TAX</span>
              <span>Total</span>
            </InfoTitle>
            <Price>
              <span>-$10.00</span>
              <span>$35.97</span>
              <span>$0.49</span>
              <span>$26.46</span>
            </Price>
          </PriceInfo>
          <div>Printed receipt available at customer service on request.</div>
        </TotalInfo>
        <Buttons>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
            </div>
            <span>Pay & Sign Out</span>
          </div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M512 32C547.3 32 576 60.65 576 96V128H0V96C0 60.65 28.65 32 64 32H512zM576 416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V224H576V416zM112 352C103.2 352 96 359.2 96 368C96 376.8 103.2 384 112 384H176C184.8 384 192 376.8 192 368C192 359.2 184.8 352 176 352H112zM240 384H368C376.8 384 384 376.8 384 368C384 359.2 376.8 352 368 352H240C231.2 352 224 359.2 224 368C224 376.8 231.2 384 240 384z" />
              </svg>
            </div>
            <span>Change Payments</span>
          </div>
        </Buttons>
      </ReceiptDiv>
    </Container>
  );
}

export default Receipt;
