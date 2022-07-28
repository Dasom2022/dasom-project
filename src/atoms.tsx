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

export const itemInfo = atom<any>({
  key: "itemInfo",
  default: {},
});
