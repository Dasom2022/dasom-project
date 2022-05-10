import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IInfoData {
  userId: string;
  userPw: string;
  userEmail: string;
}
export interface IInfo {
  id: string;
  pw: string;
}
export const userInfoData = atom<IInfoData[]>({
  key: "userInfoData",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});

export const userInfo = atom<IInfo[]>({
  key: "userInfo",
  default: [],
});

export const searchOpenState = atom({
  key: "searchOpen",
  default: false,
});
