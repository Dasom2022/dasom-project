import { useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { userInfoData } from "../atoms";
import AddItem from "../Components/AddItem";
import Product from "../Components/Product";
import User from "../Components/User";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 720px;
  min-height: 420px;
`;
const Header = styled.div`
  height: 50px;
  background-color: #388e3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Bottom = styled.div`
  height: 70px;
  background-color: #388e3c;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > div {
    color: white;
    margin-right: 30px;
  }
`;
const LogoutBtn = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 2px 8px;
  height: 30px;
  border: 1px solid white;
  border-radius: 3px;
  & > svg {
    fill: white;
    width: 20px;
    margin-right: 8px;
  }
`;
const AdminBtn = styled(LogoutBtn)``;
const Content = styled.div`
  height: calc(100% - 120px);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
const BackBtn = styled.div`
  border: 2px solid #bbbbbb;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 3px 1px #bbbbbb;
  margin-right: 20px;
  cursor: pointer;
  & > svg {
    width: 25px;
    fill: #bbbbbb;
  }
`;

function AdminDetail() {
  const userInfo = useRecoilValue(userInfoData);
  const { category: match } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo.role !== "ADMIN") {
      navigate("/main");
      alert("관리자 권한이 없습니다.");
    } else {
      const token = localStorage.getItem("accessToken");
      axios
        .get(`/api/member/auth/adminPage?accessToken=${token}`)
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            navigate("/main");
            alert("관리자 권한이 없습니다.");
          }
        })
        .catch((error) => {
          // ...  실패 처리
          console.log(error);
        });
    }
  }, []);
  return (
    <Container>
      <Header>
        <LogoutBtn onClick={() => navigate("/")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z" />
          </svg>
          <span>Logout</span>
        </LogoutBtn>
        <AdminBtn>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M282.3 343.7L248.1 376.1C244.5 381.5 238.4 384 232 384H192V424C192 437.3 181.3 448 168 448H128V488C128 501.3 117.3 512 104 512H24C10.75 512 0 501.3 0 488V408C0 401.6 2.529 395.5 7.029 391L168.3 229.7C162.9 212.8 160 194.7 160 176C160 78.8 238.8 0 336 0C433.2 0 512 78.8 512 176C512 273.2 433.2 352 336 352C317.3 352 299.2 349.1 282.3 343.7zM376 176C398.1 176 416 158.1 416 136C416 113.9 398.1 96 376 96C353.9 96 336 113.9 336 136C336 158.1 353.9 176 376 176z" />
          </svg>
          <span>admin 1</span>
        </AdminBtn>
      </Header>
      <Content>
        <BackBtn onClick={() => navigate("/admin")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
          </svg>
        </BackBtn>
        {match == "user" ? (
          <User />
        ) : match == "product" ? (
          <Product />
        ) : match == "addItem" || match == "editItem" ? (
          <AddItem />
        ) : null}
      </Content>
      <Bottom>
        <div>tel. 02-2610-1822</div>
      </Bottom>
    </Container>
  );
}
export default AdminDetail;
