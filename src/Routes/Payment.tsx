import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userInfoData } from "../atoms";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #388e3c;
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
  const [userInfo, setUserInfo] = useRecoilState(userInfoData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const kakaoPay = () => {
    axios
      .post(
        "/credit/KakaoPay/ready",
        JSON.stringify({
          cid: "TC0ONETIME",
          partner_order_id: userInfo.username + "coffee",
          partner_user_id: userInfo.username,
          item_name: "coffee",
          item_code: "100",
          quantity: 1,
          total_amount: 1400,
          vat_amount: 200,
          tax_free_amount: 0,
          approval_url: "/payresult",
          fail_url: "/payresult",
          cancel_url: "/payresult",
        }),
        config
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.localStorage.setItem("tid", response.data.tid);
          window.location.href = response.data.next_redirect_pc_url;
        }
      })
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  };
  return (
    <Container>
      <div>결제 상세</div>
      <div>카카오페이 결제를 눌러 결제를 진행하세요</div>
      <div>
        <div>할인율</div>
        <div>-₩10.00</div>
      </div>
      <div>
        1400<span>₩</span>
      </div>
      <div>* 세금 및 수수료 포함</div>
      <Button onClick={() => kakaoPay()}>카카오페이 결제</Button>
    </Container>
  );
}
export default Payment;
