import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #7a7c7e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  & > :first-child {
    font-size: 50px;
    margin-bottom: 15px;
  }
  & > :nth-child(2) {
    font-size: 20px;
    margin-bottom: 10px;
  }
  & > :nth-child(3) {
    width: 30%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  & > :nth-child(4) {
    font-size: 120px;
    margin-top: -20px;
    & > span {
      font-size: 50px;
    }
  }
`;

const Button = styled.button`
  bottom: 90px;
  color: white;
  background-color: transparent;
  border: 3px solid white;
  padding: 10px 50px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 30px;
`;
function Payment() {
  const kakaoPay = () => {
    console.log(1);
    const config = {
      headers: {
        Authorization: "75f98f6d6e46a32d16d274bd51d72eb4",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(`kapi.kakao.com/v1/payment/ready`, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <div>Almost done...</div>
      <div>Keep walking or remove your bags to complete your payment.</div>
      <div>
        <div>Other discounts</div>
        <div>-$10.00</div>
      </div>
      <div>
        <span>$</span>26.46
      </div>
      <div>*Includes Taxese & Fees.</div>
      {/* <Link to="/receipt"> */}
      <Button onClick={() => kakaoPay()}>카카오페이 결제</Button>
      {/* </Link> */}
    </Container>
  );
}
export default Payment;
