import React, { useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import Cookies from 'universal-cookie';
import CustomModal from '../99. Modal/CustomModal'
import './PostModal.css';

const PostModal = (props) => {
  const { open, close, sender, content, senderId } = props;
  console.log("\n>> PostModal : " + open);

  const cookies = new Cookies();
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const localId = cookies.get('rememberId');


  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "", errorMsg: ""
  });

  const onChangeState = () => {
    setState({...state, open: false, success: false, error: false});
  }
  /* ============================== */

  let sendMessage;

  const onKeyUpContent = (e) => {
    // console.log("\n>> onKeyUpContent 실행");
    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.style);

    // let scHeight = e.target.scrollHeight;
    // console.log(scHeight);
    // e.target.style = scHeight;
    // console.log(e.target.style);
  }
 

  const onClickReply = async() => {
    console.log("답장하기 버튼 눌렀어요.");

    try {
      const isMember = await TeamAPI.memberRegCheck(senderId);
      console.log(sender + "(" + senderId + ")이 현재 존재하는 회원인지 확인이 필요합니다.");
      console.log("isMember.data.result : " + isMember.data);

      if(isMember.data === true) {
        console.log("쪽지를 보낼 수 있습니다.");
        sendMessage = prompt("쪽지 내용을 작성하세요.", "");

        if(sendMessage !== null) {
          const response = await TeamAPI.sendPost(localId, senderId, sendMessage);
          console.log("\n\n보내는 사람(localId) : " + localId);
          console.log("받는 사람(modalName) : " + senderId);
          console.log("쪽지 내용(sendMessage) : " + sendMessage);
          setState({...state, open: true, success: true, successMsg: "쪽지 보내기 성공!"});

        } else {
          console.log("\n\n!!쪽지 내용 없음!!");
          setState({...state, open: true, error: true, errorMsg: "쪽지 내용을 작성하셔야죠..^^"});

        } 
      /* 탈퇴한 회원이라면 */  
      } else {
        setState({...state, open: true, error: true, errorMsg: "존재하지 않는(탈퇴한) 회원입니다."});

        alert("쪽지를 삭제하시겠습니까? (구현하면 좋을 듯)");
        console.log("쪽지를 보낼 수 없습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={open ? 'openPostModal PostModal' : 'PostModal'}>
      <CustomModal state={state} changeState={onChangeState}/>

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
              <textarea className="PostModal-Form-control textarea" value={content} 
                onFocus={onKeyUpContent} readOnly/>
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
    </div>
    // </>
  );
}

export default PostModal;