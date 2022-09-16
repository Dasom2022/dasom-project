import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { item, itemAdded, itemDataVal, itemInfo, userInfoData } from "../atoms";

const SelectedItem = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;

  border-bottom: 2px solid #bbbbbb;
  & > img {
    width: 80px;
    height: 64px;
  }
  &:last-child {
    border: none;
  }
`;
const ItemAddedWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
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
  const [addedItem, setAddedItem] = useRecoilState(itemAdded);
  const [dumy, setDumy] = useState([
    {
      category: null,
      id: 2,
      itemCode: "321",
      itemName: "코코볼",
      locale: "e-4",
      member: null,
      price: 6640,
      weight: 3.1,
    },
    {
      category: null,
      id: 2,
      itemCode: "321",
      itemName: "치킨",
      locale: "e-4",
      member: null,
      price: 6640,
      weight: 3.1,
    },
  ]);
  useEffect(() => {
    let added = 0;
    //코드로 상품추가 리스트 상품이 추가되면 제거
    const filter = dumy.findIndex((data) => data.itemCode === "321");
    dumy.splice(filter, 1);

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
        setItemData((prev: any) => [...prev, itemDataValue]);
      }
    }
  }, [itemDataValue, addedItem]);

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
        {dumy &&
          dumy.map((item: any, index: any) => (
            <ItemAddedWrap>
              <SelectedItem key={index}>
                <img
                  src={process.env.PUBLIC_URL + `/image/${item.itemCode}.jpeg`}
                />
                <SelectedItemInfo>
                  <div>{item.itemName}</div>
                  <div>{item.count}1개</div>
                  <div>{item.price}원</div>
                </SelectedItemInfo>
              </SelectedItem>
            </ItemAddedWrap>
          ))}
      </Content>
    </>
  );
}

export default ItemViewList;
