import { useState, useEffect } from 'react';
import TeamAPI from '../0. API/TeamAPI';
import hangjungdong from '../other/hangjungdong';
import face from '../images/기본 프로필.png'
import { ChangePwdModal } from '../99. Modal/ChangePwdModal';
import { UnregisterModal } from '../99. Modal/UnregisterModal';
import CustomModal from '../99. Modal/CustomModal'
import '../5. MyPage/MyPage.css';
import '../0. API/defultMain.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// 파이어베이스 설치 ☞ yarn add firebase
import { storage, db } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, updateDoc } from "firebase/firestore";
//쿠키
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
  

const regexNickName = /^[가-힣]{2,7}$/;
const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const MyPage = () => {
  const cookies = new Cookies();
  const localId = cookies.get('rememberId');
  const myInfo = cookies.get('rememberMyInfo');
  const myId = myInfo.id
  const nav = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    loading: false,
    id: "",
    nickname: "",
    friends: [],
  });



  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "회원가입 성공", errorMsg: "입력된 값을 확인하세요!"
  });

  const onChangeState = () => {
    setState({...state, open: false, success: false, error: false});
  }
  /* ============================== */



  const session_id = window.sessionStorage.getItem("id");
  console.log(myId);
  const localIdNum = window.sessionStorage.getItem("id_num");
  const localNickname = window.sessionStorage.getItem("nickname");

  const [isEmail, setIsEmail] = useState('');
  const [changePwdModalOpen, setChangePwdModalOpen] = useState(false);
  const [unregisterModalOpen, setUnregisterModalOpen] = useState(false);

  const [memberInfo, setMemberInfo] = useState(""); // 현재 로그인 되어 있는 회원의 정보 저장용
  
  // 이름, 아이디, 비밀번호, 비밀번호 확인, 생년월일, 나이, 성별, 주소 1, 주소 2
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [inputPwd, setInputPwd] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const { sido, sigugun } = hangjungdong;
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [mbti, setMbti] = useState("");
  const [keySido, setKeySido] = useState("");
  const [nicknameBefore, setNicknameBefore] = useState("");
  const [introduceBefore, setIntroduceBefore] = useState("");
  const [emailBefore, setEmailBefore] = useState("");


  const [isNicknamecheck, setIsNicknamecheck] = useState(false);

  // 변경 여부 변수 선언
  const [isCheckedNickname, setIsCheckedNickname] = useState(true);
  const [isChangeNickname, setIsChangeNickname] = useState(false);
  const [isChangeIntroduce, setIsChangeIntroduce] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [isSetImage, setIsSetImage] = useState(false);
  
  /* 
  최초 통신(useEffect) */
  useEffect(() => {
    const myId = cookies.get('rememberId');
    //  if(myId === undefined) window.location.replace("/login");
    // ▲ 로그인 안 되어 있으면 로그인 페이지로 


    const memberData = async () => {
      console.log("\n>> 회원 정보 조회(useEffect)");
      console.log("myId : " + session_id);
      try {
        const response = await TeamAPI.memberInfo(myId); // 회원 정보 조회
        if(response.status == 200) {
          console.log("통신 성공(200)");
          const member = response.data;
          setMemberInfo(member);
          console.log(member)
          console.log("------------------");

          // 프사, 이름, 아이디, 생년월일, 성별, MBTI, 비밀번호, 닉네임, 자기소개, 이메일, 주소
          setUrl(member.face);
          setName(member.name);
          setId(member.id);
          setBirth(member.birth);
          setGender(member.gender);
          setMbti(member.mbti);
          setPwd(member.pwd);
          setNickname(member.nickname);
          setIntroduce(member.introduce);
          setEmail(member.email);
          setRegion1(member.region1);
          setRegion2(member.region2);
          setNicknameBefore(member.nickname);
          setIntroduceBefore(member.introduce);
          setEmailBefore(member.email);
          console.log("기존 회원 정보 가져오기 완료")
        } else {
          console.log("통신 실패(" + response.status + ")");
        }
      } catch (e) {
        console.log(e);
      }
    };
  memberData();
  }, []);

  // 프사 변경 및 미리보기
  const onChangeFace = (e) => {
    const temp_face = e.target.files[0];
    const preview = URL.createObjectURL(temp_face);
    console.log("==============================");
    console.log("preview : " + preview);
    console.log(temp_face);
    console.log("==============================");
    setUrl(temp_face);
    if(temp_face) {
      setImage(temp_face);
    }

    const imageRef = ref(storage, `profile/${myId}`);

    uploadBytes(imageRef, temp_face).then(() => {
      getDownloadURL(imageRef).then(async(url) => {
        console.log("\nURL : " + url);
        setUrl(url);

        await updateDoc(doc(db, "users", myId), {
          profile: url,
        });
      /* ----- (시작) 통신 ----- */
        try {
          const response = await TeamAPI.changeFace(url, myId);
          console.log(response.data.result);
          const response2 = await TeamAPI.memberInfo(localId); // 원래는 전체 회원 조회용
          setImage(response.data.result)
          if(response.status == 200) {
            console.log("통신 성공(200)");
            // alert("프사 저장 성공");
            setState({...state, open: true, success: true, successMsg: "프사 저장 성공"});
            cookies.set('rememberMyInfo', response2.data, {
              path: '/',
              expires: 0
            })

          } else {
            console.log("\n>> 통신 실패 : " + response.status);
            // alert("통신 실패 : " + response.status);
            setState({...state, open: true, error: true, errorMsg: "통신 실패 : " + response.status});

          }
        } catch (e) {
          console.log(e);
          console.log("캐치 !! 이미지 url 저장 실패..");
        } // try-catch 문의 끝
      /* ----- (끝) 통신 ----- */

      }).catch((error) => {
        console.log(error.message, "error getting the image url");
      });
      setImage(null);
    }).catch((error) => {
      console.log(error.message);
    });

    console.log("순서가 이상한 URL : " + url);
  };

  // 프사 삭제 버튼
  const onDeleteFace = async() => {
    console.log("\n>> onDeleteFace 실행");
    if(url === null) alert("삭제할 프사가 없습니다.")
    else {
      const temp_url = null;
      setUrl(temp_url);

      try {
        const response = await TeamAPI.changeFace(temp_url, myId);
        console.log(response.data.result);

        if(response.status == 200) {
          console.log("통신 성공(200)");
          // alert("프사 삭제 성공");
          setState({...state, open: true, success: true, successMsg: "프사 삭제 성공"});

          setIsSetImage(false);
        } else {
          console.log("\n>> 통신 실패 : " + response.status);
          // alert("통신 실패 : " + response.status);
          setState({...state, open: true, error: true, errorMsg: "통신 실패 : " + response.status});

        }

      } catch (e) {
        console.log(e);
        console.log("캐치 !! 이미지 url 저장 실패..");
      }

    } // if-else 문의 끝
  }

  /**
▶ 변경 가능 항목(비밀번호, 닉네임, 자기소개, 이메일, 주소) 
  */

 /* 비밀번호 저장 */
  const getPwd = (pwd) => { setPwd(pwd); }
  const openChangePwdModal = () => { setChangePwdModalOpen(true); };
  const closeChangePwdModal = () => { setChangePwdModalOpen(false); };
  const onSavePwd = async(e) => { 
    console.log("변경한 pwd :" + pwd);
    console.log("변경한 e :" + e);

      // e.preventDefault();

      try {
        const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);

        if(response.status == 200) {
          console.log("통신 성공(200)");
          console.log("\n>> 비밀번호 수정 완료");
          // alert("비밀번호 수정 완료!!");
          setState({...state, open: true, success: true, successMsg: "비밀번호 수정 완료!!"});

        } 
      } catch (e) { console.log(e); }

  }

  /* 닉네임 변경 */
  const onChangeNickname = e => { 
    let temp_nickname = e.target.value;
    setNickname(temp_nickname); 
  }

  /* 닉네임 중복확인 버튼 클릭 */
  const onClickNicknameCheck = async (e) => {
    e.preventDefault();
    setIsNicknamecheck(false);
    console.log("\n>> 닉네임 중복확인 버튼 눌렀어요.");

    if (nickname === '' || !regexNickName.test(nickname)) {
      console.log("닉네임을 입력하지 않았거나 정규식에 맞지 않아요.");
      setState({...state, open: true, error: true, errorMsg: "먼저, 닉네임을 확인하세요."});
    } else {
      try {
        const nicknameCheck = await TeamAPI.nicknameCheck(nickname);
        console.log("nicknameCheck.data : " + nicknameCheck.data);
        console.log("nicknameCheck.status : " + nicknameCheck.status);

        // if(memberCheck.data.result === true) {
        if (nicknameCheck.data === true) {
          setNickname("");
          setState({...state, open: true, error: true, errorMsg: "사용할 수 없는 닉네임 입니다."});
          console.log("사용할 수 없는 닉네임 입니다.");
        } else {
          console.log("사용 가능한 닉네임 입니다.");
          setIsNicknamecheck(true);
          setState({...state, open: true, success: true, successMsg: "사용 가능한 닉네임 입니다."});
          
          setIsCheckedNickname(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  
    /* 닉네임 변경 취소 */
  const cancelNickname = () => {
      setIsChangeNickname(false);
      setNickname(nicknameBefore);
  }



  /* 닉네임 저장 */
  const onSaveNickname = async(e) => {
    console.log("\n>> 닉네임 저장 버튼 눌렀어요.");
    if(!isNicknamecheck) {
      // alert("닉네임을 다시 확인하거나 중복확인이 필요합니다.")
      setState({...state, open: true, error: true, errorMsg: "닉네임을 다시 확인하거나 중복확인이 필요합니다."});

      return;
    }

    e.preventDefault();
    setNickname(nickname);
    setIsChangeNickname(false);

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
      console.log("id : " + id);
      console.log("password : " + pwd);
      console.log("nickname : " + nickname);
      console.log("introduce : " + introduce);
      console.log("email : " + email);
      console.log("region1 : " + region1);
      console.log("region2 : " + region2);
      const response2 = await TeamAPI.memberInfo(localId); // 원래는 전체 회원 조회용
      setNickname(response.data.nickname)

      if(response.status == 200) {
        console.log("통신 성공(200)");
        console.log("\n>> 닉네임 수정 완료");
        // alert("닉네임 수정 완료!!");
        setState({...state, open: true, success: true, successMsg: "닉네임 수정 완료!!"});
        cookies.set('rememberMyInfo', response2.data, {
          path: '/',
          expires: 0
        })
        
        updateDoc(doc(db, "users", id), {
          nickname
        });
        
        
      } 

    } catch (e) { console.log(e); }
  } 
  
  /* 자기소개 변경 취소 */
  const cancelIntroduce = () => {
    setIsChangeIntroduce(false);
    setIntroduce(introduceBefore);
  }

  /* 자기소개 변경 */
  const onChangeIntroduce = e => { 
    let temp_introduce = e.target.value;
    setIntroduce(temp_introduce); 
  }

  /* 자기소개 저장 */
  const onSaveIntroduce = async(e) => {
    e.preventDefault();
    setIntroduce(introduce);
    setIsChangeIntroduce(false);
    console.log("\n>> 자기소개 저장 버튼 눌렀어요.");

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          console.log("\n>> 자기소개 수정 완료");
          // alert("자기소개 수정 완료!!");
          setState({...state, open: true, success: true, successMsg: "자기소개 수정 완료!!"});

      } 

    } catch (e) { console.log(e); }
  } 

  /* 이메일 변경 */
  const onChangeEmail = e => { 
    
    let temp_email = e.target.value;
    setEmail(temp_email); 
    if (temp_email === '' || !regexEmail.test(temp_email)) {
      setIsEmail(false);

  
    } else {
      setIsEmail(true);

    }
  }



   /* 이메일 변경 취소 */
   const cancelEmail = () => { 
    setIsChangeEmail(false);
    setEmail(emailBefore);
  }

  const OnclickRepairNickname = () =>{
    setIsChangeNickname(true);
    setIsNicknamecheck(false);
    setIsCheckedNickname(true);
  }


  

  /* 이메일 저장 */
  const onSaveEmail = async(e) => {
    e.preventDefault();
    setEmail(email);
    setIsChangeEmail(false);
    console.log("\n>> 이메일 저장 버튼 눌렀어요.");

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          console.log("\n>> 이메일 수정 완료");
          // alert("이메일 수정 완료!!");
          setState({...state, open: true, success: true, successMsg: "이메일 수정 완료!!"});
          updateDoc(doc(db, "users", id), {
            email
          });
      } 

    } catch (e) { console.log(e); }
  }

  /* 주소 ☞ 시도 변경 */
  const onChangeRegion1 = (e) => {

    let temp_region1 = e.target.value;
    console.log("\n시도선택 : " + temp_region1); // 서울특별시
    setRegion1(temp_region1);

    const indexSido = sido.findIndex(e => e.codeNm === temp_region1);

    let temp_keySido = sido.at(indexSido).sido;
    setKeySido(temp_keySido);
  };

  /* 주소 ☞ 시구군 변경 */
  const onChangeRegion2 = (e) => {

    let temp_region2 = e.target.value;
    console.log("\n시/구/군선택 : " + temp_region2);
    setRegion2(temp_region2);
  }

  /* 주소 저장 */
  const onSaveAddress = async(e) => {
    setRegion1(region1);
    setRegion2(region2);
    setIsChangeAddress(false);
    console.log("\n>> 주소 저장 버튼 눌렀어요.");

    try {
      const response = await TeamAPI.memberUpdate(id, pwd, nickname, introduce, email, region1, region2);
        console.log("id : " + id);
        console.log("password : " + pwd);
        console.log("nickname : " + nickname);
        console.log("introduce : " + introduce);
        console.log("email : " + email);
        console.log("region1 : " + region1);
        console.log("region2 : " + region2);
        if(response.status == 200) {
          console.log("통신 성공(200)");
          console.log("\n>> 주소 수정 완료");
          // alert("주소 수정 완료!!");
          setState({...state, open: true, success: true, successMsg: "주소 수정 완료!!"});

      } 

    } catch (e) { console.log(e); }
  }

  /* MBTI 검사하기 */
  const onClickTestStart = () => {
    console.log("\n>> 검사하기 버튼 눌렀어요.");
    // alert("콘솔 확인하세요.")
    nav("/MBTI");
  }

  /* 탈퇴하기 */
  const getInputPwd = (pwd) => { setInputPwd(pwd); }
  const openUnregisterModal = () => { setUnregisterModalOpen(true); };
  const closeUnregisterModal = () => { setUnregisterModalOpen(false); };
  const onDeleteMember = async(e) => {
    console.log("입력한 비밀번호(inputPwd) : " + inputPwd);

    const recheck = "해당 아이디로 재가입이 불가능합니다."
                  + "\n탈퇴시 모든 정보가 삭제되며 복구가 어렵습니다."
                  + "\n정말로 탈퇴하시겠습니까?"
    let recheckResult = window.confirm(recheck);
    console.log("\n>> 최종 탈퇴 여부 : " + recheckResult);

    if(recheckResult) {
      try {
        const response = await TeamAPI.memberDelete(myId, inputPwd);
        console.log("response.data : " + response.data);
  
        // if(res.data.result === "OK") {
        if(response.data === true) {
          console.log("통신 성공(200)");
          console.log("\n회원 탈퇴 성공");
          window.localStorage.setItem("userId", "");
          window.localStorage.setItem("userPw", "");
          window.localStorage.setItem("isLogin", "FALSE");
          closeUnregisterModal();
          // alert("회원 탈퇴 성공");
          setState({...state, open: true, success: true, successMsg: "회원 탈퇴 성공"});

          window.location.replace("/");
        } else {
          // alert("비밀번호를 확인하세요.");
          setState({...state, open: true, error: true, errorMsg: "비밀번호를 확인하세요."});

        }
      } catch (e) {
        // alert("오류 발생!!");
        setState({...state, open: true, error: true, errorMsg: "오류 발생!!"});

        console.log("탈퇴 에러!! 왜 또 안 될까..?");
      }
    } else {
      console.log("\n>> 탈퇴하기를 취소합니다.");
    }
  };
  
  return(
    <div className='Container'>
      <div className='Middle-Container'>
        <div className='Mypage-Container'>
          <div className='Mypage-box'>
            <CustomModal state={state} changeState={onChangeState}/>
            <ChangePwdModal open={changePwdModalOpen} close={closeChangePwdModal} getPwd={getPwd} onSavePwd={onSavePwd} />
            <UnregisterModal open={unregisterModalOpen} close={closeUnregisterModal} id={id} getInputPwd={getInputPwd} onDeleteMember={onDeleteMember} />
            <div className='MyPage-header'>
              <h1>마이페이지</h1>
            </div>
            <div className="profile_container">
              <div className="img_container">
                <img src={url || face} alt="avatar" />
                <div className="overlay">
                  <label htmlFor="photo">
                    <CameraAltIcon style={{fontSize: "2rem", cursor: "pointer"}}/>
                  </label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: "none" }} 
                    id="photo" 
                    onChange={onChangeFace} 
                    />
                  {url ? <DeleteForeverIcon style={{fontSize: "2rem", cursor: "pointer"}} onClick={onDeleteFace}/> : null}
                </div>
              </div>
            </div>

            {/* MyPage-Table 영역 */}
            <table action="" className="MyPage-Table">
              <tr className="Form-item">
                <div className="Form-Name">
                  <span>이름</span>
                </div>
                <div className='mypage-input'>
                  <input className='inputBox' type="text" value={name} disabled />
                </div>
                <div className='s' />
              </tr>


              <tr className="Form-item">
                <div className="Form-Name">
                  <span>아이디</span>
                </div>
                <div className='mypage-input'>
                  <input className='inputBox' type="text" value={id} disabled />
                </div>
                <div className='s'></div>
              </tr>


              <tr className="Form-item">
                <div className="Form-Name">
                  <span>생년월일</span>
                </div>
                <div className='mypage-input'>
                  <input className='inputBox' type="text" value={birth} disabled />
                </div>
                <div className='s'></div>
              </tr>


              <tr className="Form-item">
                <div className="Form-Name">
                  <span>성별</span>
                </div>
                <div className='mypage-input'>
                  <input className='inputBox' type="text" value={gender} disabled />
                </div>
                <div className='s' />
              </tr>


              <tr className="Form-item">
                <div className="Form-Name">
                  <span>MBTI</span>
                </div>
                <div className='mypage-input'>
                  {mbti ? <input className='inputBox' type="text" value={mbti} />
                : <button className='Mypage-examine' onClick={onClickTestStart}>검사하기</button>}
                </div>
                <div className='s' />
              </tr>

              {/* 비밀번호 */}
              <tr className="Form-item">
                <div className="Form-Name">
                  <span>비밀번호</span>
                </div>
                <div className='mypage-input'>
                  <input className='inputBox' type="password" value={pwd} />
                </div>
                <button className='mypage-btn' onClick={openChangePwdModal}>수정</button>
              </tr>


              {/* 닉네임 */}
              <tr className="Form-item">
                <div className="Form-Name">
                  <span>닉네임</span>
                </div>
                {!isChangeNickname ?
                <>
                  <div className='mypage-input'>
                    <input className='inputBox' disabled={onChangeNickname ? true : false} type="text" value={nickname} />
                  </div>
                  <button className='mypage-btn'  onClick={OnclickRepairNickname}>수정</button>
                </>
                :
                <>
                  <div className='mypage-input'>
                    <input className='inputBox ' disabled={isNicknamecheck ? true : false} type="text" onChange={onChangeNickname} />
                  </div>
                  <div>
                    {isCheckedNickname &&
                      <button className='mypage-btn-nick'  onClick={onClickNicknameCheck} >중복확인</button>}
                    {isCheckedNickname &&
                      <button className='mypage-btn-nick2' onClick={cancelNickname}>취소</button>}
                    {isNicknamecheck &&
                      <button className='mypage-btn-nick' onClick={onSaveNickname}>저장</button>}
                    {isNicknamecheck &&
                      <button className='mypage-btn-nick2' onClick={cancelNickname}>취소</button>}
                  </div>
                </>
                }
              </tr>


              {/* 자기소개 */}
              <tr className="Form-item">
                <div className="Form-Name">
                  <span>자기소개</span>
                </div>

                {!isChangeIntroduce ?
                <>
                  <div className='mypage-input'>
                    <input className='inputBox' type="text" value={introduce} />
                  </div>
                  <button className='mypage-btn' onClick={e => setIsChangeIntroduce(true)}>수정</button>
                </>
                :
                <>
                  <div className='mypage-input'>
                    <input className='inputBox' type="text" onChange={onChangeIntroduce} />
                  </div>
                  <button className='mypage-btn-int1' onClick={onSaveIntroduce}>저장</button>
                  <button className='mypage-btn-int2' onClick={cancelIntroduce}>취소</button>
                </>
                }
              </tr>


              {/* 이메일 */}
              <tr className="Form-item">
                <div className="Form-Name">
                  <span>이메일</span>
                </div>
                {!isChangeEmail ?
                <>
                  <div className='mypage-input'>
                    <input className='inputBox' type="mail" value={email} />
                  </div>
                  <button className='mypage-btn' onClick={e => setIsChangeEmail(true)}>수정</button>
                </>
                :
                <>
                  <div className='mypage-input'>
                    <input className='inputBox' type="mail" onChange={onChangeEmail} />
                  </div>
                  {isEmail &&
                  <button className='mypage-btn-ema1' onClick={onSaveEmail}>저장</button>}
                  <button className='mypage-btn-ema2' onClick={cancelEmail}>취소</button>
                </>
                }
              </tr>


              {/* 주소 */}
              {isChangeAddress ?
              <tr className="Form-item">
                <div className="Form-Name">
                  <span>주소</span>
                </div>
                <div className='mypage-input'>
                  <select className='mypage-input-select1' onChange={onChangeRegion1}>
                    <option disabled selected>시도선택</option>
                    {sido.map((e) => (
                    <option key={e.sido} value={e.codeNm}>
                      {e.codeNm}
                    </option>
                    ))}
                  </select>
                  <select className='mypage-input-select2' onChange={onChangeRegion2}>
                    <option disabled selected>시/구/군선택</option>
                  {sigugun
                    .filter((e) => e.sido === keySido)
                    .map((e) => (
                      <option key={e.sigugun} value={e.codeNm}>
                        {e.codeNm}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button className='mypage-btn-select' onClick={onSaveAddress}>저장</button>
                  <button className='mypage-btn-select' onClick={e => setIsChangeAddress(false)}>취소</button>
                </div>
              </tr>
              : 
              <div>
                <tr className="Form-item">
                  <div className="Form-Name">
                    <span>주소</span>
                  </div>
                  <div className='mypage-input'>
                    <input className='mypage-input-addr1' type="text" value={region1} />
                    <input className='mypage-input-addr2' type="text" value={region2} />
                  </div>
                  <button className='mypage-btn-addr' onClick={e => setIsChangeAddress(true)}>수정</button>
                </tr>
              </div>
              }
            </table>

            <div className="Mypage-leave">
              <button className='Mypage-leave-btn' onClick={openUnregisterModal}>탈퇴하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;