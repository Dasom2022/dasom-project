import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// export interface IInfoData {
//   username: string;
//   socialtype: string;
// }

// 유저 정보가 담길 데이터
export const userInfoData = atom<any>({
  key: "userInfoData",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});

export const searchOpenState = atom({
  key: "searchOpen",
  default: false,
});

export const openedMap = atom({
  key: "openedMap",
  default: -1,
});
