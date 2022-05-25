import styled from "styled-components";

interface IProps{
        num:number,
        id:string,
        email:string,
        admin:string,
        type:string,
}
const Container=styled.li`
    &, ul, li{
        list-style: none;
        margin:0;
        padding:0;
    }
    & > ul{
        display:flex;
        button{
            background-color:#01b9ff;
            border:none;
            border-radius:5px;
            margin-right:5px;
            cursor: pointer;
            padding:5px 10px;
        }
    padding:15px 15px !important;
    }
`;
function User(props:IProps){
    return (
        <Container>
            <ul>
                <li style={{width:"60px"}}>{props.num}</li>
                <li style={{width:"170px"}}>{props.id}</li>
                <li style={{width:"220px"}}>{props.email}</li>
                <li style={{width:"120px"}}>{props.admin}</li>
                <li style={{width:"100px"}}>{props.type}</li>
                <li><button>수정</button><button>삭제</button></li>
            </ul>
        </Container>
    )
}
export default User;