import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  & > svg {
    width: 30px;
    fill: #bbbbbb;
  }
  & > span {
    color: #bbbbbb;
    font-weight: bold;
  }
`;
const Search = styled.div`
  background-color: #bbbbbb;
  border-radius: 5px;
  height: 42px;
  display: flex;
  align-items: center;
  & > svg {
    position: absolute;
    width: 20px;
    transform: translateX(50%);
    fill: #388e3c;
  }
  & > form {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    & > input {
      width: calc(100% - 40px);
      box-sizing: border-box;
      height: 30px;
      border-radius: 5px;
      outline: none;
      border: 1px solid #bbbbbb;
    }
  }
`;

const ItemList = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 20px;
  height: calc(100% - 130px);
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  &,
  & > li {
    list-style: none;
  }
`;
const ItemInfo = styled.li`
  display: flex;
  justify-content: space-between;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  padding: 10px 15px;
  margin-bottom: 10px;
  & > * {
    overflow: hidden;
  }
`;
const Name = styled.div`
  width: 26%;
`;
const Weight = styled.div`
  width: 11%;
`;
const Code = styled.div`
  width: 11%;
`;
const Price = styled.div`
  width: 11%;
`;
const Locale = styled.div`
  width: 11%;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  & > button {
    background-color: #388e3c;
    color: white;
    padding: 5px 8px;
    border: none;
    border-radius: 4px;
    margin-left: 3px;
    cursor: pointer;
  }
`;
const AddButton = styled.button`
  position: absolute;
  bottom: 2px;
  right: 0;
  background-color: #388e3c;
  color: white;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  margin-left: 3px;
  cursor: pointer;
`;

const Product = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<any>([]);
  useEffect(() => {
    axios
      .get(`/item/itemList?accessToken=${token}`)
      .then((res) => setProduct(res.data));
  }, []);
  return (
    <Container>
      <Head>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M256 48C256 21.49 277.5 0 304 0H592C618.5 0 640 21.49 640 48V464C640 490.5 618.5 512 592 512H381.3C383 506.1 384 501.6 384 496V253.3C402.6 246.7 416 228.9 416 208V176C416 149.5 394.5 128 368 128H256V48zM571.3 347.3C577.6 341.1 577.6 330.9 571.3 324.7L507.3 260.7C501.1 254.4 490.9 254.4 484.7 260.7L420.7 324.7C414.4 330.9 414.4 341.1 420.7 347.3C426.9 353.6 437.1 353.6 443.3 347.3L480 310.6V432C480 440.8 487.2 448 496 448C504.8 448 512 440.8 512 432V310.6L548.7 347.3C554.9 353.6 565.1 353.6 571.3 347.3H571.3zM0 176C0 167.2 7.164 160 16 160H368C376.8 160 384 167.2 384 176V208C384 216.8 376.8 224 368 224H16C7.164 224 0 216.8 0 208V176zM352 480C352 497.7 337.7 512 320 512H64C46.33 512 32 497.7 32 480V256H352V480zM144 320C135.2 320 128 327.2 128 336C128 344.8 135.2 352 144 352H240C248.8 352 256 344.8 256 336C256 327.2 248.8 320 240 320H144z" />
        </svg>
        <span>물품관리</span>
      </Head>
      <Search>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
        </svg>
        <form>
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
      </Search>
      <ItemList>
        {product
          .filter((item: any) => {
            return item.itemName.includes(search);
          })
          .map((item: any) => (
            <ItemInfo key={item.id}>
              <Name>{item.itemName}</Name>
              <Weight>{item.weight}</Weight>
              <Code>{item.itemCode}</Code>
              <Locale>{item.locale}</Locale>
              <Price>{item.price.toLocaleString()}</Price>
              <Buttons>
                <button
                  onClick={() => navigate("/admin/editItem", { state: item })}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    axios
                      .delete(`/item/delete?id=${item.id}&accessToken=${token}`)
                      .then((res) => console.log(res));
                    window.location.reload();
                  }}
                >
                  삭제
                </button>
              </Buttons>
            </ItemInfo>
          ))}
      </ItemList>
      <AddButton onClick={() => navigate("/admin/addItem")}>물품추가</AddButton>
    </Container>
  );
};
export default Product;
