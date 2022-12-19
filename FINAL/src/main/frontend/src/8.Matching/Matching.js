import React, { useState, useEffect } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import { MatchingPostModal } from '../99. Modal/MatchingPostModal';
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
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
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
  const [rnum, setRnum] = useState();



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
  const nav = useNavigate();
  useEffect(() => {
    if(localId === undefined) nav("/login");
    // ▲ 로그인 안 되어 있으면 로그인 페이지로

    const memberData = async () => {
      console.log("\n>> 매칭 결과 조회(useEffect)");
      // const id = localId;
      console.log(">>>>>>>>>>>>>>");
      console.log(typeof(localId));
      console.log(localId);
      console.log(localId_num);
      console.log(pageNum);

      try {
        const Mat = await TeamAPI.MatchingMember2(localId, localId_num, pageNum);
        console.log("****************");
        console.log(Mat.data);
        console.log(Mat.data[0].mat_id);
        console.log("****************");
        setMat_MemberInfo(Mat.data);
        // 마지막 페이지 찾기
        const Rnum = Number(Mat.data[0].r_NUM);
        console.log(typeof(Rnum));
        // console.log(Rnum);
        // console.log(Math.ceil(Rnum / 2));
        setRnum(Math.ceil(Rnum / 2));
        console.log("1", Mat.data);
        console.log("matIdNum : ", Mat.data[0].mat_id_num);
        console.log("matFace : ", Mat.data[0].mat_face);
        console.log("matNick : ", Mat.data[0].mat_nick);
        console.log("r_NUM : ", Rnum);
      } catch (e) {
        console.log(e);
      }
    };
  memberData();
  }, [pageNum]);

  // 좋아요
  const [like, setLike] = useState(false);
  // state = { isClicked: false };
  // const { isClicked } = this.state;

  const handleBookmark = () => {
    setLike(!like);
  }

  const onClickLike = async (idx, LikeIdNum) => {
    console.log("LikeIdNum :", LikeIdNum);
    console.log("index :", idx);
    setLike(!like);
    
    try {
      const likeData = await TeamAPI.likeMember(localId_num, LikeIdNum);
      console.log("%%%%% 좋아요 전송");
      console.log(likeData.data);
      // this.setState({ isClicked: !this.state.isClicked });
            
      if (likeData.data === 1) {

        // document.getElementsById(`${LikeIdNum}`).style.color = 'red';
      } else {
        // document.getElementsById({LikeIdNum}).style.color = 'unset';
      }

    } catch (e) {
      console.log(e);
    }
  }
  
 // 채팅하기 onClick
 const user1 = localId;
 console.log("user1 :",user1)

 const onClickChat = async (matfriend) => {
  console.log(matfriend);
   console.log("친구 아이디", matfriend);
   console.log("내 아이디", myId);

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
    console.log("\n>> 검사하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
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
      <div className='Matching-Container' >
        <MatchingPostModal open={modalOn} close={closeModal} receiver={receiverNickname} getInputContent={getInputContent} onSendPost={onSendPost}/>
        
        <div className='User-Box'>
          <div className='User-profile'>
            {myFace != null 
            ? <img src={myFace} alt="프로필 이미지"/>
            : <img src={face} alt="프로필 이미지"/> }
          </div>
          <div className="User-item">
            <input type="text" value={myMbti} />
            <textarea type="text" value={myNickname} />
          </div>
          <div className="User-item">
              <textarea className='User-Introduce' type="text" value={myIntroduce} />
          </div>
        </div>

        { (myMbti == null ) ?

        <div className='Matching-Message'>
          <p>MBTI 검사를 아직 하지 않았어요!</p>
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
                <input value={mat.mat_mbti} />
                <textarea value={mat.mat_nick} />
              </div>
              <div className="Mat-item">
                <textarea className='Mat-Introduce' type="text" value={mat.mat_introduce} />
              {/* { like_num === 0 ?
                  <img src={Click} onClick={Click_like} value={mat.mat_id_num} style={{width: 30}}/>
                  : <img src={unClick} onClick={UnClick_like} value={mat.mat_id_num} style={{width: 25}} />   
              } */}
              </div>
            </div> 
            <div className='Mat-icon'>
              {/* <ButtonGroup  style={{float:'left', backgroundColor: 'unset'}}> */}
                <IconButton>
                  <FavoriteIcon className='Like-icon' style = {{fontSize: 'xx-large', backgroundColor: 'unset', color:like ? 'red': 'unset'}} onClick={()=>onClickLike(index, mat.mat_id_num)}/>
                </IconButton>
                <IconButton>
                  <SmsIcon className='Chat-icon' style = {{fontSize: 'xx-large'}} onClick={()=>onClickChat(mat.mat_id)}/>
                </IconButton>
                <IconButton>
                  <EmailIcon className='Post-icon' style = {{fontSize: 'xx-large'}} onClick={()=>onClickPostIcon(mat.mat_id, mat.mat_nick)}/>
                </IconButton>
              {/* </ButtonGroup> */}
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
          <IconButton className='nextbtn' style={{backgroundColor: 'unset'}} onClick={onChangeNext} disabled={(pageNum === (( mat_memberInfo.length === 0 ) ? 1 : rnum)) ? true : false }>
            <NavigateNextIcon style = {{transform: 'rotate(180deg)',  fontSize: 'xx-large'}} />
          </IconButton>           

        </div>

      </div>
    </div>
  )
}

export default Matching;
