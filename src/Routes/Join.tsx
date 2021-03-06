import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userInfoData } from "../atoms";
import { useSetRecoilState } from "recoil";
// import { getEmailAuth, getEmailSend, getIdMath, getJoin } from "../api";
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

const Msg = styled.span<{ spancolor: string }>`
  color: ${(props) => props.spancolor};
`;

interface ISignup {
  email: string;
  password: string;
  password2: string;
  username: string;
  emailauth: string;
  phone: string;
}

function Join() {
  const setUserInfo = useSetRecoilState<any>(userInfoData);
  const [joins, setJoin] = useState(false);
  const [emailAuthMsg, setEmailAuthMsg] = useState("");
  const [idAuthMsg, setIdAuthMsg] = useState("");
  const [emailSendMsg, setEmailSendMsg] = useState("");
  const [msgColor, setMsgColor] = useState("tomato");
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
  const onSubmit = ({ username, password, email, phone }: ISignup) => {
    getJoin(username, password, email, phone);
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  function getJoin(id: string, pw: string, email: string, phone: string) {
    axios
      .post(
        "/member/signup",
        JSON.stringify({
          password: pw,
          username: id,
          email: email,
          phoneNumber: phone,
        }),
        config
      )
      .then((response) => {
        joinMatch(response);
      })
      .catch((error) => {
        // ???????????? ?????? ??????
        console.log(error);
      });
  }

  // ????????? ?????? ?????? ?????????
  function getEmailSend(email: string) {
    axios
      .post(`/member/mail?email=${email}`, config)
      .then((response) => {
        if (!response.data) {
          setEmailSendMsg("????????? ??????????????????.");
          setMsgColor("tomato");
        }
        return response;
      })
      .catch((error) => {
        // ???????????? ?????? ??????
        console.log(error);
      });
  }

  // ???????????? ?????? ??????
  const joinMatch = (val: any) => {
    if (joins) {
      if (val?.status === 200) {
        console.log("???????????? ??????!!");
        setUserInfo(val?.headers);
        navigate("/login");
      } else {
        // ????????????
        console.log(val);
      }
    }
  };

  // ????????? ?????? ??????
  const idMath = (val: any) => {
    if (val === 0) {
      setIdAuthMsg("????????? ??????!");
      setMsgColor("tomato");
    } else {
      setIdAuthMsg("??????????????? ??????????????????.");
      setMsgColor("#388e3c");
    }
  };

  // ????????? ?????? ?????? ??????
  const emailMath = (val: any) => {
    if (val === 1) {
      setEmailAuthMsg("????????? ?????? ??????!");
      setMsgColor("#388e3c");
    } else {
      setEmailAuthMsg("?????? ??????????????????...");
      setMsgColor("tomato");
    }
  };

  // ????????? ?????? ??????
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

  // ????????? ?????? ??????
  async function Emailsend(e: any) {
    e.preventDefault();
    getEmailSend(watch()?.email);
    setEmailSendMsg("??????????????? ??????????????????.");
    setMsgColor("#388e3c");
  }

  // ????????? ?????? ??????
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
        <Title>????????????</Title>
      </Titlewrap>
      <Loginwrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("username", {
                required: "????????? ????????? ???????????????.",
              })}
              placeholder="???????????? ???????????????"
              type="text"
            />
            <Authbtn onClick={Idsendauth}>??????</Authbtn>
          </div>

          <Msg spancolor={msgColor}>{idAuthMsg}</Msg>
          <Msg spancolor={msgColor}>{errors?.username?.message}</Msg>

          <input
            {...register("password", {
              required: "???????????? ????????? ???????????????.",
              minLength: {
                value: 1,
                message: "8??? ?????? ?????????????????????.",
              },
            })}
            placeholder="??????????????? ???????????????"
            type="password"
          />
          <Msg spancolor={msgColor}>{errors?.password?.message}</Msg>
          <input
            {...register("password2", {
              required: "???????????? ???????????? ???????????????.",
              // validate: (value) =>
              //   value === password.current || "??????????????? ???????????? ????????????.",
            })}
            placeholder="??????????????? ??????????????????"
            type="password"
          />
          <Msg spancolor={msgColor}>{errors?.password2?.message}</Msg>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("email", {
                required: "????????? ????????? ???????????????.",
              })}
              placeholder="???????????? ???????????????"
              type="text"
            />
            <Authbtn onClick={Emailsend}>??????</Authbtn>
          </div>
          <Msg spancolor={msgColor}>{emailSendMsg}</Msg>
          <Msg spancolor={msgColor}>{errors?.email?.message}</Msg>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <input
              {...register("emailauth", {
                required: "????????? ????????? ???????????????.",
              })}
              placeholder="????????? ??????????????? ???????????????"
              type="text"
            />
            <Authbtn onClick={Emailsendauth}>??????</Authbtn>
          </div>
          <input
            {...register("phone", {
              required: "???????????? ????????? ???????????????.",
            })}
            placeholder="??????????????? ???????????????"
            type="phone"
          />
          <Msg spancolor={msgColor}>{emailAuthMsg}</Msg>
          <Joinbtn onClick={join}>????????????</Joinbtn>
        </Form>
      </Loginwrap>
    </Wrapper>
  );
}

export default Join;
