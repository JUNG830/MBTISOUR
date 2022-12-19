import React, { useState } from 'react'
import TeamAPI from '../0. API/TeamAPI';
import Cookies from 'universal-cookie';
import {MatchingPostModal} from '../99. Modal/MatchingPostModal';
import 조혜경 from '../images/조혜경.png'
import 이동균 from '../images/이동균.png'
import 이민형 from '../images/이민형.png'
import 전규한 from '../images/전규한.png'
import 우혜정 from '../images/우혜정.png'
import './AboutUs.css'

import CallIcon from '@mui/icons-material/Call';

function AboutUs() {
  const cookies = new Cookies();
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const MyInfo = cookies.get('rememberMyInfo');
  const myId = MyInfo.id;

  /* 쪽지 기능 구현 */
  const [receiverId, setReceiverId] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [inputContent, setInputContent] = useState('');

  const [modalOn, setModalOn] = useState(false);

  const getInputContent = (content) => { setInputContent(content); }
  const openModal = () => { setModalOn(true); };
  const closeModal = () => { setModalOn(false); };

  const onClickPostIcon = (receiverId, receiverNickname) => {
    alert("쪽지보내실?");
    console.log("\n>> 쪽지 아이콘 눌렀어요.");

    setReceiverId(receiverId);
    console.log("받는 사람 ID(receiverId) : " + receiverId);
    setReceiverNickname(receiverNickname);
    console.log("받는 사람 닉네임(receiverNickname) : " + receiverNickname);

    setModalOn(true);
  };

  /* 보내기 버튼 클릭 */
  const onSendPost = async(e) => {
    // e.preventDefault();
    try {
      const response = await TeamAPI.sendPost(myId, receiverId, inputContent);
      console.log("\n보내는 사람(id) : " + myId);
      console.log("받는 사람(receiverId) : " + receiverId);
      console.log("쪽지 내용(inputContent) : " + inputContent);

      if(response.status == 200) {
        console.log("통신 성공(200)");
        console.log("\n>> 쪽지 보내기 성공!!");
        alert("쪽지 보내기 성공!!");
        closeModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='Container'>
      <div className='Middle-Container'>
        <div className='AboutUs-Container'>
          <div className='AboutUs-header'>
            <h1>About Us</h1>
          </div>
          <div className='AboutUs-main'>
            <div className='OurInfo'>
              <img src={우혜정} alt="face"/>
              <h4>우혜정</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />              
              <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("kkongkkong", "손이시려워")}>mail</span>
            </div>
            <div className='OurInfo'>
              <img src={조혜경} alt="face"/>
              <h4>조혜경</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("9lovejhk", "개발자조혜경")}>mail</span>
            </div>
            <div className='OurInfo'>
              <img src={전규한} alt="face"/>
              <h4>전규한</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("", "")}>mail</span>
            </div>
            <div className='OurInfo'>
              <img src={이민형} alt="face"/>
              <h4>이민형</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("", "")}>mail</span>
            </div>
            <div className='OurInfo'>
              <img src={이동균} alt="face"/>
              <h4>이동균</h4>
              <h6>Backend / Frontend</h6>
              <CallIcon />
              <span class="material-symbols-outlined" onClick={()=>onClickPostIcon("", "")}>mail</span>
            </div>
          </div>
          <MatchingPostModal open={modalOn} close={closeModal} receiver={receiverNickname} getInputContent={getInputContent} onSendPost={onSendPost}/>
        </div>
      </div>
    </div>
  )
}

export default AboutUs