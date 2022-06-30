import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container=styled.div`
    width:80%;
    height:100%;
    overflow:hidden;
    box-sizing: border-box;
    display:flex;
    align-items:center;
`;
const AddForm=styled.form`
    width:100%;
    height:60%;
    display:flex;
    position:relative;
    & > button{
        position:absolute;
        right:0;
        bottom:0;
        transform:translateX(-100%) translateY(100%);
        border:1px solid #bbbbbb;
        background-color:white;
        padding:3px 12px;
        border-radius: 5px;
        box-shadow:1px 1px 5px 0px #bbbbbb;
    }

`;
const Left=styled.div`
    width:50%;
    height:100%;
    position:relative;
    box-sizing: border-box;
    & > img{
        width:100%;
        height:100%;
    }
    & > input{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        opacity:0;
    }
`;
const Right=styled.div`
    width:50%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding-left:20px;
    box-sizing: border-box;
    & > *{
        display:flex;
        padding:10px 0;
        & > div{
            width:100px;
        }
        input{
            border:none;
            outline: none;
            border-bottom:1px solid black;
            margin-left:5px;
            width:100%;
        }
        
    }
`;
interface StateProps{
    state:{
        id: string;
        itemCode: string;
        itemName: string;
        locale: string;
        price: number;
        weight: number;
    }
}
const AddItem=()=>{
    const [imgPath, setImgPath]=useState("");
    const {register, handleSubmit, setValue}=useForm();
    const navigate=useNavigate();
    const config={
        headers:{
            'Content-Type':"application/json"
        }
    };
    const onAdd=(data:any)=>{
        axios.post("/item/register", JSON.stringify({...data}),config).then(res=>navigate("/admin/product"));
    }
    const onEdit=(data:any)=>{
        axios.put("item/UpdateItemState", JSON.stringify({...data}), config).then(res=>console.log(res));

    }
    const {state}=useLocation() as StateProps;
    const param=useParams();
    useEffect(()=>{
        if(param.category=="editItem"){
            setValue("itemName", state.itemName);
            setValue("weight", state.weight);
            setValue("itemCode", state.itemCode);
            setValue("price", state.price);
            setValue("locale", state.locale);
        }
    },[]);
    return (
        <Container>
            <AddForm onSubmit={handleSubmit(onAdd)}>
                <Left>
                    <img src={imgPath==""?process.env.PUBLIC_URL+"/image/default.jpg":process.env.PUBLIC_URL+"/image/"+imgPath.split("\\")[imgPath.split("\\").length-1]} />
                    <input type="file" onChange={(e)=>{setImgPath(e.target.value)}} />
                </Left>
                <Right>
                    <div><div><label>상품명</label></div>:<input {...register("itemName")}  /></div>
                    <div><div><label>무게</label></div>:<input {...register("weight")}  /></div>
                    <div><div><label>코드</label></div>:<input {...register("itemCode")} /></div>
                    <div><div><label>가격</label></div>:<input {...register("price")} /></div>
                    <div><div><label>진열위치</label></div>:<input {...register("locale")} /></div>
                </Right>
                <button>{param.category=="editItem"?"수정하기":"등록하기"}</button>
            </AddForm>
        </Container>
    )
}
export default AddItem;