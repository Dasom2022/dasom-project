import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import NaverLogin from "../Auth/NaverLogin";
import { useSetRecoilState } from "recoil";
import { userInfoData } from "../atoms";
import axios from "axios";
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

const Joinwrap = styled.div`
  margin: 10px 0px;
`;

const APIlogin = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Loginbtn = styled.button`
  width: 400px;
  height: 50px;
  background-color: #388e3c;
  color: whitesmoke;
`;

const KakaoBtn = styled.div`
  background-color: #fee502;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #212121;
  height: 50px;
  width: 280px;
  margin-bottom: 20px;
`;

const Ul = styled.ul`
  padding: 0;
`;

const Li = styled.li`
  cursor: pointer;
  display: inline-block;
  margin: 0px 20px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 400;
`;

interface IForm {
  id: string;
  pw: string;
}

function Login() {
  //토큰 만료 시간 1시간
  const JWT_EXPIRY_TIME = 1 * 3600 * 1000;
  const setUserInfo = useSetRecoilState<any>(userInfoData);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onSubmit = ({ id, pw }: IForm) => {
    getLogin(id, pw);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  //로그인 요청 api
  function getLogin(id: string, pw: string) {
    axios
      .post(
        "/login",
        JSON.stringify({
          username: id,
          password: pw,
        }),
        config
      )
      .then(onLoginSuccess)
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  }
  const onLoginSuccess = (response: any) => {
    console.log(response);
    const { accessToken } = response.data;
    const { refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // 토큰 만료 1분전 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 6000);
    if (response.status === 200) {
      setTimeout(() => {
        setUserInfo(response.data);
        navigate("/main");
      }, 500);
    }
  };
  // 연장처리 리프레쉬
  const onSilentRefresh = () => {
    const token = localStorage.getItem("refreshToken");
    axios
      .post(`/api/member/auth/state?refreshToken=${token}`)
      .then(onLoginSuccess)
      .catch((error) => {
        // ... 로그인 실패 처리
      });
  };

  //카카오 로그인시
  const KakaoClick = () => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    console.log(REST_API_KEY);
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrapper>
      <Titlewrap>
        <Title>로그인</Title>
      </Titlewrap>
      <Loginwrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("id", {
              required: "아이디 입력은 필수입니다.",
            })}
            placeholder="아이디를 입력하세요"
            type="text"
          />
          <input
            {...register("pw", {
              required: "비밀번호 입력은 필수입니다.",
            })}
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
          <Loginbtn>로그인</Loginbtn>
        </Form>
      </Loginwrap>
      <Joinwrap>
        <Ul>
          <Li>비밀번호 찾기</Li> |<Li>아이디 찾기</Li> |
          <Link to="/join">
            <Li>회원가입</Li>
          </Link>
        </Ul>
      </Joinwrap>
      <APIlogin>
        <KakaoBtn onClick={KakaoClick}>카카오 로그인</KakaoBtn>
        <NaverLogin />
      </APIlogin>
    </Wrapper>
  );
}
export default Login;
