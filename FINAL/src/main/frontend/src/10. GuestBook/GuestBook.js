import React, { useEffect, useState } from "react";
import TeamAPI from "../0. API/TeamAPI";
import Cookies from 'universal-cookie';
import './GuestBook.css';
import Moment from "react-moment";
import basicFace from '../images/기본 프로필.png'

const GuestBook = () => {
  const cookies = new Cookies();
  const myInfo = cookies.get('rememberMyInfo');
  const myId = myInfo.id
  const myNickname = myInfo.nickname
  const myFace = myInfo.face

  const [inputContent, setInputContent] = useState('');
  const [guestbookList, setGuestbookList] = useState([]);

  const onChangeText = e => {
    let temp_text = e.target.value;
    setInputContent(temp_text);
  }

  const onClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TeamAPI.memberChat(inputContent,"내닉네임길잖아",myFace);
      if(response.data === true) {
        setInputContent('');
        window.location.reload();
      } else {
        alert("통신 실패")
      }
    } catch(e) { console.log(e); }
  }

  useEffect(() => {
    const chatData = async (e) => {
      try {
        const response = await TeamAPI.chatInfo(inputContent); // 원래는 전체 회원 조회용
        if (response.status === 200) {
          setGuestbookList(response.data);
        }
      } catch (e) { console.log(e); }
    };
  chatData();
  }, [inputContent]);
    
  return (
    <div className="Container">
      <div className="GuestBook-Container">

        <div className="GuestBook-header">
          <input className="GuestBook-input" type="text" onChange={onChangeText} />
          <button className ="GuestBook-submit" onClick={onClickSubmit} disabled={inputContent !== ""}>등록</button>
        </div>

        <div className="GuestBook-main">
        {guestbookList.map((gb) => (
          <div className="GuestBook-list" key={gb.id}>
            <img src={gb.face ? gb.face : basicFace} alt="face" className="Guest-face" />
            <div className="Guest-nickname">{gb.nickname}</div>
            <div className="Guest-content">{gb.content}</div>
            <Moment format=" YY.MM.DD" className="Guest-chatTime">{gb.chatTime}</Moment>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default GuestBook;