import styled from "styled-components";
import {useState} from "react";
import ItemSearch from "../Components/ItemSearch"
import { useRecoilState } from "recoil";
import { searchOpenState } from "../atoms";

const Container=styled.div`
    width:100%;
    height:100vh;
    min-width:620px;
`;
const Header=styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color:#31a737;
    height:70px;
    padding: 0 15px;
    color:white;
    & > button{
        background-color: transparent;
        border:2px solid white;
        padding:7px 15px;
        border-radius:22px;
        font-weight:bold;
        font-size:18px;
        color:white;
        box-shadow: 0 4px 4px -4px black;
        cursor: pointer;
    }
`;
const Bottom=styled.div`
    height:70px;
    font-size:27px;
    background-color:#31a737;
    display:flex;
    align-items: center;
    color:white;
    position:relative;
    padding:0 20px;
`;
const Content=styled.div`
    height:calc(100% - 140px);
    overflow:scroll;
    ::-webkit-scrollbar{
        display:none;
    }
`;
const TotalCount=styled.div`
    display:flex;
    width:25%;
    justify-content: space-between;
    & > span:last-child{
        color:red;
    }
`;
const TotalPrice=styled(TotalCount)`
    width:40%;
    margin-left:15px;
    & > span:last-child > span:last-child{
        color:white;
    }
`;
const PayBtn=styled.button`
    background-color: transparent;
    border:2px solid white;
    padding:7px 15px;
    border-radius:22px;
    font-weight:bold;
    font-size:18px;
    color:white;
    box-shadow: 0 4px 4px -4px black;
    position:absolute;
    top:50%;
    right:0;
    transform:translateX(-50%) translateY(-50%);
    cursor: pointer;
`;
const SelectedItem=styled.div`
    height:80px;
    display:flex;
    align-items: center;
    border-bottom:2px solid #bbbbbb;
    & > img{
        width:80px;
        height:64px;
    }
    &:last-child{
        border:none;
    }
`;
const SelectedItemInfo=styled.div`
    height:64px;
    width:100%;
    display:flex;
    padding-top:10px;
    box-sizing: border-box;
    margin-left:10px;
    & > div:first-child{
        width:60%;
    }
    & > div:nth-child(2){
        width:20%;
        margin-left:10px;
    }
    & > div:last-child{
        width:20%;
        font-weight:bold;
    }
`;
const imsi=[{name:"남양유업 이오 요구르트, 80ml, 10개입", count:1, price:3960},
{name:"남양유업 이오 요구르트, 80ml, 10개입", count:1, price:3960},
{name:"남양유업 이오 요구르트, 80ml, 10개입", count:1, price:3960},
{name:"남양유업 이오 요구르트, 80ml, 10개입", count:1, price:3960},
{name:"남양유업 이오 요구르트, 80ml, 10개입", count:1, price:3960},
{name:"남양유업 이오 요구르트, 80ml, 10개입", count:1, price:3960},]
const Main=()=>{
    const [searchOpen, setSearchOpen]=useRecoilState(searchOpenState);
    return (
        <Container>
            <Header>
                <button onClick={()=>{
                    setSearchOpen(true);
                }}>물건 검색</button>
                <span>박진우님 사랑합니다!</span>
            </Header>
            <Content>
                {imsi.map((item,index:any)=>(
                    <SelectedItem key={index}>
                        <img src={process.env.PUBLIC_URL+"/image/apple.jpg"} />
                        <SelectedItemInfo>
                            <div>{item.name}</div>
                            <div>{item.count}</div>
                            <div>{item.price.toLocaleString()}</div>
                        </SelectedItemInfo>
                    </SelectedItem>
                ))}
            </Content>
            <Bottom>
                <TotalCount><span>수량 : </span><span>{14}</span></TotalCount>
                <TotalPrice>
                    <span>구매금액 : </span>
                    <span>
                        <span>{"342,400"}</span><span>원</span>
                    </span>
                </TotalPrice>
                <PayBtn>결제하기</PayBtn>
            </Bottom>
            {searchOpen?<ItemSearch />:null}
        </Container>
    )
}
export default Main;