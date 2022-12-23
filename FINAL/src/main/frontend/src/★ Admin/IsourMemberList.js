import React, { useState, useEffect } from 'react';
import Moment from "react-moment";
import AdminNavigation from './AdminNavigation';
import AdminAPI from '../0. API/AdminAPI';
import Loading from '../other/Loading';
import './IsourMemberList.css';

function IsourMemberList() {

  const [isAdd, isSetAdd] = useState(false);
  const addActive = () => { isSetAdd(isAdd => !isAdd); }

  const [loading, setLoading] = useState(false);
  const [memberList, setMemberList] = useState([]);



  /* 
  최초 통신(useEffect) */
  useEffect(() => {

    const memberData = async () => {
      setLoading(true);

      try {
        const response = await AdminAPI.getAllMember();
        if (response.status == 200) {
          setMemberList(response.data);
        }
      } catch (e) { console.log(e); }

      setLoading(false);
    };
    memberData();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="AdminMain-Container">
      <AdminNavigation isAdd={isAdd}/>

      {/* Main의 시작 - Topbar, Cardbox, Details */}
      <div className={isAdd ? "Main active" : "Main"}>


        {/* Topbar */}
        <div className="Topbar">
          <div className="Toggle" onClick={addActive}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="Search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div className="User">
            <img src="./user.jpg" alt="user"/>
          </div>
        </div>







        {/* Details */}
        <div className="Details">
          <div className="RecentOrders">
            <div className="CardHeader">
              <h2>전체 회원 조회</h2>
              <a href="#" className="Btn">View All</a>
            </div>
            <table className='MemberTable'>
              <thead>
                <tr>
                  <td>번호</td>
                  <td>이름</td>
                  <td>아이디</td>
                  <td>비밀번호</td>
                  <td>생년월일</td>
                  <td>성별</td>
                  <td>닉네임</td>
                  <td>이메일</td>
                  <td>자기소개</td>
                  <td>MBTI</td>
                  <td>시도</td>
                  <td>시구군</td>
                  <td>가입일</td>
                  <td>프로필</td>
                </tr>
              </thead>
              <tbody>
                {memberList.map(e =>
                <tr>
                  <td>{e.idNum}</td>
                  <td>{e.name}</td>
                  <td>{e.id}</td>
                  <td>{e.pwd}</td>
                  <td>{e.birth}</td>
                  <td>{e.gender}</td>
                  <td>{e.nickname}</td>
                  <td>{e.email}</td>
                  <td>{e.introduce}</td>
                  <td>{e.mbti}</td>
                  <td>{e.region1}</td>
                  <td>{e.region2}</td>
                  <td><Moment format='YY-MM-DD(ddd) HH:mm:ss'>{e.registrationDate}</Moment></td>
                  <td>{e.face}</td>
                </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>



        {/* CardBox */}
        <div className="CardBox">
          <div className="Card">
            <div>
              <div className="Numbers">1,504</div>
              <div className="CardName">Daily Views</div>
            </div>
            <div className="IconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
          <div className="Card">
            <div>
              <div className="Numbers">80</div>
              <div className="CardName">Sales</div>
            </div>
            <div className="IconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>
          <div className="Card">
            <div>
              <div className="Numbers">284</div>
              <div className="CardName">Comments</div>
            </div>
            <div className="IconBx">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </div>
          </div>
          <div className="Card">
            <div>
              <div className="Numbers">$7,842</div>
              <div className="CardName">Earning</div>
            </div>
            <div className="IconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>



      </div> {/* Main의 끝 */}
    </div>
  )
}
export default IsourMemberList;