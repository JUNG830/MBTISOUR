import { useEffect, useState } from "react";
import TeamAPI from "../0. API/TeamAPI";
import Cookies from 'universal-cookie';
import { useNavigate  } from "react-router-dom";
import './GuestBook.css';
import Moment from "react-moment";



const GuestBook = () => {
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [chatInfo,setChatinfo] = useState([]);
    const [isText, setIsText] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [face, setFace] = useState('');

    const kakaoId_num = window.sessionStorage.getItem("kakaoId_num");
    const localId = cookies.get('rememberId');
    const name = cookies.get('nickname');

  
    useEffect(() => {
        // if (localId === undefined) navigate("/login");
    const memberData = async () => {

        try {
          const response = await TeamAPI.memberInfo(localId); // 원래는 전체 회원 조회용
          setNickname(response.data.nickname)
          setFace(response.data.face);
    
        } catch (e) {
        }
      };
      memberData();
    }, []);

    const onChangeText = e => {
        let textShow = e.target.value;

        if(textShow === '') {
            setIsText(false);
        } else {
            setContent(textShow);
            setIsText(true);
        }
    }

    const onClickBTN = async (data) => {
        data.preventDefault();
        try {
            if( isText === true ) {
                const res = await TeamAPI.memberChat(content,nickname,face);
                if(res.data === true) {
                    setContent('');
                    setNickname(name);
                    setFace(face);
                    window.location.reload()
                }else{
                    alert("실패")
                }
               
            } else {
                alert('텍스트를 입력해주세요');
                
            
        } }catch(e) {
            alert("오류")
        }
    }

    useEffect(() => {
        
        const chatData = async (e) => {

          let sentence = content;
         
          try {
            
            const response = await TeamAPI.chatInfo(sentence); // 원래는 전체 회원 조회용
           
            if (response.status === 200) {
            setChatinfo(response.data);
            
        }
          } catch (e) {
          }
        };
        chatData();
 
        }, [content]);
    
    
    return (
        <div className="chat-Container">
            <div className="chat-box1">
            <input className="gsend" disabled='' type="text" onChange={onChangeText}/>
            <button className ="gbtn"  onClick={onClickBTN}>보내기</button>
                <div className="minibox">
                {chatInfo.map((chat) => (
                    <div className="gchat" key={chat.id}>
                            <div className="gchatNum">
                            <img src={chat.face} alt="" style={{ marginTop: "1px",marginLeft:"auto",marginRight:"auto",width: "23px", height: "23px", border:"1px solid" ,borderRadius: "70%", overflow: "hidden", objectFit: "cover"}}/>
                            {chat.nickname}
                            </div>
                            <div className="gcontent">{chat.content}
                            <Moment format=" YYYY.MM.DD HH:mm" className="gchattime">{chat.chatTime}</Moment>
                            </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
    )
}
export default GuestBook;