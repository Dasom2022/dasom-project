import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IProps{
    closer:Dispatch<SetStateAction<boolean>>
}
const ModalBg=styled.div`
    width:100%;
    height:100vh;
    background-color: rgba(0,0,0,0.2);
    position:absolute;
    top:0;
    left:0;
`;
const Modal=styled.div`
    box-sizing: border-box;
    padding:15px 25px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%);
    width:800px;
    height:600px;
    background-color: white;
    display:flex;
    justify-content: center;
`;
const ItemImg=styled.div`
    & > div:first-child{
        width:500px;
        height:300px;
        background-color:#dfdfdf;
        position:relative;
        input {
            position:absolute;
            bottom:0;
            left:0;
        }
        svg{
            width:70px;
            position:absolute;
            top:50%;
            left:50%;
            transform:translateX(-50%) translateY(-50%);
        }
    }
`
const ItemInfo=styled.form`
    display:flex;
    flex-direction: column;
    margin-top:20px;
    & > input{
        width:500px;
        height:30px;
        border:none;
        border-bottom:1px solid #dfdfdf;
        outline:none;
        padding:5px 0;
        ::placeholder{
            font-weight: bold;
            font-size:16px;
        }
    }
`;
const Btns=styled.div`
    position:absolute;
    bottom:10px;
    left:50%;
    transform:translateX(-50%);
    width:150px;
    display:flex;
    justify-content: space-between;
`;
const AppendBtn=styled.button`
    padding:10px 20px;
    color:white;
    background-color: #01b9ff;
    border:none;
    border-radius:5px;
    cursor: pointer;
`;
function AppendItem({closer}:IProps){
    return (
        <>
            <ModalBg onClick={()=>closer(false)} />
            <Modal>
                <ItemImg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 32H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48H528c26.51 0 48-21.49 48-48v-256C576 53.49 554.5 32 528 32zM223.1 96c17.68 0 32 14.33 32 32S241.7 160 223.1 160c-17.67 0-32-14.33-32-32S206.3 96 223.1 96zM494.1 311.6C491.3 316.8 485.9 320 480 320H192c-6.023 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.332-16.68l70-96C252.1 194.4 256.9 192 262 192c5.111 0 9.916 2.441 12.93 6.574l22.35 30.66l62.74-94.11C362.1 130.7 367.1 128 373.3 128c5.348 0 10.34 2.672 13.31 7.125l106.7 160C496.6 300 496.9 306.3 494.1 311.6zM456 432H120c-39.7 0-72-32.3-72-72v-240C48 106.8 37.25 96 24 96S0 106.8 0 120v240C0 426.2 53.83 480 120 480h336c13.25 0 24-10.75 24-24S469.3 432 456 432z"/></svg>
                        <input type="file" />
                    </div>
                    <ItemInfo>
                        <input type="text" placeholder="상품명" />
                        <input type="text" placeholder="가격" />
                        <input type="text" placeholder="카테고리" />
                        <input type="text" placeholder="코드" />
                    </ItemInfo>
                </ItemImg>
                <Btns><AppendBtn>등록</AppendBtn><AppendBtn>취소</AppendBtn></Btns>
            </Modal>
        </>
    );
}
export default AppendItem;