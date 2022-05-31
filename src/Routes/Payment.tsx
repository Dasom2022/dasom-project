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
  position: absolute;
  left: 50%;
  bottom: 90px;
  transform: translateX(-50%);
  color: white;
  background-color: transparent;
  border: 3px solid white;
  padding: 10px 50px;
  border-radius: 20px;
  cursor: pointer;
`;
function Payment() {
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
      <Link to="/DAMA/receipt">
        <Button>View receipt</Button>
      </Link>
    </Container>
  );
}
export default Payment;
