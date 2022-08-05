import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { openedMap } from "../atoms";

const Item = styled.div<{ opened: boolean }>`
  border: 1px solid #bbbbbb;
  background-color: white;
  margin-bottom: 5px;
  & > div:first-child {
    height: 70px;
    background-color: white;
    display: flex;
    align-items: ${(props) => (props.opened ? "flex-start" : "center")};
    padding: 0 10px;
    border-radius: 2px;
  }
  & > div > img {
    width: 80px;
    height: 62px;
    margin-right: 8px;
  }
`;
const ItemInfo = styled.div<{ opened: boolean }>`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  position: relative;
  & > span:first-child {
    font-size: 14px;
  }
  & > span:last-child {
    font-weight: bold;
  }
  & > button {
    position: absolute;
    bottom: 0;
    right: 0;
    border: 2px solid white;
    background-color: ${(props) => (props.opened ? "#9c9c9c" : "#31a737")};
    color: white;
    padding: 2px 5px;
    border-radius: 4px;
    box-shadow: 0px 5px 3px -3px #dfdfdf;
    cursor: pointer;
  }
`;

//약도 관련
const Map = styled.div`
  height: 35vw;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(8, 1fr);
`;
const MapTop = styled(motion.div)<{ num: number }>`
  grid-column: ${(props) => `${props.num + 2}/${props.num + 3}`};
  border: 1px solid black;
  box-sizing: border-box;
`;
const MapRight = styled(motion.div)<{ num: number }>`
  grid-column: 10/11;
  grid-row: ${(props) => `${props.num + 2}/${props.num + 3}`};
  border: 1px solid black;
  box-sizing: border-box;
`;
const MapBottom = styled(motion.div)<{ num: number }>`
  grid-column: ${(props) => `${props.num + 2}/${props.num + 3}`};
  grid-row: 8/9;
  border: 1px solid black;
  box-sizing: border-box;
`;
const MapCenter = styled.div`
  grid-column: 2/9;
  grid-row: 3/7;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: repeat(7, 1fr);
`;
const MapCenterLeft = styled(motion.div)<{ num: number }>`
  grid-column: ${(props) =>
    `${(props.num + 1) * 2}/${(props.num + 1) * 2 + 1}`};
  grid-row: 1/8;
  border: 1px solid black;
  box-sizing: border-box;
`;
const MapCenterRight = styled(motion.div)<{ num: number }>`
  grid-column: 8/14;
  grid-row: ${(props) => `${props.num * 2 + 1}/${props.num * 2 + 2}`};
  border: 1px solid black;
  box-sizing: border-box;
`;
const blockVariants = {
  animate: {
    backgroundColor: [
      "rgba(255,255,255,1)",
      "rgba(0,0,0,1)",
      "rgba(255,255,255,1)",
    ],
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
};

const mapTop = ["a-1", "a-2", "a-3", "a-4", "a-5", "a-6", "a-7", "a-8"];
const mapRight = ["b-1", "b-2", "b-3", "b-4", "b-5", "b-6"];
const mapBottom = ["c-1", "c-2", "c-3", "c-4", "c-5", "c-6", "c-7", "c-8"];
const mapCenterLeft = ["d-1", "d-2", "d-3"];
const mapCenterRight = ["e-1", "e-2", "e-3", "e-4"];
function SearchResultItem({ name, price, where, index }: any) {
  const [mapOpen, setMapOpen] = useRecoilState(openedMap);
  console.log(mapOpen);
  return (
    <>
      <Item opened={mapOpen == index}>
        <div>
          <img src={process.env.PUBLIC_URL + "/image/apple.jpg"} />
          <ItemInfo opened={mapOpen == index}>
            <span>{name}</span>
            <span>{price.toLocaleString()}</span>
            <button
              onClick={() =>
                setMapOpen((prev) => {
                  if (prev == index) return -1;
                  else return index;
                })
              }
            >
              {mapOpen == index ? "위치 닫기" : "위치 열기"}
            </button>
          </ItemInfo>
        </div>
        {mapOpen == index ? (
          <Map>
            {mapTop.map((item, index) => (
              <MapTop
                variants={blockVariants}
                animate={where == item ? "animate" : "no"}
                num={index}
                key={item}
              >
                {item}
              </MapTop>
            ))}
            {mapRight.map((item, index) => (
              <MapRight
                variants={blockVariants}
                animate={where == item ? "animate" : "no"}
                num={index}
                key={item}
              >
                {item}
              </MapRight>
            ))}
            {mapBottom.map((item, index) => (
              <MapBottom
                variants={blockVariants}
                animate={where == item ? "animate" : "no"}
                num={index}
                key={item}
              >
                {item}
              </MapBottom>
            ))}
            <MapCenter>
              {mapCenterLeft.map((item, index) => (
                <MapCenterLeft
                  variants={blockVariants}
                  animate={where == item ? "animate" : "no"}
                  num={index}
                  key={item}
                >
                  {item}
                </MapCenterLeft>
              ))}
              {mapCenterRight.map((item, index) => (
                <MapCenterRight
                  variants={blockVariants}
                  animate={where == item ? "animate" : "no"}
                  num={index}
                  key={item}
                >
                  {item}
                </MapCenterRight>
              ))}
            </MapCenter>
          </Map>
        ) : null}
      </Item>
    </>
  );
}

export default SearchResultItem;
