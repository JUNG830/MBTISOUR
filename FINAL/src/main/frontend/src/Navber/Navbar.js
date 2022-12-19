import React, { useState } from 'react';
import '../Navber/Navbar.css';
import logo from '../images/logo.png'
import Logout from '../other/Logout';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false); 

  // 반응형 - 메뉴 눌렀을 때
  const onClickMenu = () => {
    setIsMenuOpen(isMenuOpen => !isMenuOpen);

    let navbar = document.querySelector('.navbar');
    navbar.classList.toggle('open');
  }

  // User 아이콘 눌렀을 때
  const onClickAccount = () => {
    if(isMenuOpen) setShowAccount(showAccount => !showAccount);
  }

  return (
    <div className='Navbar-Container'>
      <header>

      {/* logo 영역 */}
        <a href='/home' className="logo">
          <img src={logo} alt="logo" />
          <span><h3>MBTISOUR</h3></span>
        </a>

      {/* Navbar 영역 */}
        <ul className= {isMenuOpen ? "Navbar" : "Navbar open"}>
          <div className="User">
            <span className="material-symbols-outlined" onClick={onClickAccount} id="User-icon">account_circle</span>
            {/* {isMenuOpen ? <a href="/mypage" className='myProfile'>내 프로필</a> : null } */}
            <ul className={showAccount ? "User-submenu open" : "User-submenu-close"}>
              <li><a href="/mypage">마이페이지</a></li> 
              <li><a href="/postbox">쪽지함</a></li>
              <li><a href="/chathome">1:1채팅</a></li>
              {showAccount ? <li><Logout /></li> : null}
            </ul>
          </div>
          
          <div className="Menu">
            <ul className='Menu-submenu'>
              
              <li><a href="/aboutus">About Us</a></li>
              <li><a href="/mbti">MBTI 검사</a></li>
              <li><a href="/MBTITypes">MBTI 유형</a></li>
              <li><a href="/guestbook">방명록</a></li>
              <li><a href="/matching">MATCHING</a></li>
              {!isMenuOpen ? <li><Logout /></li> : null}
            </ul>
          </div>
        </ul>

      {/* Main 영역 */}
        <div className="Main-Icon">
          <div className="material-symbols-outlined"
            id="menu-icon" onClick={onClickMenu}>
            {isMenuOpen ? "menu" : "close"}
          </div>
        </div>

      </header>
    </div>
  )
}

export default Navbar