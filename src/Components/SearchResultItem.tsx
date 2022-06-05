import { useState } from "react";
import styled from "styled-components";

const Item=styled.div`
    height:70px;
    background-color:white;
    display:flex;
    align-items: center;
    padding:0 10px;
    border:1px solid #bbbbbb;
    border-radius:2px;
    margin-bottom:5px;
    & > img{
        width:80px;
        height:62px;
        margin-right:8px;
    }
`;
const ItemInfo=styled.div`
    width:100%;
    height:60px;
    display:flex;
    justify-content:space-between;
    position:relative;
    & > span:first-child{
        font-size:14px;
    }
    & > span:last-child{
        font-weight:bold;
    }
    & > button{
        position:absolute;
        bottom:0;
        right:0;
        border:2px solid white;
        background-color:#9c9c9c;
        color:white;
        padding:2px 5px;
        border-radius:4px;
        box-shadow:0px 5px 3px -3px #dfdfdf;
        cursor:pointer;
    }
`;
function SearchResultItem({name, price}:any){
    const [mapOpen, setMapOpen]=useState(false);
    return (
        <Item>
            <img src={process.env.PUBLIC_URL+"/image/apple.jpg"} />
            <ItemInfo>
                <span>{name}</span>
                <span>{price.toLocaleString()}</span>
                <button onClick={()=>setMapOpen(prev=>!prev)}>{mapOpen?"위치 닫기":"위치 열기"}</button>
            </ItemInfo>
        </Item>
    )
}

export default SearchResultItem;