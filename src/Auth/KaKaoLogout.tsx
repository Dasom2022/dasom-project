import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KaKaoLogout() {
  const navigate = useNavigate();
  const move = () => {
    navigate("/");
  };

  useEffect(() => {
    move();
  }, []);
  return <>Logout</>;
}
export default KaKaoLogout;
