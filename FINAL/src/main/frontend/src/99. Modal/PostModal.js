import React, { useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import Cookies from 'universal-cookie';
import CustomModal from '../99. Modal/CustomModal'
import SendPostModal from '../99. Modal/SendPostModal'
import './PostModal.css';

const PostModal = (props) => {
  const { open, close, sender, content, senderId } = props;
  console.log("\n>> PostModal : " + open);
  console.log("\n>> PostModal : " + close);

  const cookies = new Cookies();
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const myInfo = cookies.get('rememberMyInfo');
  const myId = myInfo.id


  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "", errorMsg: ""
  });

  const onChangeState = () => {
    setState({...state, open: false, success: false, error: false});
  }
  /* ============================== */
  /* 쪽지 기능 구현 */
  const [receiverId, setReceiverId] = useState("");
  const [inputContent, setInputContent] = useState('');

  const [modalOn, setModalOn] = useState(false);

  const getInputContent = (content) => { setInputContent(content); console.log(content); }
  const openModal = () => { setModalOn(true); };
  const closeModal = () => { setModalOn(false); };


  let sendMessage;

  // const onClickReply = async() => {
  //   console.log("답장하기 버튼 눌렀어요.");

  //   try {
  //     const isMember = await TeamAPI.memberRegCheck(senderId);
  //     console.log(sender + "(" + senderId + ")이 현재 존재하는 회원인지 확인이 필요합니다.");
  //     console.log("isMember.data.result : " + isMember.data);

  //     if(isMember.data === true) {
  //       console.log("쪽지를 보낼 수 있습니다.");
  //       sendMessage = prompt("쪽지 내용을 작성하세요.", "");

  //       if(sendMessage !== null) {
  //         const response = await TeamAPI.sendPost(myId, senderId, sendMessage);
  //         console.log("\n\n보내는 사람(localId) : " + myId);
  //         console.log("받는 사람(modalName) : " + senderId);
  //         console.log("쪽지 내용(sendMessage) : " + sendMessage);
  //         setState({...state, open: true, success: true, successMsg: "쪽지 보내기 성공!"});

  //       } else {
  //         console.log("\n\n!!쪽지 내용 없음!!");
  //         setState({...state, open: true, error: true, errorMsg: "쪽지 내용을 작성하셔야죠..^^"});

  //       } 
  //     /* 탈퇴한 회원이라면 */  
  //     } else {
  //       setState({...state, open: true, error: true, errorMsg: "존재하지 않는(탈퇴한) 회원입니다."});

  //       // alert("쪽지를 삭제하시겠습니까? (구현하면 좋을 듯)");
  //       console.log("쪽지를 보낼 수 없습니다.");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  const onClickReply = async() => {
    console.log("답장하기 버튼 눌렀어요.");

    try {
      const isMember = await TeamAPI.memberRegCheck(senderId);
      console.log(sender + "(" + senderId + ")이 현재 존재하는 회원인지 확인이 필요합니다.");
      console.log("isMember.data.result : " + isMember.data);

      if(isMember.data === true) {
        console.log("쪽지를 보낼 수 있습니다.");
        setModalOn(true);

      /* 탈퇴한 회원이라면 */  
      } else {
        setState({...state, open: true, error: true, errorMsg: "존재하지 않는(탈퇴한) 회원입니다."});

        // alert("쪽지를 삭제하시겠습니까? (구현하면 좋을 듯)");
        console.log("쪽지를 보낼 수 없습니다.");
      }
    } catch (e) { console.log(e); }
  }

  /* 보내기 버튼 클릭 */
  const onSendPost = async(e) => {
    // e.preventDefault();
    try {
      const response = await TeamAPI.sendPost(myId, senderId, inputContent);
      console.log("\n보내는 사람(id) : " + myId);
      console.log("받는 사람(senderId) : " + senderId);
      console.log("쪽지 내용(inputContent) : " + inputContent);

      if(response.status == 200) {
        console.log("통신 성공(200)");
        console.log("\n>> 쪽지 보내기 성공!!");
        setState({...state, open: true, success: true, successMsg: "쪽지가 발송되었습니다."});
      }
      setReceiverId("")
      setInputContent("")
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={open ? 'openPostModal PostModal' : 'PostModal'}>
      {open ? (
        <section>

        {/* header 영역 */}
          <header>
            <h2>쪽지 자세히 보기</h2>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>

        {/* main 영역 */}
          <main>
            <div className="PostModal-Form-item">
              <label className="form-label">보낸 사람</label>
              <input type="text" className="PostModal-Form-control" value={sender} readOnly/>
            </div>

            <div className="PostModal-Form-item">
              <label className="form-label">쪽지 내용</label>
              <textarea className="PostModal-Form-control textarea" value={content} readOnly/>
            </div>
          </main>

        {/* footer 영역 */}
          <footer>
            {/* <button className="close" onClick={close}>
              닫기
            </button> */}
            <button type="button" onClick={onClickReply}>
              답장하기
            </button>
          </footer>

        </section>
      ) : null}
      <SendPostModal open={modalOn} close={closeModal} receiver={sender} getInputContent={getInputContent} onSendPost={onSendPost}/>
      <CustomModal state={state} changeState={onChangeState}/>
    </div>
    // </>
  );
}

export default PostModal;