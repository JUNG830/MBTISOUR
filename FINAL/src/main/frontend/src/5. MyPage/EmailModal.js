import React, { useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import CustomModal from '../99. Modal/CustomModal'
import '../2. Login/EmailModal.css';

const EmailModal = ({ open, show, onHide, modalName, modalContent }) => {
    
  /* ===== CustomModal 에 필요 ===== */
  const [state, setState] = useState({
    open: false, success: false, error: false,
    successMsg: "", errorMsg: ""
  });

  const onChangeState = () => {
    setState({...state, open: false, success: false, error: false});
  }
  /* ============================== */

    const [code, setCode] = useState("");

    const onChangeCode = e => {
        setCode(e.target.value);
    };

    const onClickClose = () => {
        onHide();
    }

    const onClickReply = async (e) => {
        e.preventDefault();
        console.log("답장하기 버튼 눌렀어요.");
        console.log(code);
        if (code !== null) {
            const emailConfirm = await TeamAPI.emailCode(code);
            console.log(emailConfirm);
            console.log(emailConfirm.data);
            // alert("코드 보내기 성공!!");
            if (emailConfirm.data === 1) {
                setState({...state, open: true, success: true, successMsg: "이메일 인증이 완료되었습니다."});
                
                setTimeout(function(){
                    onHide();
                },1000) 
               
            } else {
                setState({...state, open: true, error: true, errorMsg: "인증코드가 일치하지 않습니다. 다시 입력해주세요."});
                setCode("");
            }
        } else {
            console.log("\n\n!!코드내용없음!!");
            setState({...state, open: true, error: true, errorMsg: "인증코드를 입력해주세요."});
        }
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>

            {open ? (<section>
                <header>
                    {"이메일 인증"}
                    <button className="close" onClick={onClickClose}>
                        &times;
                    </button>
                </header>
                <main>
                    <form>
                        <div>
                            <label>인증받을 이메일</label>
                            <input placeholder={modalName} disabled></input>
                        </div>
                        <div className="emailmodal-second-inputdiv">
                            <label>인증 코드 입력 창</label>
                            <input placeholder="인증 코드를 입력해주세요." value={code} onChange={onChangeCode} required ></input>
                        </div>
                    </form>
                </main>
                <footer>
                    <button onClick={onClickReply}>
                        인증하기
                    </button>
                    <button className="close" onClick={onClickClose}>
                        close
                    </button>
                </footer>
            </section>
            ) : null}
            <CustomModal state={state} changeState={onChangeState}/>
        </div>
    )
}

export default EmailModal;
