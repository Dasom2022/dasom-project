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
const PayBtn = styled.button`
  background-color: transparent;
  border: 2px solid white;
  padding: 7px 15px;
  border-radius: 22px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  box-shadow: 0 4px 4px -4px black;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(-50%) translateY(-50%);
  cursor: pointer;
`;
const Bottom = styled.div`
  height: 70px;
  font-size: 27px;
  background-color: #31a737;
  display: flex;
  align-items: center;
  color: white;
  position: relative;
  padding: 0 20px;
`;
const Content = styled.div`
  height: calc(100% - 140px);
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TotalCount = styled.div`
  display: flex;
  width: 25%;
  justify-content: space-between;
  & > span:last-child {
    color: tomato;
  }
`;
const TotalPrice = styled(TotalCount)`
  width: 40%;
  margin-left: 15px;
  & > span:last-child > span:last-child {
    color: white;
  }
`;
const Pay = styled.div`
  width: 30%;
  height: 20vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  & > span {
    font-weight: bold;
  }
  & > div {
    width: 100%;
    text-align: center;
  }
  button {
    padding: 5px 8px;
    border-radius: 20px;
    border: 2px solid white;
    color: white;
    font-weight: bold;
    box-shadow: 1px 4px 3px -3px #bbbbbb;
    cursor: pointer;
  }
  button:first-child {
    background-color: red;
  }
  button:last-child {
    background-color: #31a737;
  }
`;
function ItemViewList() {
  const [itemDataValue, setItemDataValue] = useRecoilState(itemDataVal);
  const [itemData, setItemData] = useRecoilState<any>(item);
  const [payOpen, setPayOpen] = useState(false);
  const [itemInfoS, setItemInfoS] = useRecoilState(itemInfo);
  const navigate = useNavigate();
  useEffect(() => {
    let added = 0;

    if (itemDataValue.length != 0 && itemData.length == 0) {
      setItemData([itemDataValue]);
      return;
    } else if (itemData.length != 0) {
      for (let i = 0; i < itemData.length; i++) {
        // if (itemData[i].itemCode === itemInfoS.itemCode) {
        //   console.log("삭제");
        //   setItemData(itemData.splice(i, 1));
        // }
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
  }, [itemDataValue]);

  return (
    <>
      <Content>
        {itemData.length > 0
          ? itemData.map((item: any, index: any) => (
              <SelectedItem key={index}>
                <img
                  src={process.env.PUBLIC_URL + `/image/${item.itemCode}.jpeg`}
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
      <Bottom>
        <TotalCount>
          <span>수량 : </span>
          <span>{itemInfoS?.totalCount}</span>
        </TotalCount>
        <TotalPrice>
          <span>구매금액 : </span>
          <span>
            <span>{itemInfoS?.totalPrice}</span>
            <span>원</span>
          </span>
        </TotalPrice>
        <PayBtn onClick={() => setPayOpen(true)}>결제하기</PayBtn>
      </Bottom>

      {payOpen ? (
        <Pay>
          <span>결제하시겠습니까?</span>
          <div>
            <button onClick={() => setPayOpen(false)}>돌아가기</button>
            <button onClick={() => navigate("/pay")}>결제하기</button>
          </div>
        </Pay>
      ) : null}
    </>
  );
}

export default ItemViewList;
