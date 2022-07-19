import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { item } from "../atoms";
const TotalCount = styled.div`
  display: flex;
  width: 25%;
  justify-content: space-between;
  & > span:last-child {
    color: red;
  }
`;
const TotalPrice = styled(TotalCount)`
  width: 40%;
  margin-left: 15px;
  & > span:last-child > span:last-child {
    color: white;
  }
`;

function PriceView() {
  const [itemData, setItemData] = useRecoilState<any>(item);
  const [quantity, setQuantity] = useState<any>(0);
  const [totalAmount, setTotalAmount] = useState<any>(0);
  useEffect(() => {
    itemData.map((item: any) => {
      setQuantity((quantity: any) => quantity + item.count);
      setTotalAmount((totalAmount: any) => totalAmount + item.price);
    });
  }, [itemData]);
  return (
    <>
      <TotalCount>
        <span>수량 : </span>
        <span>{quantity}</span>
      </TotalCount>
      <TotalPrice>
        <span>구매금액 : </span>
        <span>
          <span>{totalAmount}</span>
          <span>원</span>
        </span>
      </TotalPrice>
    </>
  );
}

export default PriceView;
