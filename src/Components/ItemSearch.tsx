import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { searchOpenState } from "../atoms";

const ModalBg=styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:#dfdfdf;
    opacity:0.5;
`;
function ItemSearch(){
    const closeSearch=useSetRecoilState(searchOpenState);
    return (
        <>
            <ModalBg onClick={()=>closeSearch(false)}></ModalBg>
        </>
    )
}

export default ItemSearch;