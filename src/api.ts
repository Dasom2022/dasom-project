import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// 로그인 요청 api
export async function getLogin(id: string, pw: string) {
  axios
    .post(
      "/login",
      JSON.stringify({
        username: id,
        password: pw,
      }),
      config
    )
    .then((response) => {
      //로컬에 토큰 저장
      localStorage.setItem("accessToken", response.data["authorization"]);
      localStorage.setItem(
        "refreshToken",
        response.data["authorization-refresh"]
      );
      return response;
    })
    .catch((error) => {
      // 예외처리 추가 예정
      console.log(error);
    });
}

// 회원가입 요청 api
export async function getJoin(id: string, pw: string) {
  axios
    .post(
      "/member/signup",
      JSON.stringify({
        password: pw,
        username: id,
      }),
      config
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // 예외처리 추가 예정
      console.log(error);
    });
}

// 회원가입시 아이디 중복 검사
export function getIdMath(id: string): any {
  axios
    .post(`/api/signup/username/exist?username=${id}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // 예외처리 추가 예정
      console.log(error);
    });
}

// 이메일 인증 코드 보내기
export function getEmailSend(email: string) {
  axios
    .post(`/member/mail?email=${email}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // 예외처리 추가 예정
      console.log(error);
    });
}

// 이메일 인증 코드 검사
export function getEmailAuth(emailAuth: string): any {
  axios
    .post(`/member/verifyCode?confirm_email=${emailAuth}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // 예외처리 추가 예정
      console.log(error);
    });
}

// 카카오 로그인 요청 api (인자코드 발급)
export function getKakaoLogin(code: string | null): any {
  axios
    .post(`/auth/kakaoLogin?code=${code}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // 예외처리 추가 예정
      console.log(error);
    });
}

// 네이버 로그인 요청 api
export function getNaverLogin(token: string): any {
  axios
    .post(`/auth/naver?token=${token}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // 예외처리 추가 예정
      console.log(error);
    });
}
