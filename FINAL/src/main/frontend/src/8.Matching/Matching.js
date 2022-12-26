import React, { useState, useEffect } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import SendPostModal from '../99. Modal/SendPostModal';
import SmsIcon from '@mui/icons-material/Sms';
import { IconButton } from '@mui/material';
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import face from '../images/기본 프로필.png'
import Cookies from 'universal-cookie';
import '../0. API/defultMain.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavigateNextIcon from '@mui/icons-material/ArrowBackIosNew';
import './Matching.css';
import { useNavigate } from 'react-router-dom';
import SadIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';


const Matching = () => {
  const cookies = new Cookies();
  const nav = useNavigate();
  
  const localMyInfo = cookies.get('rememberMyInfo');
  const localId = localMyInfo.id;
  const localId_num = localMyInfo.idNum;
  const [url, setUrl] = useState(null);
  const [myId, setMyId] = useState('');
  const [id_num, setId_num] = useState('');
  const [myFace, setMyFace] = useState('');
  const [myNickname, setMyNickname] = useState('');
  const [myMbti, setMyMbti] = useState('');
  const [myIntroduce, setMyIntroduce] = useState('');
  const [myInfo, setMyInfo] = useState('');
  const [mat_memberInfo, setMat_MemberInfo] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [cnt, setCnt] = useState();


  // 페이지 이동
  const onChangeNext = () => {
    setPageNum(pageNum + 1);
    console.log("pageNum : " + pageNum);
  }

  const onChangePrev = () => {
    setPageNum(pageNum - 1);
    console.log("pageNum : " + pageNum);
  }



  // 내 정보 조회 
  useEffect(() => {
    const userData = async () => {
      console.log("\n>> 내정보 조회(useEffect)");
      console.log("\n\n현재 cookies 에 저장된 ID : " + localId);

      try {
        const response = await TeamAPI.memberInfo(localId); 
        console.log(response.data);
        setMyInfo(response.data);
        setId_num(response.data.idNum);
        setMyId(response.data.id);
        setMyFace(response.data.face);
        setMyNickname(response.data.nickname);
        setMyMbti(response.data.mbti);
        setMyIntroduce(response.data.introduce);

      } catch (e) {
        console.log(e);
      }
    };
    userData();
  }, []);


  // 매칭 회원 정보 조회
  useEffect(() => {
    if(localId === undefined) nav("/login");
  // ▲ 로그인 안 되어 있으면 로그인 페이지로
    const memberData = async () => {
 
      try {  
        const Mat = await TeamAPI.MatchingMember2(localId, localId_num, pageNum);
        console.log("****************");
        setMat_MemberInfo(Mat.data);
        console.log(Mat.data);
        // 마지막 페이지 찾기
        const cnt = Number(Mat.data[0].cnt);
        setCnt(Math.ceil(cnt / 2));
        console.log("matIdNum : ", Mat.data[0].mat_id_num);
        console.log("like_member_idx : ", Mat.data[0].like_member_idx);
      } catch (e) {
        console.log(e);
      }
    };
  memberData();
  }, [pageNum]);

  // 좋아요
  const [btnActive, setBtnActive] = useState("");
  const [like, setLike] = useState(0);

  useEffect(() => {
    const onClickLike = async (LikeIdNum) => {
      console.log("LikeIdNum :", LikeIdNum);
      try {
        const likeData = await TeamAPI.likeMember(localId_num, LikeIdNum);
        // 좋아요: 1
        // 좋아요 취소: 2
        // 아무것도 수행 안됨: 0
        console.log("%%%%% 좋아요 전송");
        console.log(likeData.data);
        console.log(LikeIdNum);
        if (likeData.data === 1) {
          // setColor('red-btn');
          document.getElementById(LikeIdNum).style.color='orange';
          // setBtnActive(LikeIdNum);
        } else if (likeData.data === 2) {
          // setColor('');
          document.getElementById(LikeIdNum).style.color='green';
          // setBtnActive('');
        } else {
          console.log("좋아요 오류");
        }
      } catch (e) {
        console.log(e);
      }
    };
    onClickLike();
  }, []);
  
 // 채팅하기 onClick
 const user1 = localId;

 const onClickChat = async (matfriend) => {
  const user2 = matfriend;
  const sodaRef = doc(db, "users", user1);
  try {
    await updateDoc(sodaRef, {
      friends: arrayUnion(user2)
    });
  } catch (e) {
    console.log(e);
  }
  nav("/chathome")
  };

  /* MBTI 검사하기 */
  const onClickTestStart = () => {
    nav("/MBTI");
  }

  /* 쪽지 기능 구현 */
  const [receiverId, setReceiverId] = useState("");
  const [receiverNickname, setReceiverNickname] = useState("");
  const [inputContent, setInputContent] = useState('');
  const [modalOn, setModalOn] = useState(false);
  const getInputContent = (content) => { setInputContent(content); }
  const openModal = () => { setModalOn(true); };
  const closeModal = () => { setModalOn(false); };

  const onClickPostIcon = (receiverId, receiverNickname) => {
    setReceiverId(receiverId);
    setReceiverNickname(receiverNickname);
    setModalOn(true);
  };

  /* 보내기 버튼 클릭 */
  const onSendPost = async(e) => {
    // e.preventDefault();
    try {
      const response = await TeamAPI.sendPost(myId, receiverId, inputContent);

      if(response.status == 200) {
        alert("쪽지 보내기 성공!!");
        closeModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='Container'>
      <div className='Matching-Container' >
       <SendPostModal open={modalOn} close={closeModal} receiver={receiverNickname} getInputContent={getInputContent} onSendPost={onSendPost}/>
        
        <div className='User-Box'>
          <div className='User-profile'>
            {myFace != null 
            ? <img src={myFace} alt="프로필 이미지"/>
            : <img src={face} alt="프로필 이미지"/> }
          </div>
          <div className="User-item">
            <input type="text" value={myMbti} disabled/>
            <textarea type="text" value={myNickname} disabled/>
          </div>
          <div className="User-item">
              <textarea className='User-Introduce' type="text" value={myIntroduce} disabled/>
          </div>
        </div>

        { (myMbti === null ) ?
        <div className='Matching-Message'>
          <p>아직 MBTI 검사를 하지 않았어요!</p>
          <button className='mbti-btn' onClick={onClickTestStart}>검사하러가기</button>
        </div>

        : (mat_memberInfo.length != 0 ) ?

          mat_memberInfo.map((mat, index) => (
          <div className='mat-cont'>
            <div className='Mat-Box' key={mat.id}>
              <div className='Mat-profile'>
                <img src={mat.mat_face || face} alt="프로필 이미지" />
              </div>
              <div className="Mat-item">
                <input value={mat.mat_mbti} disabled/>
                <textarea value={mat.mat_nick} disabled/>
              </div>
              <div className="Mat-item">
                <textarea className='Mat-Introduce' type="text" value={mat.mat_introduce} />
              </div>
            </div> 
            <div className='Mat-icon'>
           
                <IconButton>
                {/* {`${like === mat.mat_id_num ? color : mat.like_member_idx === 'Y' ? 'red-btn' : ''}`} */}
                {mat.like_member_idx}
                {/* {like} */}
                <FavoriteIcon className='' id={mat.mat_id_num} style = {{fontSize: 'xx-large', backgroundColor: 'unset', color : mat.like_member_idx === 'N' ? 'blue' : 'red'}} onClick={()=>onClickLike(mat.mat_id_num)}/>
                {/* <FavoriteIcon className={index == btnActive ? "red-btn" :  mat.like_member_idx === 'Y' ? 'red-btn' : ''} value={index} style = {{fontSize: 'xx-large', backgroundColor: 'unset'}} onClick={()=>onClickLike(mat.mat_id_num)}/> */}
                {mat.mat_id_num}
                </IconButton>
                <IconButton>
                  <SmsIcon className='Chat-icon' style = {{fontSize: 'xx-large'}} onClick={()=>onClickChat(mat.mat_id)}/>
                </IconButton>
                <IconButton>
                  <EmailIcon className='Post-icon' style = {{fontSize: 'xx-large'}} onClick={()=>onClickPostIcon(mat.mat_id, mat.mat_nick)}/>
                </IconButton>
            </div>
          </div>
          ))

          : <div className='Matching-Message'> 아쉽지만, 매칭된 친구가 없어요 <SadIcon style = {{fontSize: 'xx-large'}}/> </div>
          }

        <div className='page-btn1'>
          <IconButton className='prevbtn' style={{backgroundColor: 'unset'}} onClick={onChangePrev} disabled={(pageNum === 1) ? true : false }>
            <ArrowBackIosNewIcon  style = {{fontSize: 'xx-large'}} />   
          </IconButton>
        {/* </div>

        <div className='page-btn2'> */}
          <IconButton className='nextbtn' style={{backgroundColor: 'unset'}} onClick={onChangeNext} disabled={(pageNum === (( mat_memberInfo.length === 0 ) ? 1 : cnt)) ? true : false }>
            <NavigateNextIcon style = {{transform: 'rotate(180deg)',  fontSize: 'xx-large'}} />
          </IconButton>           

        </div>

      </div>
    </div>
  )
}

export default Matching;
