import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { searchOpenState } from "../atoms";
import SearchResultItem from "./SearchResultItem";


const Modal=styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%);
    border:1px solid #5a5a5a;
    border-radius:4px;
    width:70%;
    height:75%;
    background-color:#dfdfdf;
    padding:10px 10px;

`;
const Header=styled.div`
    height:50px;
    display:flex;
    align-items: center;
`;
const BackBtn=styled.div`
    border:2px solid #bbbbbb;
    width:40px;
    height:40px;
    display:flex;
    align-items: center;
    justify-content: center;
    box-shadow:0px 3px 3px -2px #bbbbbb;
    margin-right:20px;
    background-color: white;
    cursor:pointer;
    & > svg{
        width:25px;
        fill:#bbbbbb;
    }
`;
const Search=styled.form`
    width:calc(100% - 50px);
    position:relative;
   & > svg{
       width:20px;
       fill:#31a737;
       position:absolute;
       top:50%;
       right:0;
       transform:translateY(-50%) translateX(-50%);
   }
   & > input{
       width:100%;
       height:35px;
       box-sizing: border-box;
       outline:none;
       border:2px solid #bbbbbb;
       border-radius:5px;
       padding-left:10px;
   }
`;

const Items=styled.div`
    margin-top:5px; 
    height:calc(100% - 55px);
    overflow:scroll;
    ::-webkit-scrollbar{
        display:none;
    }
`;

const imsi=[
{name:"남양유업 이오 요구르트, 80ml, 10개입", price:3960, where:"c-4"},
{name:"남양유업 이오 요구르트, 80ml, 10개입", price:3960, where:"a-2"},
{name:"남양유업 이오 요구르트, 80ml, 10개입", price:3960, where:"d-2"},
{name:"남양유업 이오 요구르트, 80ml, 10개입", price:3960, where:"b-6"},
{name:"남양유업 이오 요구르트, 80ml, 10개입", price:3960, where:"d-1"},
{name:"남양유업 이오 요구르트, 80ml, 10개입", price:3960, where:"a-7"},
{name:"남양유업 이오 요구르트, 80ml, 10개입", price:3960, where:"c-8"}];
function ItemSearch(){
    const closeSearch=useSetRecoilState(searchOpenState);
    const [search, setSearch]=useState("");
    return (
        <>
            <Modal>
                <Header>
                    <BackBtn onClick={()=>closeSearch(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>
                    </BackBtn>
                    <Search>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
                        <input value={search} onChange={(e)=>setSearch(e.target.value)} />
                    </Search>
                </Header>
                <Items>
                    {imsi.filter((item)=>item.name.includes(search)).map((item, index)=><SearchResultItem key={index} name={item.name} price={item.price} where={item.where} index={index} />)}
                </Items>
            </Modal>
        </>
    )
}

export default ItemSearch;