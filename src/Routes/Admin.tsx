import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AppendItem from "../Components/AppendItem";
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
            font-size:18px;
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
    width:800px;
    border-bottom:1px solid #dfdfdf;
    padding:10px 15px !important;
    box-sizing: border-box;
    font-size:14px;
    color:#dfdfdf;
    font-weight:bold;
    flex-wrap: wrap;
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
        width:800px;
        border-bottom:1px solid #dfdfdf;
    }
    & > li:last-child::after{
        display:none;
    }
`;
const ItemList=styled.div`
    background-color:white;
    border:2px solid #dfdfdf;
    position:relative;
    & > button{
        position:absolute;
        right:0;
        transform:translateY(50%);
        border:none;
        background-color:#01b9ff;
        padding: 5px 10px;
        border-radius:5px;
        cursor: pointer;
    }
    & > div:first-child{
        padding:10px 15px;
    }
    & > table{
        border-collapse: collapse;
        button{
            background-color:#01b9ff;
            border:none;
            border-radius:5px;
            margin-right:5px;
            cursor: pointer;
            padding:5px 10px;
        }
        th, td{
            border-bottom:1px solid #dfdfdf;
            padding:15px 0;
            text-align: left;
            padding-right:40px;
        }
        th:first-child, td:first-child{
            padding-left:20px;
        }
        th{
            color:#dfdfdf;
        }
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
const itemList=[
    {
        num:0,
        name:"휠체어",
        price:319400,
        code:"1042",
        category:"편의 제품"
    },{
        num:1,
        name:"동양미래대학교 졸업장",
        price:100,
        code:"4444",
        category:"장식"
    },{
        num:2,
        name:"과자",
        price:2000,
        code:"5320",
        category:"식품"
    }
]
function Admin(){
    const {category:params}=useParams<string>();
    const navigate=useNavigate();
    const [modalOpen, setModalOpen]=useState(false);
    return (
        <Container>
            <List category={params||"user"}>
                <li onClick={()=>navigate("/DAMA/admin/user")}>전체 사용자</li><li onClick={()=>navigate("/DAMA/admin/product")}>상품 관리</li>
            </List>
            <Right>
                <div>
                    <input type="text" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
                </div>
                {params=="user"?(
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
                ):(
                    <ItemList>
                        <div>전체 아이템 개</div>
                        <table >
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>제품명</th>
                                    <th>제품 가격</th>
                                    <th>제품 코드</th>
                                    <th>카테고리</th>
                                    <th>편집</th>
                                </tr>
                            </thead>
                            <tbody>
                            {itemList.map((item)=>(
                                <tr key={item.num}>
                                    <td>{item.num}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.code}</td>
                                    <td>{item.category}</td>
                                    <td><button>수정</button><button>삭제</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button onClick={()=>setModalOpen(true)}>상품등록</button>
                    </ItemList>
                )}
            </Right>
            {modalOpen&&<AppendItem closer={setModalOpen} />}
        </Container>
    )
}
export default Admin;