import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import User from "../Components/User";

const Container=styled.div`
    display:flex;
    justify-content: space-between;
    padding:30px 30px;
    align-items: flex-start;
    background-color:#eeeeee;
    height:100vh;
    box-sizing: border-box;
`;
const List=styled.ul<{category:string}>`
    width:calc( 15% - 15px );
    border:2px solid #dfdfdf;
    background-color:white;
    box-sizing: border-box;
    &, & > li{
        list-style:none;
        margin:0;
        padding:0;
    }
    & > li{
        padding:10px 10px;
        width:100%;
        box-sizing: border-box;
    }
    & > li:first-child{
        background-color:${props=>props.category=="user"?"#01b9ff":"white"};
    }
    & > li:last-child{
        background-color:${props=>props.category=="product"?"#01b9ff":"white"};
    }
    & > li:hover{
        cursor: pointer;
    }
`;
const Right=styled.div`
    width:calc( 85% - 15px );
    & > div:first-child{
        margin-bottom: 30px;
        position:relative;
        input{
            box-sizing: border-box;
            width:100%;
            height:40px;
            outline:none;
            vertical-align: top;
            border:2px solid #dfdfdf;
            padding-left:35px;
        }
        svg{
            position:absolute;
            top:50%;
            left:10px;
            transform:translateY(-50%);
            width:20px;
        }
    }
`;
const UserList=styled.div`
    border:1px solid #dfdfdf;
    background-color:white;
    & > div:first-child{
        margin:15px;
    }
`;
const ListHead=styled.ul`
    display:flex;
    width:100%;
    padding:10px 15px !important;
    box-sizing: border-box;
    border-bottom:1px solid #dfdfdf;
    font-size:14px;
    color:#dfdfdf;
    font-weight:bold;
    &, &>li{
        list-style:none;
        margin:0;
        padding:0;
    }
`;
const UserLists=styled.ul`
    margin:0;
    padding:0;
    &, & > li{
        list-style:none;
        margin:0;
        padding:0;
    }
    & > li::after{
        display:block;
        content:"";
        width:100%;
        border-bottom:1px solid #dfdfdf;
    }
    & > li:last-child::after{
        display:none;
    }
`;
const userList=[{
    num:0,
    id:"dfdf123",
    email:"dfo1341@naver.com",
    admin:"admin",
    type:"네이버"
},
{
    num:1,
    id:"dick329",
    email:"dkbie@google.com",
    admin:"customer",
    type:"no"
},
{
    num:2,
    id:"kakao123",
    email:"kakao@naver.com",
    admin:"admin",
    type:"카카오"
}]
function Admin(){
    const {category:params}=useParams<string>();
    const navigate=useNavigate();
    
    return (
        <Container>
            <List category={params||"user"}>
                <li onClick={()=>navigate("/DAMA/admin/user")}>전체 사용자</li>
                <li onClick={()=>navigate("/DAMA/admin/product")}>상품 관리</li>
            </List>
            <Right>
                <div>
                    <input type="text" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
                </div>
                <UserList>
                    <div>전체 사용자 {userList.length}명</div>
                    <ListHead>
                        <li style={{width:"60px"}}>번호</li>
                        <li style={{width:"170px"}}>아이디</li>
                        <li style={{width:"220px"}}>이메일</li>
                        <li style={{width:"120px"}}>권한</li>
                        <li style={{width:"100px"}}>소셜Type</li>
                    </ListHead>
                    <UserLists>
                        {userList.map((item)=>(
                            <User key={item.num} num={item.num} id={item.id} email={item.email} admin={item.admin} type={item.type} />
                        ))}
                    </UserLists>
                </UserList>
            </Right>
        </Container>
    )
}
export default Admin;