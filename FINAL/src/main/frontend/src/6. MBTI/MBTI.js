import styled from 'styled-components';
import { useEffect, useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import 논리술사 from '../images/논리술사.png';
import 통솔자 from '../images/통솔자.png';
import 변론가 from '../images/변론가.png';
import 옹호자 from '../images/옹호자.png';
import 중재자 from '../images/중재자.png';
import 선도자 from '../images/선도자.png';
import 활동가 from '../images/활동가.png';
import 현실주의자 from '../images/현실주의자.png';
import 수호자 from '../images/수호자.png';
import 경영자 from '../images/경영자.png';
import 집정관 from '../images/집정관.png';
import 장인 from '../images/장인.png';
import 모험가 from '../images/모험가.png';
import 사업가 from '../images/사업가.png';
import 연예인 from '../images/연예인.png';
import Cookies from 'universal-cookie';
import { VscArrowRight } from "react-icons/vsc";
import { IoPeople, IoPersonAdd } from "react-icons/io5";
import { MdPsychology, MdQuiz } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import '../0. API/defultMain.css';



//스타일 컴포넌트

const Startbtn = styled.button`
  background: #29335c;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  font-family: 'MaplestoryOTFBold';

  color: white;
  padding: 0.3rem;
  width: 300px;
  border-radius: 100px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 25px;
  border: 0px none;
  transition: all .2s ea  se-in-out;
  font-weight: 900;  
  position: relative;
  bottom:0px;

  &:hover{
  cursor: pointer;
  opacity: 0.95;
  transition-duration: .5s;
  text-shadow: 10px 10px 10px rgba(0, 0, 0, 5);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 5); ;
  .arrow{
    transform: translateX(10px);
    transition-duration: .5s;
  }
  }
  &:active{
    transition-duration: .5s;
    transform: translateY(5px);
  }

  .arrow{
    position: relative;
    top:8px;
  }

  p{
    position: relative;
    bottom:5px;
  }

  
  
`

const ObuttonContainer = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  justify-content:center;
  bottom:350px;
  border-bottom: 1px none;
  left :100px;
  box-shadow: 0 4px 4px -4px gray;
  `

const Word1 = styled.span`
  position: relative;
  font-size: 25px;
  width:100px;
  height: 20px;
  color:skyblue;
  right: 445px;
  bottom: 250px;
  font-family: 'MaplestoryOTFBold';

`;
const Word2 = styled.span`
  position: relative;
  font-size: 25px;
  width:100px;
  height: 20px;
  color:orangered;
  bottom: 250px;
  right:100px;
  font-family: 'MaplestoryOTFBold';


`;
const NumContainer = styled.div`
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  position: relative;
  top:170px;
`;
const Num = styled.span`
  color : white;
  position: relative;
  font-size: 0.8em;
  border-radius: 30px;
  background: #003366;
  border: 0;
  display: inline-block;
  width: 200px;
  height: 50px;
  align-items: center;
  display: flex;
  justify-content:center;
  margin: 0 auto;
  font-family: 'MaplestoryOTFBold';
  `;
const OXcontainer = styled.div`
    align-items: center;
    display: flex;
    justify-content:center;
    margin : 0 auto;    
    width: 1180px;
    height: 900px;
    position: relative;
    left: 0;
    z-index: 1;
`;
const QuizContainer = styled.div`

   align-items: center;
  display: flex;
  justify-content:center;
  position: relative;
  
  p{
    position: relative;
    top:350px;
    font-size: 30px;
    font-family: 'MaplestoryOTFBold';
  }
`


const O3 = styled.div`
    
    display: flex;
    width: 110px;
    height: 110px;
    border: 2px solid black;
    border-radius: 100%;
    border-color: skyblue;

    :hover{
      background-color: aqua;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(-20px);
    }

    :active{
      background-color: aqua;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(0px);
    }
    
`;
const X3 = styled.div`
    
    display: flex;
    width: 110px;
    height: 110px;
    border: 2px solid black;
    border-radius: 100%;
    border-color: orangered;
    position: relative;

    :hover{
      background-color: #FF0099;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(-20px);
    }

    :active{
      background-color: #FF0099;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(0px);
    }
  
  
`;
const O2 = styled.div`
    
    display: flex;
    width: 75px;
    height: 75px;
    border: 2px solid black;
    border-radius: 100%;
    border-color: skyblue;
    position: relative;
    top: 19px;
    margin: 0 20px;
    
    :hover{
      background-color: aqua;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(-20px);
    }

    :active{
      background-color: aqua;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(0px);
    }
  
`;
const X2 = styled.div`
     
     display: flex;
    width: 75px;
    height: 75px;
    border: 2px solid black;
    border-radius: 100%;
    border-color: orangered;
    position: relative;
    top:19px;
    margin: 0 20px;


    :hover{
      background-color: #FF0099;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(-20px);
    }

    :active{
      background-color: #FF0099;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(0px);
    }
  
  
`;
const O1 = styled.div`
    
    display: flex;
    width: 40px;
    height: 40px;
    border: 2px solid black;
    border-radius: 100%;
    border-color: skyblue;
    position: relative;
    top:36px;
    margin-right: 10px;

    :hover{
      background-color: aqua;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(-20px);
    }

    :active{
      background-color: aqua;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(0px);
    }
`;
const X1 = styled.div`
  display: flex;
    width: 40px;
    height: 40px;
    border: 2px solid black;
    border-radius: 100%;
    border-color: orangered;
    position: relative;
    top:36px;
    margin-left: 10px;

    :hover{
      background-color: #FF0099;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(-20px);
    }

    :active{
      background-color: #FF0099;
      transition: 0.5s;
      transition-timing-function:ease-in-out;
      transform: translateY(0px);
    }
  
`;
const Recommend = styled.div`
  display: flex;
  width :800px;
  margin: 40px auto 0;
  font-family: 'MaplestoryOTFBold';

`;
const RecommendByOne = styled.div`
  &>a>img{
    width: 100px;
    height: 100px;
    border-radius: 70%;
    overflow: hidden;
    object-fit: cover;
    margin: 0 auto;
    position: relative;
    font-family: 'MaplestoryOTFBold';

  }
  &>p{
    color:#00FFFF;
    font-size: 30px;
    text-align: center;
    position: relative;
    font-weight: 900;
    font-family: 'MaplestoryOTFBold';

  }
  height: 170px;
	width: 170px;
	border-radius: 15px;
	overflow: hidden;
  margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-row: 2/3;
    /* background-color: #6633FF; */
    position: relative;
    padding:20px;
    font-family: 'MaplestoryOTFBold';

    
`;
const ResultContainer = styled.div`
  width :1180px;
  margin : 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const MyMbti = styled.div`
  height: 200px;
	width: 400px;
	border-radius: 15px;
    box-shadow: 0 4px 8px 0 rgba(177, 177, 177, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row: 1/2;
    margin: 0 auto 30px;
    background-color: #29335c;
    font-family: 'MaplestoryOTFBold';


  img{
    width: 120px;
    height: 120px;
    border-radius: 70%;
    overflow: hidden;
    object-fit: cover;
    margin: 15px auto;
  }
  p{
    color:#66FF33;
    font-size: 40px;
    position: relative;
    bottom: 20px;
    font-weight: 900;
    left:13px;
    font-family: 'MaplestoryOTFBold';

  }
  & td{
    min-width: 200px;
    position: relative;
    right: 70px;
    font-family: 'MaplestoryOTFBold';

  }
  & span{
    color:black;
    position: relative;
    bottom:190px;
    left:70px;
    font-family: 'MaplestoryOTFBold';


  }

`
const StyledButton = styled.button`
    background: black;
  color: white;
  padding: 0.5rem;
  width: 500px;
  border-radius: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 25px;
  background-color: skyblue;
  border-color: skyblue;
  transition: all .2s ea  se-in-out;
  font-weight: 900;  
  position: relative;
  margin : 20px auto 0;
  left : 145px;
  bottom: 20px;
  font-family: 'MaplestoryOTFBold';


  &:hover{
  border-color: skyblue;
  font-size:27px;
  cursor: pointer;
  opacity: 0.95;
  transition-duration: .5s;
  
  .arrow{
    transform: translateX(10px);
    transition-duration: .5s;
  }
  }
  &:active{
    transition-duration: .5s;
    transform: translateY(5px);
  }
  
  .arrow{
    position: relative;
    top:5px;
  }
  
  
`

const Mbtiment = styled.div`
  text-align: center;
  font-size: 20px;

`
const Mbtiment2 = styled.div`
  text-align: center;
  color:red;
  font-size: 13px;

`


const Underline = styled.div`
  border-bottom: 2px groove black;
  width:650px;
  margin: 0 auto;
  border-color: rgba(0,0,0,0.2);
`

const Character = styled.div`
  color: whitesmoke;
  font-weight: 900;
  font-size: 1.5em;
  position: relative;
  text-align:center;
  bottom : -30px;
  margin-bottom: 30px;
  font-family: 'MaplestoryOTFBold';

  
`
const StartContainer = styled.div`

  text-align: center;
  
  margin:0px auto 0px;
  border: 0px;
  position: relative;
  
  &>.mbti-person1{
    position: relative;
    bottom: 20px;
    right:20px;
  }
  &>.mbti-person2{
    position: relative;
    bottom: 5px;
  }
  &>.mbti-person3{
    position: relative;
    bottom: 25px;
  }
  &>.mbti-quiz{
    position: relative;
    bottom: -10px;
  }
  &>.mbti-brain{
    position: relative;
    bottom: -10px;
  }

  `
const Mbtiword = styled.p`
    font-size: 60px;
    position: relative;
    right:50px;
    top:30px;
  
    span:nth-of-type(1){
      color:red;
      font-family: 'MaplestoryOTFBold';
      
    }
    span:nth-of-type(2){
      color:orange;
      font-family: 'MaplestoryOTFBold';
    }
    span:nth-of-type(3){
      color:yellowgreen;
      font-family: 'MaplestoryOTFBold';
    }
    span:nth-of-type(4){
      font-family: 'MaplestoryOTFBold';
      color:#CC33FF;
    }
  `
const Container = styled.div`
    box-sizing: border-box;
    width: 1180px;
    margin: 0 auto;
    padding: 0;
`


const Sentence2 = styled.div`
  margin-bottom: 40px;
  font-size: 45px;
  font-family: 'MaplestoryOTFBold';


  & span:nth-of-type(1){
    color: rgba(149,98,123);
  font-family: 'MaplestoryOTFBold';
  
}
& span:nth-of-type(2){
  color: rgba(153,194,108);
  font-family: 'MaplestoryOTFBold';
}
& span:nth-of-type(3){
  color: rgba(113,202,204);
  font-family: 'MaplestoryOTFBold';
}
& span:nth-of-type(4){
  color: rgba(228,199,40);
  font-family: 'MaplestoryOTFBold';
  }
  

  span:nth-of-type(5){
    color:#0000FF;
  }
  &>div{
    margin-bottom: 10px;
  }
  &>p{
    font-family: 'MaplestoryOTFBold';

  }
`

const DetailWord = styled.p`
    text-align: center;
    position: relative;
    bottom: 10px;
`


//퀴즈 컴포넌트
const Quiz = (props) => {
  const navigate = useNavigate();

  const OnclickGetFreind = () => {
    navigate('/matching');
  }


  const cookies = new Cookies();

  const localId = cookies.get('rememberId');
  if (localId === undefined) navigate("/");


  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
  const [EnI, setEnI] = useState(0);
  const [SnN, setSnN] = useState(0);
  const [TnF, setTnF] = useState(0);
  const [JnP, setJnP] = useState(0);



  const [testMBTI, setTestMBTI] = useState("");
  useEffect(() => {
    console.log(EnI);
    console.log(SnN);
    console.log(TnF);
    console.log(JnP);
  }, [EnI, SnN, TnF, JnP]);

  const answerNoList = {
    answer: ["I", "N", "F", "P"]
  };
  const answerYesList = {
    answer: ["E", "S", "T", "J"]
  };

  // 결과 페이지
  if (count === props.questionList.length) {
    if (testMBTI === "ISTJ") {
      return (
        
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istj" target='_blank'>
                  <img src={현실주의자}></img>
                </a>
                <p>{"ISTJ"}</p>
              </td>
              <span>
                <Character>{"#진실한 삶"}</Character>
                <Character>{"#책임감 추구"}</Character>
              </span>
            </MyMbti>
            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>



            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp" target='_blank'>
                  <img src={연예인}></img>
                </a>
                <p>{'ESFP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ESTJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj" target='_blank'>
                  <img src={경영자}></img>
                </a>
                <p>{"ESTJ"}</p>
              </td>
              <span>
                <Character>{"#높은 책임감"}</Character><br />
                <Character>{"#지도력"}</Character>
              </span>
            </MyMbti>
            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>
            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{'INTP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>
                <p>{'ISFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp">
                  <img src={장인}></img>
                </a>
                <p>{'ISTP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>
        </ResultContainer>
      );
    } else if (testMBTI === "ESFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj" target='_blank'>
                  <img src={집정관}></img>
                </a>
                <p>{"ESFJ"}</p>
              </td>
              <span>
                <Character>{"#오랜관계 추구"}</Character>
                <Character>{"#책임감"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>
                <p>{'ISFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp">
                  <img src={장인}></img>
                </a>
                <p>{'ISTP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ISFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj" target='_blank'>
                  <img src={수호자}></img>
                </a>
                <p>{"ISFJ"}</p>
              </td>
              <span>
                <Character>{"#소통 추구"}</Character>
                <Character>{"#충실한 성격"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp" target='_blank'>
                  <img src={연예인}></img>
                </a>
                <p>{'ESFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estp" target='_blank'>
                  <img src={사업가}></img>
                </a>
                <p>{'ESTP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ESTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estp" target='_blank'>
                  <img src={사업가}></img>
                </a>
                <p>{"ESTP"}</p>
              </td>
              <span>
                <Character>{"#높은 관찰력"}</Character>
                <Character>{"#실천 추구"}</Character>
              </span>
            </MyMbti>
            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>



            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj" target='_blank'>
                  <img src={수호자}></img>
                </a>
                <p>{'ISFJ'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ISTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp">
                  <img src={장인}></img>
                </a>
                <p>{"ISTP"}</p>
              </td>
              <span>
                <Character>{"#장인"}</Character>
                <Character>{"#색다름 추구"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj" target='_blank'>
                  <img src={집정관}></img>
                </a>
                <p>{'ESFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj" target='_blank'>
                  <img src={경영자}></img>
                </a>
                <p>{'ESTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ESFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp" target='_blank'>
                  <img src={연예인}></img>
                </a>
                <p>{"ESFP"}</p>
              </td>
              <span>
                <Character>{"#열정적"}</Character>
                <Character>{"#즐거움 추구"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj" target='_blank'>
                  <img src={수호자}></img>
                </a>
                <p>{'ISFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istj" target='_blank'>
                  <img src={현실주의자}></img>
                </a>
                <p>{'ISTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ISFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>
                <p>{"ISFP"}</p>
              </td>
              <span>
                <Character>{"#개방적"}</Character>
                <Character>{"#조화로운 삶"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj" target='_blank'>
                  <img src={집정관}></img>
                </a>
                <p>{'ESFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj" target='_blank'>
                  <img src={경영자}></img>
                </a>
                <p>{'ESTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ENTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp" target='_blank'>
                  <img src={변론가}></img>
                </a>
                <p>{"ENTP"}</p>
              </td>
              <span>
                <Character>{"#규칙파괴자"}</Character>
                <Character>{"#풍부한 지식"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{'INFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj" target='_blank'>
                  <img src={논리술사}></img>
                </a>|
                <p>{'INTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "INTP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{"INTP"}</p>
              </td>
              <span>
                <Character>{"#아이디어 뿜뿜"}</Character>
                <Character>{"#생각많음"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj" target='_blank'>
                  <img src={통솔자}></img>
                </a>
                <p>{'ENTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ENTJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj" target='_blank'>
                  <img src={통솔자}></img>
                </a>
                <p>{"ENTJ"}</p>
              </td>
              <span>
                <Character>{"#목표 갈망"}</Character>
                <Character>{"#현실적"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{'INFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp" target='_blank'>
                  <img src={논리술사}></img>
                </a>
                <p>{'INTP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "INTJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj" target='_blank'>
                  <img src={논리술사}></img>
                </a>|
                <p>{"INTJ"}</p>
              </td>
              <span>
                <Character>{"#개척자정신"}</Character>
                <Character>{"#지적갈망"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp" target='_blank'>
                  <img src={활동가}></img>
                </a>
                <p>{'ENFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp" target='_blank'>
                  <img src={변론가}></img>
                </a>
                <p>{'ENTP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ENFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfj" target='_blank'>
                  <img src={선도자}></img>
                </a>
                <p>{"ENFJ"}</p>
              </td>
              <span>
                <Character>{"#깊은 배려"}</Character>
                <Character>{"#신념 추구"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp" target='_blank'>
                  <img src={중재자} />
                </a>
                <p>{'INFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp" target='_blank'>
                  <img src={모험가}></img>
                </a>|
                <p>{'ISFP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "INFJ") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{"INFJ"}</p>
              </td>
              <span>
                <Character>{"#목적 중시"}</Character>
                <Character>{"#소통 추구"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp" target='_blank'>
                  <img src={활동가}></img>
                </a>
                <p>{'ENFP'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp" target='_blank'>
                  <img src={변론가}></img>
                </a>
                <p>{'ENTP'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "ENFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp" target='_blank'>
                  <img src={활동가}></img>
                </a>
                <p>{"ENFP"}</p>
              </td>
              <span>
                <Character>{"#사교적"}</Character>
                <Character>{"#즐거움 추구"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj" target='_blank'>
                  <img src={옹호자}></img>
                </a>
                <p>{'INFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj" target='_blank'>
                  <img src={논리술사}></img>
                </a>|
                <p>{'INTJ'}</p>
              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>

        </ResultContainer>
      );
    } else if (testMBTI === "INFP") {
      return (
        <ResultContainer>
          <div>
            <MyMbti>
              <td>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp" target='_blank'>
                  <img src={중재자} />
                </a>
                <p>{"INFP"}</p>
              </td>
              <span>
                <Character>{"#공감능력"}</Character>
                <Character>{"#솔직함 추구"}</Character>
              </span>
            </MyMbti>

            <StyledButton onClick={OnclickGetFreind}>
              단짝 친구 찾으러 가기
              <VscArrowRight className="arrow" size={35} />
            </StyledButton>
            <Underline />
            <Mbtiment>{testMBTI}의 단짝 유형</Mbtiment>


            <Recommend>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfj" target='_blank'>
                  <img src={선도자}></img>
                </a>
                <p>{'ENFJ'}</p>
              </RecommendByOne>
              <RecommendByOne>
                <a href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj" target='_blank'>
                  <img src={통솔자}></img>
                </a>

                <p>{'ENTJ'}</p>

              </RecommendByOne>
            </Recommend>
            <Mbtiment2>이미지를 클릭하면 해당 상세페이지로 이동합니다.</Mbtiment2>
          </div>
        </ResultContainer>
      );
    }
  }



  //선택지
  function onClick3Yes1() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);

    console.log(index + ' ' + EnI)
    setEnI(EnI => EnI + 3.1);
    let current = EnI + 3.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동1-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동1-2');
    }
  }
  function onClick2Yes1() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);

    console.log(index + ' ' + EnI)
    setEnI(EnI => EnI + 2.1);
    let current = EnI + 2.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동1-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동1-2');
    }
  }
  function onClick1Yes1() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);

    console.log(index + ' ' + EnI)
    setEnI(EnI => EnI + 1.1);
    let current = EnI + 1.1;
    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동1-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동1-2');
    }
  }

  function onClick1No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI


    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 1.1);
    let current = EnI - 1.1;


    console.log(index + ' ' + EnI + ' ' + index2)

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동2-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동2-2');
    }
  }
  function onClick2No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI


    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 2.1);
    let current = EnI - 2.1;


    console.log(index + ' ' + EnI + ' ' + index2)

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동2-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동2-2');
    }
  }
  function onClick3No1() {

    let index = count2 / 5 - 1;
    let index2 = count / EnI


    setCount(count + 1);
    setCount2(count2 + 1);
    setEnI(EnI - 3.1);
    let current = EnI - 3.1;


    console.log(index + ' ' + EnI + ' ' + index2)

    if (current < 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동2-1');
    } else if (current > 0 && (count2 / 5) === 1) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동2-2');
    }
  }

  function onClick3Yes2() {

    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 3.1);
    let current = SnN + 3.1;



    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동3-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동3-2');
    }
  }
  function onClick2Yes2() {

    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 2.1);
    let current = SnN + 2.1;



    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동3-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동3-2');
    }
  }
  function onClick1Yes2() {

    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN + 1.1);
    let current = SnN + 1.1;



    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동3-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동3-2');
    }
  }

  function onClick1No2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 1.1);
    let current = SnN - 1.1;


    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동4-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동4-2');
    }
  }
  function onClick2No2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 2.1);
    let current = SnN - 2.1;


    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동4-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동4-2');
    }
  }
  function onClick3No2() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setSnN((SnN) => SnN - 3.1);
    let current = SnN - 3.1;


    console.log(index + ' ' + SnN)

    if (current < 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동4-1');
    } else if (current > 0 && (count2 / 5) === 2) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동4-2');
    }
  }
  function onClick3Yes3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 3.1);
    let current = TnF + 3.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동5-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동5-2');
    }
  }
  function onClick2Yes3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 2.1);
    let current = TnF + 2.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동5-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동5-2');
    }
  }
  function onClick1Yes3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF + 1.1);
    let current = TnF + 1.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동5-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동5-2');
    }
  }

  function onClick1No3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 1.1);
    let current = TnF - 1.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동6-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동6-2');
    }

  }
  function onClick2No3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 2.1);
    let current = TnF - 2.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동6-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동6-2');
    }

  }
  function onClick3No3() {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setTnF((TnF) => TnF - 3.1);
    let current = TnF - 3.1;

    console.log(index + ' ' + TnF)

    if (current < 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      console.log('작동6-1');
    } else if (current > 0 && (count2 / 5) === 3) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      console.log('작동6-2');
    }

  }
  const onClick3Yes4 = async (e) => {
    let index = count2 / 5 - 1;


    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 3.1);
    let current = JnP + 3.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick2Yes4 = async (e) => {
    let index = count2 / 5 - 1;


    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 2.1);
    let current = JnP + 2.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick1Yes4 = async (e) => {
    let index = count2 / 5 - 1;


    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP + 1.1);
    let current = JnP + 1.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }

  const onClick1No4 = async (e) => {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 1.1);
    let current = JnP - 1.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick2No4 = async (e) => {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 2.1);
    let current = JnP - 2.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }
  const onClick3No4 = async (e) => {
    let index = count2 / 5 - 1;

    setCount(count + 1);
    setCount2(count2 + 1);
    setJnP((JnP) => JnP - 3.1);
    let current = JnP - 3.1;


    console.log(index + ' ' + JnP)

    if (current < 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerNoList.answer[index]);
      let MBTI = testMBTI + answerNoList.answer[index];
      console.log('작동8-1');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }


    } else if (current > 0 && (count2 / 5) === 4) {
      setTestMBTI(testMBTI + answerYesList.answer[index]);
      let MBTI = testMBTI + answerYesList.answer[index];
      console.log('작동8-2');
      console.log(testMBTI);
      try {
        const res = await TeamAPI.mbtiReg(MBTI, localId);
        console.log("res.data : " + res.data);
        if (res.data === true) {
          alert("저장이 잘 되었는지 확인해봐요.")
        } else {
          alert("아이디 또는 비밀번호를 확인하세요!");
        }
      } catch (e) {
        alert("오류 발생!! 아이디(" + localId + ")랑 비밀번호는 일단 넘어와요.");
        console.log("로그인 에러!! 왜 또 안 될까..?");
      }
    }
  }




  //문제 및 선택지 출력
  return (
    <QuizContainer>
      {props.questionList.map((e, idx) => {
        if (count === idx && idx < 5) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <ObuttonContainer>
                    <O3 onClick={onClick3Yes1}></O3>
                    <O2 onClick={onClick2Yes1}></O2>
                    <O1 onClick={onClick1Yes1}></O1>
                    <X1 onClick={onClick1No1}></X1>
                    <X2 onClick={onClick2No1}></X2>
                    <X3 onClick={onClick3No1}></X3>
                  </ObuttonContainer>
                  <Word1>동의</Word1>
                  <Word2>비동의</Word2>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 10) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <ObuttonContainer>
                    <O3 onClick={onClick3Yes2}></O3>
                    <O2 onClick={onClick2Yes2}></O2>
                    <O1 onClick={onClick1Yes2}></O1>
                    <X1 onClick={onClick1No2}></X1>
                    <X2 onClick={onClick2No2}></X2>
                    <X3 onClick={onClick3No2}></X3>
                  </ObuttonContainer>
                  <Word1>동의</Word1>
                  <Word2>비동의</Word2>
                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 15) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <ObuttonContainer>

                    <O3 onClick={onClick3Yes3}></O3>
                    <O2 onClick={onClick2Yes3}></O2>
                    <O1 onClick={onClick1Yes3}></O1>
                    <X1 onClick={onClick1No3}></X1>
                    <X2 onClick={onClick2No3}></X2>
                    <X3 onClick={onClick3No3}></X3>
                  </ObuttonContainer>
                  <Word1>동의</Word1>
                  <Word2>비동의</Word2>

                </OXcontainer>
              </NumContainer>
            </>
          );
        } else if (count === idx && idx < 20) {
          return (
            <>
              <NumContainer key={idx}>
                <Num>{count + 1}번 문제</Num>
                <p>{e.question}</p>
                <OXcontainer>
                  <ObuttonContainer>
                    <O3 onClick={onClick3Yes4}></O3>
                    <O2 onClick={onClick2Yes4}></O2>
                    <O1 onClick={onClick1Yes4}></O1>
                    <X1 onClick={onClick1No4}></X1>
                    <X2 onClick={onClick2No4}></X2>
                    <X3 onClick={onClick3No4}></X3>
                  </ObuttonContainer>
                  <Word1>동의</Word1>
                  <Word2>비동의</Word2>
                </OXcontainer>
              </NumContainer>
            </>
          );
        }
      })}

    </QuizContainer>
  );
}



const MBTI = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const localId = cookies.get('rememberId');
  if (localId === undefined) navigate("/login");

  const currentId = window.localStorage.getItem("userId");
  const currentPw = window.localStorage.getItem("userPw");

  console.log("\n\n현재 localStorage 에 저장된 ID : " + currentId);
  console.log("\n\n현재 localStorage 에 저장된 PASSWORD : " + currentPw);

  const [states, setStates] = useState({
    mode: 'start',
    questionList: [
      { question: "나는 사교적이며 활동적이다.", check_O: "O", check_X: "X" },
      { question: "나는 사람들과 함께 있을때 에너지를 얻는다.", check_O: "O", check_X: "X" },
      { question: "대인관계를 넓고 다양하게 유지하는 편이다.", check_O: "O", check_X: "X" },
      { question: "글보다는 말로 표현하는 것이 좋다.", check_O: "O", check_X: "X" },
      { question: "생각보다 행동이 앞선다.", check_O: "O", check_X: "X" },
      { question: "나는 오감에 의존한다.", check_O: "O", check_X: "X" },
      { question: "근거없는 예감을 믿지 않는다.", check_O: "O", check_X: "X" },
      { question: "미래에 대한 생각보다는 현재에 집중한다.", check_O: "O", check_X: "X" },
      { question: "간접 경험보다는 직접 행동으로 경험하는 것을 선호한다.", check_O: "O", check_X: "X" },
      { question: "본인이 명확함, 사실, 실용적 등의 단어와 어울린다.", check_O: "O", check_X: "X" },
      { question: "나는 분석적이고 논리적이다.", check_O: "O", check_X: "X" },
      { question: "나는 감정적인 호소 보다는 논리적인 호소에 설득이 잘된다.", check_O: "O", check_X: "X" },
      { question: "비교적 협력보다 경쟁을 통해 성장할 수 있다고 생각한다.", check_O: "O", check_X: "X" },
      { question: "나는 어떠한 일에 동정심을 느끼기 보다는 해결책을 제시한다.", check_O: "O", check_X: "X" },
      { question: "나의 논리적인 부분이 감정적인 부분을 컨트롤 할 수 있다.", check_O: "O", check_X: "X" },
      { question: "나는 철처하고 계획적이다", check_O: "O", check_X: "X" },
      { question: "나는 데이트를 할때 모든 계획을 세워두고 만나는 편이다.", check_O: "O", check_X: "X" },
      { question: "나는 선택의 여지를 주는것을 좋아하지 않는다.", check_O: "O", check_X: "X" },
      { question: "나는 머릿속에 늘 체크리스트를 가지고 다닌다.", check_O: "O", check_X: "X" },
      { question: "나는 당장의 흥미보다는 미래의 안정이 더 중요하다.", check_O: "O", check_X: "X" }
    ]
  });

  function changeMode(mode) {
    setStates({ ...states, ['mode']: mode })
  }

  return (
    <div className='Container'>
      <Container>
        {/* mode 가 main 일 때 */}
        {states.mode === 'start'
          ?
          <StartContainer>

            <Sentence2><>
              <span>m</span>
              <span>b</span>
              <span>t</span>
              <span>i</span>
              검사를 통해서<p/> 여러분의 특성을 파악하고<p> 그 특성을 통한</p>인생 최고의 친구를 찾으세요!
            </>
            </Sentence2>

            <Startbtn onClick={() => { changeMode('quiz') }}><p>검 사 시 작 <VscArrowRight className="arrow" size={35} /></p></Startbtn>
            <Mbtiword>
              <span>m</span>
              <span>b</span>
              <span>t</span>
              <span>i</span>
            </Mbtiword>
            <MdQuiz size={75} className='mbti-quiz' /><MdPsychology size={90} className='mbti-brain' />
            <p></p>
            <IoPeople className='mbti-person1' size={160} />
            <IoPersonAdd className='mbti-person2' size={120} />
            <IoPersonAdd className='mbti-person3' size={140} />

          </StartContainer>

          : null
        }
        {/* mode 가 quiz 일 때 */}
        {states.mode === 'quiz'
          ? <Quiz questionList={states.questionList} />
          : null
        }
      </Container>
    </div>
  )
}

export default MBTI;