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
  const config = {
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "초코파이",
      item_code: "100",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "/payresult",
      fail_url: "/payresult",
      cancel_url: "/payresult",
    },
  };
  const kakaoPay = () => {
    const { params } = config;
    axios
      .post("/v1/payment/ready", null, {
        params, // config 설정에 데이터를 담아 넘겨준다.
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_PAY_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        const {
          data: { next_redirect_pc_url, tid },
        } = res;
        console.log(next_redirect_pc_url);
        window.localStorage.setItem("tid", tid);
        window.location.href = next_redirect_pc_url;
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
