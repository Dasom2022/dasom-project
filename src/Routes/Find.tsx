import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    cursor: pointer;
    color: aliceblue;
    font-size: 16px;
    border-radius: 10px;
  }
`;
const Loginwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;
const Titlewrap = styled.div``;

const Title = styled.h1`
  margin: 30px 0px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 400px;
    height: 25px;
    padding: 15px 0px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 18px;
    margin-bottom: 10px;
    :nth-child(2) {
      margin-bottom: 25px;
    }
    ::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
    &:focus {
      outline: none;
      border-color: #388e3c;
    }
  }
`;
const Findbtn = styled.button`
  width: 400px;
  height: 50px;
  background-color: #388e3c;
  color: whitesmoke;
`;
function Find() {
  const navigate = useNavigate();
  const { id: match } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitId = ({ phone }: any) => {
    getFindId(phone);
  };
  const onSubmitPw = ({ id, phone }: any) => {
    getFindPw(id, phone);
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  function getFindId(phone: string) {
    console.log(phone);
    axios
      .post(`/member/smsId?phoneNumber=${phone}`, config)
      .then((response) => {
        if (response.status === 200) {
          alert("문자를 확인해주세요!");
          navigate("/login");
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  }
  function getFindPw(id: string, phone: string) {
    axios
      .post(`/member/smsPw?username=${id}&phoneNumber=${phone}`, config)
      .then((response) => {
        if (response.status === 200) {
          alert("문자를 확인해주세요!");
          navigate("/login");
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  }
  return (
    <Wrapper>
      {match == "id" ? (
        <>
          <Titlewrap>
            <Title>아이디 찾기</Title>
          </Titlewrap>
          <Loginwrap>
            <Form onSubmit={handleSubmit(onSubmitId)}>
              <input
                {...register("phone", {
                  required: "전화번호 입력은 필수입니다.",
                })}
                placeholder="전화번호를 입력하세요"
                type="text"
              />
              <Findbtn type="submit">메시지 전송</Findbtn>
            </Form>
          </Loginwrap>
        </>
      ) : match == "pw" ? (
        <>
          <Titlewrap>
            <Title>비밀번호 찾기</Title>
          </Titlewrap>
          <Loginwrap>
            <Form onSubmit={handleSubmit(onSubmitPw)}>
              <input
                {...register("id", {
                  required: "전화번호 입력은 필수입니다.",
                })}
                placeholder="아이디를 입력하세요"
                type="text"
              />
              <input
                {...register("phone", {
                  required: "전화번호 입력은 필수입니다.",
                })}
                placeholder="전화번호를 입력하세요"
                type="text"
              />
              <Findbtn type="submit">메시지 전송</Findbtn>
            </Form>
          </Loginwrap>
        </>
      ) : null}
    </Wrapper>
  );
}

export default Find;
