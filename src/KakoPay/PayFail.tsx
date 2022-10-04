import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PayFail() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/main");
  }, []);
  return <div>결제 실패 관리자에게 문의 주세요. (010-1234-1234)</div>;
}

export default PayFail;
