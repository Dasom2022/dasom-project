import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 50px;
`;
const BuyWhatAndCount = styled.div`
  & > :first-child {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 18px;
  }
`;
const HowMuch = styled.div`
  font-weight: bold;
  color: gray;
`;

interface IReceiptProps {
  name: string;
  count: number;
  price: string;
}
function ReceiptItem({ name, count, price }: IReceiptProps) {
  return (
    <Container>
      <BuyWhatAndCount>
        <div>{name}</div>
        <div>{count}</div>
      </BuyWhatAndCount>
      <HowMuch>
        <div>${price}</div>
      </HowMuch>
    </Container>
  );
}

export default ReceiptItem;
