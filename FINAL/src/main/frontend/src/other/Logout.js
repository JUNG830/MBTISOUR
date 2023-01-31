import Cookies from 'universal-cookie';
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Logout() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const onClickLogout = () => {
    // await updateDoc(doc(db, "users", cookies.get('rememberId')), {
    //   isOnline: false,
    // });
    cookies.remove('rememberId');
    cookies.remove('rememberEmail');
    cookies.remove('rememberMyInfo');
    
    window.sessionStorage.setItem("id", '');
    window.sessionStorage.setItem("kakaoId_num", '');
    window.sessionStorage.setItem("nickname", '');
    window.sessionStorage.setItem("kakaoNickname", '');
    window.sessionStorage.setItem("kakaoEmail",'');

    navigate("/");
  }

  return (
    <a> 
        <h id="logout" onClick={onClickLogout}>로그아웃</h>
    </a>
  );
}

export default Logout;