import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { item, itemDataVal } from "../atoms";

const SelectedItem = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #bbbbbb;
  & > img {
    width: 80px;
    height: 64px;
  }
  &:last-child {
    border: none;
  }
`;
const SelectedItemInfo = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  padding-top: 10px;
  box-sizing: border-box;
  margin-left: 10px;
  & > div:first-child {
    width: 60%;
  }
  & > div:nth-child(2) {
    width: 20%;
    margin-left: 10px;
  }
  & > div:last-child {
    width: 20%;
    font-weight: bold;
  }
`;
function ItemViewList({ data }: any) {
  const [itemDataValue, setItemDataValue] = useRecoilState(itemDataVal);
  const [itemData, setItemData] = useRecoilState<any>(item);
  for (let i = 0; i < data.length; i++) {
    if (i !== 0 && data[i].itemCode === itemDataValue.itemCode) {
      data = data.splice(i, 1, itemDataValue);
    }
  }

  return (
    <>
      {data.map((item: any, index: any) => (
        <SelectedItem key={index}>
          <img src={process.env.PUBLIC_URL + "/image/apple.jpg"} />
          <SelectedItemInfo>
            <div>{item.itemName}</div>
            <div>{item.count}</div>
            <div>{item.price}</div>
          </SelectedItemInfo>
        </SelectedItem>
      ))}
    </>
  );
}

export default ItemViewList;
