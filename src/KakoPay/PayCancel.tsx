import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PayCancel() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/main");
  }, []);
  return <div>결제 취소</div>;
}

export default PayCancel;
