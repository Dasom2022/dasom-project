import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    cursor: pointer;
    padding: 20px 0px;
    color: aliceblue;
    font-size: 16px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Loginwrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;

const Titlewrap = styled.div`
  font-weight: 600;
`;

const Title = styled.h1`
  margin: 30px 0px;
  font-size: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 400px;
    height: 30px;
    padding: 15px 0px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 18px;
    margin-bottom: 10px;
    ::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
    &:focus {
      outline: none;
      border-color: #388e3c;
    }
  }
  span {
    color: tomato;
  }
`;

const Joinbtn = styled.button`
  width: 400px;
  height: 50px;
  background-color: #388e3c;
  margin-top: 15px;
`;

const Authbtn = styled.button`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #388e3c;
`;

interface ISignup {
  email: string;
  password: string;
  password2: string;
  username: string;
  emailauth: string;
}

function Join() {
  const [joins, setJoin] = useState(false);
  const [emailAuthMsg, setEmailAuthMsg] = useState("");
  const [idAuthMsg, setIdAuthMsg] = useState("");
  const [emailSendMsg, setEmailSendMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignup>();
  const join = () => {
    setJoin((prev) => !prev);
  };
  const onSubmit = ({ username, password, email }: ISignup) => {
    postUserData();
  };
  const joinMatch = (val: number) => {
    if (joins) {
      if (val === 200) {
        console.log("회원가입 완료!!");
        navigate("/main");
      }
    }
  };
  const idMath = (val: number) => {
    if (val === 0) {
      setIdAuthMsg("아이디 중복!");
    } else {
      setIdAuthMsg("사용가능한 아이디입니다.");
    }
  };
  const emailMath = (val: number) => {
    if (val === 1) {
      setEmailAuthMsg("이메일 인증 완료!");
    } else {
      setEmailAuthMsg("다시 입력해주세요...");
    }
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  function postUserData() {
    axios
      .post(
        "/member/signup",
        JSON.stringify({
          password: watch().password,
          username: watch().username,
        }),
        config
      )
      .then((response) => {
        console.log(response.status);
        joinMatch(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function Emailsend(e: any) {
    e.preventDefault();
    const val = watch().email;
    axios
      .post(`/member/mail?email=${val}`, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setEmailSendMsg("인증코드를 전송했습니다.");
  }

  async function Idsendauth(e: any) {
    e.preventDefault();
    const val = watch().username;
    axios
      .post(`/api/signup/username/exist?username=${val}`, config)
      .then((response) => {
        idMath(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function Emailsendauth(e: any) {
    e.preventDefault();
    const val = watch().emailauth;
    axios
      .post(`/member/verifyCode?confirm_email=${val}`, config)
      .then((response) => {
        emailMath(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Wrapper>
      <Titlewrap>
        <Title>회원가입</Title>
      </Titlewrap>
      <Loginwrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("username", {
                required: "아이디 입력은 필수입니다.",
              })}
              placeholder="아이디를 입력하세요"
              type="text"
            />
            <Authbtn onClick={Idsendauth}>중복</Authbtn>
          </div>

          <span>{idAuthMsg}</span>
          <span>{errors?.username?.message}</span>

          <input
            {...register("password", {
              required: "비밀번호 입력은 필수입니다.",
              minLength: {
                value: 1,
                message: "8자 이상 입력해야합니다.",
              },
            })}
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
          <span>{errors?.password?.message}</span>
          <input
            {...register("password2", {
              required: "비밀번호 재입력은 필수입니다.",
              // validate: (value) =>
              //   value === password.current || "비밀번호가 일치하지 않습니다.",
            })}
            placeholder="비밀번호를 재입력하세요"
            type="password"
          />
          <span>{errors?.password2?.message}</span>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("email", {
                required: "이메일 입력은 필수입니다.",
              })}
              placeholder="이메일를 입력하세요"
              type="text"
            />
            <Authbtn onClick={Emailsend}>전송</Authbtn>
          </div>
          <span>{emailSendMsg}</span>
          <span>{errors?.email?.message}</span>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("emailauth", {
                required: "이메일 인증은 필수입니다.",
              })}
              placeholder="이메일 인증코드를 입력하세요"
              type="text"
            />
            <Authbtn onClick={Emailsendauth}>인증</Authbtn>
          </div>

          <span>{emailAuthMsg}</span>
          <Joinbtn onClick={join}>회원가입</Joinbtn>
        </Form>
      </Loginwrap>
    </Wrapper>
  );
}

export default Join;
