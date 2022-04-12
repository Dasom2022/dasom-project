import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms";

function Shopinglist() {
  const userData = useRecoilValue(userInfo);
  return <div>ㅁㄴㅇㅁㄴㅇ</div>;
}
export default Shopinglist;
