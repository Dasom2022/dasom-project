import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userInfoData } from "../atoms";

function PayResult() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const pgToken = new URL(window.location.href).searchParams.get("pg_token");
  const tid = localStorage.getItem("tid");
  useEffect(() => {
    axios
      .post(
        "/credit/KakaoPay/completed",
        JSON.stringify({
          cid: "TC0ONETIME",
          partner_order_id: userInfo.username + "coffee",
          partner_user_id: userInfo.username,
          pg_token: pgToken,
          tid: tid,
        }),
        config
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("결제 완료!");
        }
      })
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  }, []);
  return <div>{pgToken}</div>;
}

export default PayResult;
