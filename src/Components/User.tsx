import axios from "axios";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 100%;
  box-sizing: border-box;
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  & > svg {
    width: 30px;
    fill: #bbbbbb;
  }
  & > span {
    color: #bbbbbb;
    font-weight: bold;
  }
`;
const Search = styled.div`
  background-color: #bbbbbb;
  border-radius: 5px;
  height: 42px;
  display: flex;
  align-items: center;
  position: relative;
  & > svg {
    position: absolute;
    width: 20px;
    transform: translateX(50%);
    fill: #388e3c;
  }
  & > form {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    & > input {
      width: calc(100% - 40px);
      box-sizing: border-box;
      height: 30px;
      border-radius: 5px;
      outline: none;
      border: 1px solid #bbbbbb;
    }
  }
`;
const UserList = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 20px;
  height: calc(100% - 106px);
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  &,
  & > li {
    list-style: none;
  }
`;
const UserInfo = styled.li`
  display: flex;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

const Id = styled.div`
  width: 15%;
`;
const Name = styled.div`
  width: 10%;
`;
const Email = styled.div`
  width: 35%;
  word-break: break-all;
`;
const Social = styled.div`
  width: 10%;
`;
const Buttons = styled.div`
  justify-self: flex-start;
  & > button {
    background-color: #388e3c;
    color: white;
    padding: 5px 8px;
    border: none;
    border-radius: 4px;
    margin-left: 3px;
    cursor: pointer;
  }
`;

const User = () => {
  const [users, setUsers] = useState<any>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("/member/memberList").then((res) => setUsers(res.data));
  }, []);
  console.log(users);
  return (
    <Container>
      <Head>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z" />
        </svg>
        <span>회원관리</span>
      </Head>
      <Search>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
        </svg>
        <form>
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
      </Search>
      <UserList>
        {users
          .filter((item: any) => {
            return item.username.includes(search);
          })
          .map((item: any) => (
            <UserInfo key={item.id}>
              <Id>{item.username}</Id>
              <Name>{item.name}</Name>
              <Email>{item.email}</Email>
              <Social>{item.socialType}</Social>
              <Buttons>
                <button>수정</button>
                <button>삭제</button>
              </Buttons>
            </UserInfo>
          ))}
      </UserList>
    </Container>
  );
};
export default User;
