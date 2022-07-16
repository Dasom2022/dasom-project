import { atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ILogin {
  id: string;
  pw: string;
}
const { persistAtom } = recoilPersist();
// 유저 정보가 담길 데이터
export const userInfoData = atom<any>({
  key: "userInfoData",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const naverToken = atom<any>({
  key: "naverToken",
  default: "",
});

export const searchOpenState = atom({
  key: "searchOpen",
  default: false,
});

export const openedMap = atom({
  key: "openedMap",
  default: -1,
});

export const item = atom<any>({
  key: "items",
  default: [],
});

export const itemDataVal = atom<any>({
  key: "item",
  default: [],
});

// 배열
// setItemData (itemData) props로 넘겨줌 : {
//   {
//     count: 1,
//     itemCode: "222",
//     itemName: "서울우유 1L",
//     locale: "d-2",
//     price: 200000,
//     weight: 90.2,
//   },
// }

// data props로 넘어온 거 스태틱(배열):
// {

//   {
//     count: 1,
//     itemCode: "222",
//     itemName: "치킨",
//     locale: "d-2",
//     price: 200000,
//     weight: 90.2,
//   },

// }

// itemDataValue :

//   {
//     count: 1,
//     itemCode: "222",
//     itemName: "서울우유 1L",
//     locale: "d-2",
//     price: 200000,
//     weight: 90.2,
//   },
