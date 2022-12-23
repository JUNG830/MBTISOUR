import { useState, useEffect } from "react";
import TeamAPI from '../0. API/TeamAPI';
import Cookies from 'universal-cookie';
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import moment from 'moment';
import './Home.css';
import { useNavigate } from "react-router-dom";


const Home = () => {

  const cookies = new Cookies();
  
  const localId = cookies.get('rememberId');
  const myInfo = cookies.get('rememberMyInfo');
  const myNickname = myInfo.nickname
  const myRegistrationDate = myInfo.registrationDate

  const localId_num = window.sessionStorage.getItem("id_num");
  const kakaoId_num = window.sessionStorage.getItem("kakaoId_num");
  const kakaoNickname = window.sessionStorage.getItem("kakaoNickname");
  const kakaoId = window.sessionStorage.getItem("kakaoId");
  const kakaoEmail = window.sessionStorage.getItem("kakaoEmail");
  const [friend, setFriend] = useState("");
  const [registrationDate, setRegistrationDate] = useState('');
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();

  console.log(cookies.get('rememberMyInfo'));

  useEffect(() => {
    if (localId === undefined) navigate("/login");
    // ▲ 로그인 안 되어 있으면 로그인 페이지로 

    const memberData = async () => {
      try {
        const response = await TeamAPI.memberInfo(localId); // 원래는 전체 회원 조회용
        cookies.set('rememberMyInfo', response.data);
        console.log(cookies.get('rememberMyInfo'));

      } catch (e) {
        console.log(e);
      }
    };
    memberData();
  }, []);

  const date = moment().format("YYYY.MM.DD HH:mm:ss");
  const Dday = moment(date).diff(myRegistrationDate, 'day');

  return (
    <div className="Container">
      <div className="Home-Container">
        
        <div className="WelcomeMessage">
          <h2><span style={{ color: "navy", fontWeight: "bold" }}>{myNickname}</span> 님과 MBTISOUR는 오늘, <span style={{ color: 'red', fontWeight: 'bold' }}>{Dday + 1}일</span></h2>
          {/* <h3>새로운 쪽지가 있습니다!</h3> */}
        </div>

        <div className="Dino">
          <iframe className="DinoAddr" src="https://chromedino.com/" type="text/css" frameborder="0" scrolling="no" width="100%" height="100%" loading="lazy"></iframe>
        </div>
        <div className="DinoStartMessage">
          <p>게임을 시작하려면 spacebar를 누르세요</p>
        </div>
        <div className="DinoStartMessage_mobile">
          <p>게임을 시작하려면 Dino를 터치하세요</p>
        </div>

      </div>
    </div>
  );
}

export default Home;