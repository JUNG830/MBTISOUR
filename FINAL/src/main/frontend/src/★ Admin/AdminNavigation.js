import React from 'react';
import logo from '../images/logo.png';

function AdminNavigation(props) {
  const { isAdd } = props;

  let list = document.querySelectorAll('.Navigation li');
  function activeLink() {
    list.forEach((item) => 
    item.classList.remove('hovered'));
    this.classList.add('hovered');
  }
  list.forEach((item) => 
  item.addEventListener('mouseover', activeLink));

  return (
    <div className={isAdd ? "Navigation active" : "Navigation"}>
      <ul>
        <li>
          <a href="/AdminMain">
            <span className="Icon"><img src={logo} alt="logo" /></span>
            <span className="Title">MBTISOUR</span>
          </a>
        </li>
        <li>
          <a href="/AdminMain">
            <span className="Icon"><ion-icon name="home-outline"></ion-icon></span>
            <span className="Title">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/Admin-IsourMemberList">
            <span className="Icon"><ion-icon name="people-outline"></ion-icon></span>
            <span className="Title">회원 정보 조회</span>
          </a>
        </li>
        <li>
          <a href="/AdminPostbox">
            <span className="Icon"><ion-icon name="mail-outline"></ion-icon></span>
            <span className="Title">쪽지함</span>
          </a>
        </li>
        <li>
          <a href="/AdminGuestBook">
            <span className="Icon"><ion-icon name="footsteps-outline"></ion-icon></span>
            <span className="Title">방명록</span>
          </a>
        </li>
        <li>
          <a href="/AdminLogin">
            <span className="Icon"><ion-icon name="log-out-outline"></ion-icon></span>
            <span className="Title">로그아웃</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
export default AdminNavigation;
