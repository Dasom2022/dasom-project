import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { item, itemDataVal, itemInfo, userInfoData } from "../atoms";

const SelectedItem = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  /* background-color: rgba(0, 0, 0, 0.15); */
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

  align-items: center;
  & > div:first-child {
    width: 60%;
    text-align: left;
  }
  & > div:nth-child(2) {
    width: 20%;
    text-align: center;
  }
  & > div:last-child {
    width: 20%;
    font-weight: bold;
    text-align: right;
    margin-right: 10px;
  }
`;

const Content = styled.div`
  height: calc(100% - 140px);
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function ItemViewList() {
  const [itemDataValue, setItemDataValue] = useRecoilState(itemDataVal);
  const [itemData, setItemData] = useRecoilState<any>(item);
  const [itemInfoS, setItemInfoS] = useRecoilState(itemInfo);

  const navigate = useNavigate();
  useEffect(() => {
    let added = 0;

    if (itemDataValue.length != 0 && itemData.length == 0) {
      setItemData([itemDataValue]);

      return;
    } else if (itemData.length != 0) {
      for (let i = 0; i < itemData.length; i++) {
        if (itemData[i].itemCode == itemDataValue.itemCode) {
          let a = itemData;
          let b = a.map((item: any, index: any) => {
            if (index == i) {
              return itemDataValue;
            } else return item;
          });
          setItemData([...b]);
          added = 1;
          break;
        }
      }
      if (!added) {
        console.log("삭제4");
        setItemData((prev: any) => [...prev, itemDataValue]);
      }
    }
  }, [itemDataValue]);

  return (
    <>
      <Content>
        {itemData.length > 0
          ? itemData
              .filter((item: any) => item.count > 0)
              .map((item: any, index: any) => (
                <SelectedItem key={index}>
                  <img
                    src={
                      process.env.PUBLIC_URL + `/image/${item.itemCode}.jpeg`
                    }
                  />
                  <SelectedItemInfo>
                    <div>{item.itemName}</div>
                    <div>{item.count}개</div>
                    <div>{item.price}원</div>
                  </SelectedItemInfo>
                </SelectedItem>
              ))
          : null}
      </Content>
    </>
  );
}

export default ItemViewList;
