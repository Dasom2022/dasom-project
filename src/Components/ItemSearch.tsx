import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { searchOpenState } from "../atoms";

const ModalBg=styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:black;
    opacity:0.5;
`;
const Modal=styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%);
    border:1px solid black;
    border-radius:10px;
    width:700px;
    height:600px;
    background-color:#dfdfdf;
`;
const InputForm=styled.div`
    position:relative;
    margin:0 auto;
    width:80%;
    & > svg{
        width:25px;
        position:absolute;
        top:50%;
        left:0;
        transform:translateY(-50%);
    }
`;
const Input=styled.input`
    width:100%;
    box-sizing:border-box;
    height:45px;
    font-size:20px;
    border:none;
    border-bottom:1px solid black;
    background-color:transparent;
    outline:none;
    padding-left:35px;
`;
const ItemList=styled.ul`
    width:80%;
    margin:0 auto;
    margin-top:10px;
    height:90%;
    &, & > li{
        list-style:none;
        padding:0;
    }
`;
const Item=styled.li`
    display:flex;
    margin-bottom:5px;
    & > img{
        width:100px;
        margin-right:5px;
    }
    & > span:last-child{
        margin-left:45px;
    }
`;
function ItemSearch(){
    const closeSearch=useSetRecoilState(searchOpenState);
    const [searchData, setSearchData]=useState("");
    const navigate=useNavigate();
    const imsiData=[{
        id:"1",
        title:"[원스위크라이프] 모음전 캠핑 의자 테이블 웨건 테이블 선반 박스",
        price:"28,000",
        itemImg:`${process.env.PUBLIC_URL}/image/apple.jpg`
    },{
        id:"2",
        title:"로티캠프 캐노피 원터치텐트 3-4인용 캠핑 테이블 의자 캠핑용품 모음전",
        price:"28,000",
        itemImg:`${process.env.PUBLIC_URL}/image/apple.jpg`
    },{
        id:"3",
        title:"[줄리샵] 50% 봄 신상 파격세일 원피스/트레이닝세트외",
        price:"28,000",
        itemImg:`${process.env.PUBLIC_URL}/image/apple.jpg`
    }]
    return (
        <>
            <ModalBg onClick={()=>closeSearch(false)}></ModalBg>
            <Modal>
                <InputForm>
                    <Input value={searchData} onChange={(e)=>{setSearchData(e.currentTarget.value)}}></Input>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
                </InputForm>
                <ItemList>
                    {imsiData.filter((item)=>item.title.includes(searchData)).map((item)=>(
                        <Item key={item.id} onClick={()=>navigate("/DAMA/main/"+item.id)}>
                            <img src={item.itemImg} />
                            <span>{item.title}</span>
                            <span>{item.price}</span>
                        </Item>
                    ))}
                </ItemList>
            </Modal>
        </>
    )
}

export default ItemSearch;