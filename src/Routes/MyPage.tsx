import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function MyPage() {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const pwUpdate = (pw: string) => {
    const token = localStorage.getItem("accessToken");
    axios
      .post(`/member/pwUpdate?accessToken=${token}&password=${pw}`, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("비밀번호 변경 완료!");
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  };
  const onSubmitPw = ({ pw }: any) => {
    pwUpdate(pw);
  };
  return (
    <div>
      <h1>마이페이지</h1>
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmitPw)}>
        <input
          {...register("pw")}
          placeholder="변경할 비밀번호를 입력하세요"
          type="password"
        />
        <button type="submit">변경</button>
      </form>
    </div>
  );
}

export default MyPage;
